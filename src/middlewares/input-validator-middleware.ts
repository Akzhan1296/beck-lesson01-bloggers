import { body, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-repository";

export const inputValidators = {
    titleValidate: body('title').trim().notEmpty().isLength({ max: 15 }),
    shortDescription: body('shortDescription').trim().notEmpty().isLength({ max: 100 }),
    content: body('title').trim().notEmpty().isLength({ max: 1000 }),
    bloggerId: body('bloggerId').trim().notEmpty().isNumeric(),
    name: body('name').trim().notEmpty().isLength({ max: 15 }),
    youtubeUrl: body('youtubeUrl').trim().notEmpty().isLength({ max: 100 }).matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'),

};

export const sumErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array({onlyFirstError: true}).map(er => ({
                message: er.msg,
                field: er.param
            })),
            resultCode: 1
        }).send();
    }
    next();
}

export const hasBloggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const bloggerId = req.body.bloggerId;
    const bloggers = bloggersRepository.getBloggers();

    if (!bloggers.find((b) => b.id === bloggerId)) {
        res.status(400).json({
            message: "not found blogger",
            field: "bloggerId"
        })
        return;
    }
    next();

}