import { createConnection } from "typeorm";

export default async () => {
    try {
        const connectionDefault = await createConnection()
            console.log("Database CONNECTED");
        
        const connectionPadron = await createConnection("padron")
        console.log("Database Padron CONNECTED");

        return { connectionDefault, connectionPadron };
    } catch (error) {
        return { error };
    }
};
