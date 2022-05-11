import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const bloggersRouter = Router({})

const pattern = RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');


bloggersRouter.get('/', (req, res) => {
    res.status(200).send(bloggersRepository.getBloggers());
});

bloggersRouter.get('/:id', (req, res) => {
    const id = +req.params.id;

    let findedBlogger = bloggersRepository.getBloggerById(id)

    if (findedBlogger) {
        return res.status(200).send(findedBlogger);
    } else {
        return res.status(404).send();
    }
})

bloggersRouter.post('/', (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const errors = [];

    if (typeof name !== 'string' || name.trim().length > 15 || name.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "name"
        });
    }

    if (typeof youtubeUrl !== 'string' || youtubeUrl.trim().length > 100 || youtubeUrl.trim().length <= 0 || !pattern.test(youtubeUrl)) {
        errors.push({
            "message": "bad request",
            "field": "youtubeUrl"
        });
    }

    if (errors.length > 0) {
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)

    return res.status(201).send(newBlogger)
})

bloggersRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const errors = [];

    const finded = bloggersRepository.getBloggerById(id)

    if (!finded) {
        return res.status(404).send();

    };

    if (typeof name !== 'string' || name.trim().length > 15 || name.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "name"
        });
    }

    if (typeof youtubeUrl !== 'string' || youtubeUrl.trim().length > 100 || youtubeUrl.trim().length <= 0 ||  !pattern.test(youtubeUrl)) {
        errors.push({
            "message": "bad request",
            "field": "youtubeUrl"
        });
    }

    if (errors.length > 0) {
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    if (finded) {
        const updatedBloger = bloggersRepository.updateBlogger(id, name, youtubeUrl)
        return res.status(204).send();
    }
})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const finded = bloggersRepository.getBloggerById(id)

    if(!finded){
        return res.status(404).send();
    }

    const filteredBloggers = bloggersRepository.deleteBlogger(id)
    return res.status(204).send();

})

