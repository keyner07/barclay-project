
// var parser = require('fast-xml-parser');
import { parse } from "fast-xml-parser"
import { readFileSync } from "fs"
import { join } from "path";

export default async () => {
  
    try {
        
        const file = readFileSync(join(__dirname, "../../docs/sdn_advanced.xml"));

        let xmlData =  file.toString();
        
        const parsed =  await parse(xmlData);

        return parsed;

    } catch (error) {
        console.log({ error });

        return { error: "Error while mounting the SDN file"}   
    }
}

// // Intermediate obj;
// var tObj = parser.getTraversalObj(xmlData);
// var jsonObj = parser.convertToJson(tObj);