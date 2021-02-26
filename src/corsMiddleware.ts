import { NextFunction, Request, Response } from "express";
import { config } from "./config";

export function corsMiddleWare(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Acess-Control-Allow-Origin', config.cors.origin);
    res.setHeader('Acess-Control-Allow-Methods', config.cors.methods);
    res.setHeader('Acess-Control-Allow-Headers', config.cors.headers);
    if ('OPTIONS' === req.method) {
        res.end('OK');
    }

    next();
}