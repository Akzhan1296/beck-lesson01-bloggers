import {Request, Response, Router} from "express";
import { postsRepository } from "../repositories/posts-repository";
import {
    hasBloggerMiddleware,
    inputValidators,
    sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import {authMiddleWare} from "../middlewares/auth-middleware";

export const postsRouter = Router({});

postsRouter.get('/', (req, res) => {
    res.status(200).send(postsRepository.getPosts());
});

postsRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    let findedPost = postsRepository.getPostById(id);

    if (findedPost) {
        return res.status(200).send(findedPost);
    } else {
        return res.status(404).send();
    }
})

postsRouter.post('/',
    authMiddleWare,
    hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.bloggerId,
    inputValidators.shortDescription,
    sumErrorsMiddleware,
    (req: Request, res: Response) => {

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const newPost = postsRepository.createPost(title, shortDescription, content, bloggerId);
    return res.status(201).send(newPost)
})

postsRouter.put('/:id',
    authMiddleWare,
    hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.bloggerId,
    inputValidators.shortDescription,
    sumErrorsMiddleware,

    (req: Request, res: Response) => {
    const id = +req.params.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const found = postsRepository.getPostById(id);

    if (!found) {
        return res.status(404).send();

    };
    if (found) {
        postsRepository.updatePost(id, title, shortDescription, content, bloggerId);
        return res.status(204).send();
    }
})

postsRouter.delete('/:id',
    authMiddleWare,
    (req: Request, res: Response) => {
    const id = +req.params.id;
    const filteredPosts = postsRepository.deletePost(id);

    if(!filteredPosts){
        return res.status(404).send();
    }
    return res.status(204).send();

})
