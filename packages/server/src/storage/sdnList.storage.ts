import parserSDNListXmlHelper from "../helpers/parserXml.helper";



var data: any;

export const fillData = async () => {
    try {
        
        data = await parserSDNListXmlHelper();
          
        console.log("SDN File Mounted successfully") 
        return {success: true}
    } catch (error) {
        console.log({ message: "Cannot mount SDN List File", error })
        return {error}
    }
}

export const getData = () => {
    return data;
}