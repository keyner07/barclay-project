import { readFileSync } from "fs";
import { join } from "path";
import parserXmlHelper from "../helpers/parserXml.helper";
import { IStorageData } from "../interfaces/storage/storage.interface";
import { storageData } from "./data.storage";

class StorageFiles {

    storage: Map<any, any>;
    
    constructor(data: Array<IStorageData>) {
        
        // this.init(data);
    }
    
    async init(data: Array<IStorageData>) {
        try {
            this.storage = new Map();

            data.forEach(async (item: IStorageData, index: number) => {

                const start = new Date();
                
                if(item.key === "sdn"){

                    const _data = await parserXmlHelper();

                    if(_data.error) return console.log(_data);

                    this.storage.set(item.key, _data);

                }else{
                    
                    this.storage.set(item.key, readFileSync(join(__dirname, `../../docs/${item.fileName}`)));
                }

                const end = new Date();

                const time = (end.getTime() - start.getTime()) / 1000

                console.log(`${index + 1} - ${item.fileName} File Mounted successfully in ${time}s`);
            })

        } catch (error) {
            console.log({ message: "Cannot mount file", error });

            return { error }
        }
    }

    get(key: string) {

        return this.storage.get(key);
    }
}

const storageFiles = new StorageFiles(storageData);

export default storageFiles;