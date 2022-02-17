
import axios from "axios";
import config from "../../config";
import parseParamsHelper from "../../helpers/parseParams.helper";
import { CheerioProcessor } from "../cheerio";

class FuncionariosProvider extends CheerioProcessor {

    api: string = config.apiScrapping.funcionarios

    async get(nombre: string, estado: boolean){
        try {
            
            const parsedName = parseParamsHelper(nombre);
            const isActive = estado ? "Activo" : "Inactivo";
    
            const res = await axios.get(`${this.api}/DirectorioFuncionarios/Consulta?searchString=${parsedName}&searchEstado=${isActive}`)

            const htmlLoaded = this.process(res.data);
            const functionariosList: any = []
            htmlLoaded("tbody a").each((i: any, el: any) => {
                functionariosList.push({name: el.children[0].data, link: `${this.api}${el.attribs.href}`})
            })

            return { success: true, data: functionariosList}
        } catch (error) {
            return { success: false, error }
        }
    }
}

export default new FuncionariosProvider();
