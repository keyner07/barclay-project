import { IROSReport } from "../interfaces/reportes/reportes.interfaces";
import { TypeReport } from "../interfaces/reportes/reportes.types";
import storageFiles from "../storage";
import { coordinatesFields, coordinatesRTE } from "../utils/reports/coordinates.reportes";
const { PDFDocument } = require("pdf-lib");

const pagesKeys = {
    numberReport: "1",
    generalData: "1",
    clientData: "1",
    financialData: "1",
    internationalTransaction: "1",
    numberReport2: "2",
    operatorPerson: "2",
    beneficiaryData: "2",
    reasons: "2",
    priority: "2",
    detailsAttachmentDocuments: "2",
}

const testReport: IROSReport = {
    "numberReport": "123456",
    "numberReport2": "123456",
    "generalData": {
        "date": "06/06/2019",
        "entity": "Entity Test",
        "hour": "12:00 PM",
        "registerCode": "654321",
        "stablishmentId": "ST123456"
    },
    "clientData": {
        "accountNumber": "12211256",
        "address": "Address test",
        "documentNumber": "000-0000000-1",
        "documentType": "cedula",
        "econimicActivity": "Activity test",
        "homePhone": "829-597-0000",
        "mobilePhone": "829-619-0000",
        "municipality": "Villa Mella",
        "nameOrCommercialReason": "Name of test",
        "originNacionality": "Dominicano",
        "personType": "fisica",
        "accountNumber2": "112233456",
        "accountNumber3": "123545321",
        "productType": "tipo Test",
        "province": "Santo Domingo",
        "sector": "Barrio Nuevo",
        "gender": "m",
        "acquiredNacionality": "Nacionalidad Adquirida Test",
        "lastNameOrCommercialName": "Apellidos of test",
        "mobilePhone2": "829-333-11111",
        "officePhone": "809-594-0000",
        "otherDocument": "test",
        "pepType": "tipo test",
        "specific": "Especificación"
    },
    "financialData": {
        "amountDominicanPesos": 55000,
        "amountOriginalCurrency": 1000,
        "currencyType": "dolares",
        "exchangeRate": 55.00,
        "instrumentType": "Tipo test",
        "operationDescription": "Description of test",
        "reasonNoTransaction": "No reason",
        "sourceOfFunds": "Fuente de prueba",
        "transaccionIsComplete": "si",
        "transactionDate": "06/06/2019",
        "transactionHour": "12:00 PM",
        "transactionType": "Tipo of test",
        "specific": "Especificación"
    },
    "beneficiaryData": {
        "intermediaryEqualToClient": "si",
        "acquiredNacionality": "Adquirida de test",
        "address": "Direccion de prueba",
        "documentType": "cedula",
        "gender": "m",
        "lastName": "Last name test",
        "municipality": "Municipio test",
        "name": "Name test",
        "numberDocument": "000-0000000-2",
        "originNacionalitiy": "Nacionality test",
        "otherDocument": "Otrao Documento",
        "province": "Provincia test",
        "sector": "Sector test",
        "specific": "Especificacion"
    },
    "operatorPerson": {
        "intermediaryEqualToClient": "si",
        "acquiredNacionality": "Adquirida de test",
        "address": "Direccion de prueba",
        "documentType": "cedula",
        "gender": "m",
        "lastName": "Last name test",
        "municipality": "Municipio test",
        "name": "Name test",
        "numberDocument": "000-0000000-2",
        "originNacionalitiy": "Nacionality test",
        "otherDocument": "Otrao Documento",
        "province": "Provincia test",
        "sector": "Sector test",
        "specific": "Especificacion"
    },
    "detailsAttachmentDocuments": "Detalles de test",
    "internationalTransaction": {
        "correspondentEntity": "Entity test",
        "remitter": "Remitente Test",
        "sourceCountry": "Ciudad test",
        "targetCountry": "Pais destino test"
    },
    "reasons": "Sin razones",
    "priority": "corrupcion"
}

const coordinates = {
    "ros": coordinatesFields,
    "rte": coordinatesRTE
}

export const generateReport = async (data: IROSReport, typeReport: TypeReport) => {

    try {

        const file = storageFiles.get(typeReport)
        const doc = await PDFDocument.load(file);
        const page1 = await doc.getPage(0);
        const page2 = await doc.getPage(1);
        const _coordinates = coordinates[typeReport];

        const pages = {
            "1": page1,
            "2": page2
        }

        const keysData = Object.keys(data);

        await Promise.all(keysData.map(async key => {

            if (typeof data[key] === "object") {

                const subKeys = Object.keys(data[key]);

                subKeys.forEach(subKey => {

                    const objectCoordinates = _coordinates[key][subKey]

                    if (typeof objectCoordinates === "object") {

                        const config = _coordinates[key][subKey][data[key][subKey]]

                        if (config && Object.keys(config).find(e => e === "x")) {

                            pages[`${pagesKeys[key]}`] && pages[`${pagesKeys[key]}`].drawText(`X` || "", { ...config })
                        } else {

                            pages[`${pagesKeys[key]}`] && pages[`${pagesKeys[key]}`].drawText(`${data[key][subKey]}`, _coordinates[key][subKey])
                        }

                    } else {
                        pages[`${pagesKeys[key]}`] && pages[`${pagesKeys[key]}`].drawText(`${data[key][subKey]}`, _coordinates[key][subKey])
                    }
                })
            } else {
                const objectCoordinates = _coordinates[key];
                const config = objectCoordinates[data[key]];

                if (config && Object.keys(config).find(e => e === "x")) {

                    return pages[`${pagesKeys[key]}`] && pages[`${pagesKeys[key]}`].drawText(`X`, { ...config })
                }

                pages[`${pagesKeys[key]}`] && pages[`${pagesKeys[key]}`].drawText(`${data[key]}`, _coordinates[key])
            }
        }));

        return {file: await doc.save()};

    } catch (error) {

        console.log({error})

        return { error: "No se pudo procesar el reporte"}
    }
}