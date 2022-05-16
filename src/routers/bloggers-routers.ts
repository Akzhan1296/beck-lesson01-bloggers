import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {inputValidators, sumErrorsMiddleware} from '../middlewares/input-validator-middleware'
import {authMiddleWare} from "../middlewares/auth-middleware";
import {body} from "express-validator";

export const bloggersRouter = Router({})

const pattern = RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');


bloggersRouter.get('/', (req, res) => {
    res.status(200).send(bloggersRepository.getBloggers());
});

bloggersRouter.get('/:id', (req, res) => {
    const id = +req.params.id;

    let foundBlogger = bloggersRepository.getBloggerById(id)

    if (foundBlogger) {
        return res.status(200).send(foundBlogger);
    } else {
        return res.status(404).send();
    }
})

bloggersRouter.post('/',
    authMiddleWare,
    inputValidators.name,
    inputValidators.youtubeUrl,
    sumErrorsMiddleware,
    (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)
    return res.status(201).send(newBlogger)
})

bloggersRouter.put('/:id',
    authMiddleWare,
    inputValidators.name,
    inputValidators.youtubeUrl,    
    sumErrorsMiddleware,
    (req: Request, res: Response) => {
    const id = +req.params.id;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const found = bloggersRepository.getBloggerById(id)

    if (!found) {
        return res.status(404).send();
    };

    if (found) {
        bloggersRepository.updateBlogger(id, name, youtubeUrl)
        return res.status(204).send();
    }
})

bloggersRouter.delete('/:id',
    authMiddleWare,
    (req: Request, res: Response) => {
    const id = +req.params.id;
    const found = bloggersRepository.getBloggerById(id)

    if(!found){
        return res.status(404).send();
    }

    bloggersRepository.deleteBlogger(id)
    return res.status(204).send();

})

