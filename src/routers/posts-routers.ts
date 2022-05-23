import { Request, Response, Router } from "express";
import { postsService, QueryType } from "../domain/posts-service";
import {
    hasBloggerMiddleware,
    inputValidators,
    sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare } from "../middlewares/auth-middleware";

export const postsRouter = Router({});

postsRouter.get('/', async (req, res) => {

    const pageNumber = req.query.pageNumber as QueryType;
    const pageSize = req.query.pageSize as QueryType;

    const result = await postsService.getPosts(pageNumber, pageSize);
    res.status(200).send(result);
});

postsRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    let foundPost = await postsService.getPostById(id);

    if (foundPost) {
        return res.status(200).send(foundPost);
    } else {
        return res.status(404).send();
    }
})

postsRouter.post('/',
    authMiddleWare,
    // hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.bloggerId,
    inputValidators.shortDescription,
    sumErrorsMiddleware,
    async (req: Request, res: Response) => {

        const title = req.body.title;
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const bloggerId = req.body.bloggerId;

        const newPost = await postsService.createPost(title, shortDescription, content, bloggerId);
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

    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const title = req.body.title;
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const bloggerId = req.body.bloggerId;

        const isUpdated = await postsService.updatePost(id, title, shortDescription, content, bloggerId)

        if (isUpdated) {
        //   const product = await postsService.getPostById(id);
          res.send(204);
        } else {
          res.send(404);
        }
    })

postsRouter.delete('/:id',
    authMiddleWare,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const isDeleted = await postsService.deletePost(id);
        if (isDeleted) {
          return res.send(204)
        } else {
          return res.send(404)
        }
    })
