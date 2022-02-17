import { Request, Response } from "express";
import funcionariosProvider from "../../providers/funcionarios/funcionarios.provider";
import googleProvider from "../../providers/google";
import findByFullNameHelper from "../../helpers/sanctions/findByFullName.helper";
import findByIDHelper from "../../helpers/sanctions/findByID.helper";
import { RiskMatrixResults } from "../../db/entity/search/RiskMatrixResult.entity";
import { checkNacionality } from "../../helpers/cuntriesBlacklist.helper";
import { EntitySearched } from "../../db/entity/search/EntitySearched.entity";
import { ResultFound } from "../../db/entity/search/Results.entity";
import calcValueService from "../../services/search/risk_matrix/calcValue.service";
import { SearchInfo } from "../../db/entity/search/SearchInfo.entity";
import getByIDService from "../../services/search/dgii/getByID.service";
import { User } from "../../db/entity/users/User.entity";
import getAllService from "../../services/search/getAll.service";
import getOneService from "../../services/search/getOne.service";
import { InfoReceived } from "../../db/entity/search/infoReceived.entity";
import { CategoryEnum } from "../../interfaces/search/search.enum";
import storageFiles from "../../storage";
import { Padron } from "../../db/padron/entities/Padron";
import { getConnection } from "typeorm";
import { padron } from "../../helpers/getRepository.helper";
import { IPadron } from "../../interfaces/padron/padron.interface";
import { Matriz } from "../../db/entity/matriz/matriz.entity";
import { enumTiposMatriz } from "../../interfaces/matriz/matriz-enums";
import { IResultMatriz } from "../../interfaces/matriz/matriz.interface";
import { IFormPersonaJuridica } from "../../interfaces/search/search.interface";
import getDGIService from "../../services/search/dgii/getByID.service";
import createJuridicaService from "../../services/search/dgii/create-juridica.service";

class SearchController {
    async searchFisica(req: Request, res: Response) {
        try {
            const userLogged = await User.findOne({
                where: {
                    DNI: res.locals.authData.DNI,
                },
                relations: ["matriz"],
            });

            const { firstName, lastName, ID, birthDate, gender, civilState, nacionality, recidencyAddress, PEP } = req.body.payload;

            const munCed = ID.substring(0, 3);
            const seqCed = ID.substring(3, 10);
            const verCed = ID.substring(10, 11);
            // console.log({munCed});
            const getPadron: IPadron = await padron().findOne({
                where: {
                    munCed,
                    seqCed,
                    verCed,
                },
            });
            // const getPadron = await Padron.findOne({
            //     where: {
            //         munCed: "044",
            //         seqCed: "0024682",
            //         verCed: "5"
            //     }
            // })

            if (!userLogged) return res.status(500).json({ error: "Cannot get loggued user" });

            let userMatriz = userLogged.matriz;
            console.log("🚀 ~ file: search.controller.ts ~ line 60 ~ SearchController ~ searchFisica ~ userMatriz", userMatriz);

            const resDGII = await getByIDService(ID);

            const fullName = !firstName && !lastName && resDGII && resDGII.razonSocial ? resDGII.razonSocial : `${getPadron ? getPadron.nombres : firstName} ${getPadron ? getPadron.apellido1 + " " + getPadron.apellido2 || "" : lastName}`;

            console.log({ fullName });

            // "ID": "00101629970",
            let resultMatriz: IResultMatriz | {} = {};

            [userMatriz].map((item: any) => {
                return item.map((itemM) => {
                    return (resultMatriz[`${itemM.tipo_riesgo}`] = {
                        found: false,
                        value: 0,
                        level: itemM.nivel_riesgo || "",
                    });
                });
            });

            const funcionario = await funcionariosProvider.get(fullName, true);

            if (!getPadron) resultMatriz[enumTiposMatriz.DocumentoNoVerificado].found = true;

            // if (PEP == "1" || PEP == "3" || (funcionario.data && funcionario.data.length > 0)) riskMatrixResult.politicamenteExpuesto = true;
            if (PEP == "1" || PEP == "3" || (funcionario.data && funcionario.data.length > 0)) resultMatriz[enumTiposMatriz.PoliticamenteExpuesto].found = true;

            const dataSDN = storageFiles.get("sdn");

            const googleResults = await googleProvider.get(fullName);

            let foundInSDNList = findByIDHelper(dataSDN, ID);

            if (!foundInSDNList) foundInSDNList = findByFullNameHelper(dataSDN, fullName);

            // if (foundInSDNList) riskMatrixResult.listaOfac = true;
            if (foundInSDNList) resultMatriz[enumTiposMatriz.ListaOfac].found = true;

            const isInBlackOrGrayList = checkNacionality(nacionality);
            //!WE HAVE TO OTHERS NEW RESULT OF MATRIZ FORMATTED resultMatriz['tipo']{ found: boolean, value: 0}
            // if (isInBlackOrGrayList) riskMatrixResult.paisesListaNegraGrys = true;
            if (isInBlackOrGrayList == true) resultMatriz[enumTiposMatriz.PaisesEnListasNegrasOGris].found = true;

            if (nacionality != "República Dominicana") resultMatriz[enumTiposMatriz.Extranjero].found = true;

            const riskMatrixResult = RiskMatrixResults.create({
                DocumentoNoVerificado: resultMatriz[enumTiposMatriz.DocumentoNoVerificado]?.found ? true : false,
                antecedentesLavado: resultMatriz[enumTiposMatriz.AntecedentesEnDelitosDeLavado]?.found ? true : false,
                informacionIncompleta: resultMatriz[enumTiposMatriz.InformacionesIncompleta]?.found ? true : false,
                listaOfac: resultMatriz[enumTiposMatriz.ListaOfac]?.found ? true : false,
                paisesListaNegraGrys: resultMatriz[enumTiposMatriz.PaisesEnListasNegrasOGris]?.found ? true : false,
                politicamenteExpuesto: resultMatriz[enumTiposMatriz.PoliticamenteExpuesto]?.found ? true : false,
                extranjero: resultMatriz[enumTiposMatriz.Extranjero]?.found ? true : false,
                representacionDeTercero: resultMatriz[enumTiposMatriz.EnRepresentacionDeUnTercero]?.found ? true : false,
                efectivoEncimaUmbral: resultMatriz[enumTiposMatriz.DineroEnEfectivoPorEncimaDelUmbral]?.found ? true : false,
            });
            const riskMatrixResultSaved = await riskMatrixResult.save();

            console.log({ riskMatrixResultSaved });

            const sinceTPData = resDGII?.fecha.split("/");

            let sinceTaxPayer = null;

            if (sinceTPData) {
                sinceTaxPayer = new Date();
                sinceTaxPayer.setDate(sinceTPData[0]);
                sinceTaxPayer.setMonth(sinceTPData[1] - 1);
                sinceTaxPayer.setFullYear(sinceTPData[2]);
            }

            const { data, finalValue } = await calcValueService(resultMatriz, [userLogged.matriz]);

            const entitySearched = await EntitySearched.create({
                ID,
                address: recidencyAddress || "",
                tipoPersona: req.body.personType || "",
                birthday: birthDate,
                civilState: civilState || "",
                fullName: firstName ? `${firstName} ` : null + lastName ? `${lastName}` : null,
                gender: gender || "",
                nacionality: nacionality || "",
                img: "",
                taxpayer: resDGII ? true : false,
                sinceTaxPayer: sinceTaxPayer,
                riskValue: finalValue,
            }).save();

            let googleResultsFormatted =
                googleResults.data &&
                (await Promise.all(
                    googleResults.data.map(async (e: any) => {
                        try {
                            const data = await ResultFound.create({
                                title: e.title,
                                date: new Date(),
                                description: e.snippet,
                                address: e.link,
                                formattedUrl: e.formattedUrl,
                            }).save();

                            return data;
                        } catch (error) {
                            console.log({ error });
                        }
                    }),
                ));

            const infoReceived = await InfoReceived.create({
                payload: req.body.payload,
            }).save();

            const searchInfo = await SearchInfo.create({
                entitySearched,
                riskMatrixResult: riskMatrixResultSaved,
                user: userLogged,
                infoReceived,
                type: CategoryEnum.Física,
            }).save();

            const totalResults = googleResults.count;

            const formatted = { ...searchInfo, totalResults, results: googleResultsFormatted, padron: getPadron, dataMatriz: { data } };

            return res.json(formatted);
        } catch (error) {
            console.log({ error });
            return res.status(500).json({ error: "Cannot get results" });
        }
    }

    async searchJuridica(req: Request, res: Response) {
        const dataSearch: IFormPersonaJuridica = req.body;
        const userLogged = await User.findOne({
            where: {
                DNI: res.locals.authData.DNI,
            },
            relations: ["matriz"],
        });
        
        let data = [];
      
        Object.keys(dataSearch).forEach(async (item) => {
            if (!dataSearch[item]) return;
            const dgi = await getDGIService(dataSearch[item]);
            console.log({dgi});
            
            if (dgi) {
                data.push({data: dgi, foundWith: item})
            }
        });
        dataSearch.user = userLogged;
        await createJuridicaService(dataSearch);
        return res.json(data);
    }

    async getAll(req: Request, res: Response) {
        const { authData } = res.locals;

        const result = await getAllService(authData.DNI);

        if (result.error) return res.status(500).json(result);

        res.json(result);
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) return res.status(500).json({ error: "Ningún Id se ha provisto" });

        const result = await getOneService(+id);

        if (result.error) return res.status(500).json(result);

        res.json(result.data);
    }

    async replaceResults(req: Request, res: Response) {
        try {
            const { searchId, selectedResults } = req.body;

            if (!searchId || !selectedResults) return res.status(500).json({ error: "Consulta o Resultados inválidos" });

            const searchInfo = await getOneService(searchId);

            if (!searchInfo || !searchInfo.data || searchInfo.error) return res.status(500).json(searchInfo);

            if (searchInfo.data.results) {
                await Promise.all(
                    searchInfo.data.results.map((el) => {
                        return SearchInfo.delete({ id: el.id });
                    }),
                );
            }

            searchInfo.data.results = [...selectedResults];
            await searchInfo.data.save();

            return res.json(true);
        } catch (error) {
            res.status(500).json({ error: "Ha ocurrido un error" });
        }
    }

    async googleConsulting(req: Request, res: Response) {
        const { fullName, offset } = req.body;

        const result = await googleProvider.get(`${fullName}`, `${offset}`);

        if (result.error) return res.status(500).json(result);

        let funcionPublicaFormatted =
            result.data &&
            result.data.map((e: any) => {
                const data = {
                    title: e.title,
                    date: new Date(),
                    description: e.snippet,
                    address: e.link,
                    formattedUrl: e.formattedUrl,
                };

                return data;
            });

        res.json(funcionPublicaFormatted);
    }
}
export default new SearchController();
