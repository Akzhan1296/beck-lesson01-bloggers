import {NextFunction, Request, Response} from "express";

const arr = ['132:13:0:1'];

export const blockIpMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const found = arr.find(i => i === ip)

    if(found) {
        return res.send(403)
    }
    next();
}
