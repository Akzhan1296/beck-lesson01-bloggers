import {NextFunction, Request, Response} from "express";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization){
        const decoded = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
        const authName = 'Basic'

        if(!req.headers.authorization.includes(authName)) {
            return res.status(401).send();
        }
        const name = decoded.split(':')[0];
        const password = decoded.split(':')[1];
        if(name === 'admin' && password === 'qwerty') {
            return next();
        }
    }
    return res.status(401).send();
}