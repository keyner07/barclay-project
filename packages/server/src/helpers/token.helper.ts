import config from "../config";
import jwt from "jsonwebtoken";
import { SignTokenDTO } from "../interfaces/token/SignToken.dto";

class TokenHelper {

    sign(payload: SignTokenDTO){
        return jwt.sign(payload, config.token.secret, {
            expiresIn: "365d"
        })
    }

    verify(token: string){
        try {
            
            return jwt.verify(token, config.token.secret);
        } catch (error) {
            return null
        }
    }
}

export default new TokenHelper();