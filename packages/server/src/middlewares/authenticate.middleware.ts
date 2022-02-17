import { Request, Response, NextFunction } from "express";
import tokenHelper from "../helpers/token.helper";

export const AuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const bearer = req.headers.authorization;
        
        if( !bearer ) return res.status(401).json({ error: "Unauthorized" });
    
        const token = bearer.split(' ')[1];
    
        if( !token ) return res.status(401).json({ error: "Unauthorized" })
    
        const tokenVerify = tokenHelper.verify(token);
        
        if(!tokenVerify) return res.status(401).json({ error: "Unauthorized" })

        res.locals.authData = tokenVerify;

        next();

    } catch (error) {
        
        res.status(401).json({ error: "Unauthorized" })
    }
}