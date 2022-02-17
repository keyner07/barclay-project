import { readFileSync } from "fs";
import { join } from "path";
import parserSDNListXmlHelper from "../helpers/parserXml.helper";



var data: any = [];

export const fillDgiiFile = async () => {
    try {
        
        data = readFileSync(join(__dirname, "../../docs/dgii.txt")).toString().split('\n');
          
        console.log("DGII File Mounted successfully");

        return {success: true}
    } catch (error) {
        console.log({ message: "Cannot mount DGII List File", error })
        return {error}
    }
}

export const getData = () => {
    return data;
}