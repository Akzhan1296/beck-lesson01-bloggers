import {Request, Response, Router} from "express";
import {bloggers} from "../repositories/bloggers-repository";
import { postsRepository } from "../repositories/posts-repository";



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

postsRouter.post('/', (req: Request, res: Response) => {

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const errors = [];


    if(!bloggers.find((b) => b.id === bloggerId)){
        errors.push({message: "message", field: "bloggerId"})
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    if (typeof title !== 'string' || title.trim().length > 15 || title.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "title"
        });
    }

    if (typeof shortDescription !== 'string' || shortDescription.trim().length > 100 || shortDescription.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "shortDescription"
        });
    }

    if (typeof content !== 'string' || content.trim().length > 1000 || content.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "content"
        });
    }

    if (typeof bloggerId !== 'number') {
        errors.push({
            "message": "bad request",
            "field": "bloggerId"
        });
    }


    if (errors.length > 0) {
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    const newPost = postsRepository.createPost(title, shortDescription, content, bloggerId);

    return res.status(201).send(newPost)
})

postsRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const errors = [];

    const finded = postsRepository.getPostById(id);

    if (!finded) {
        return res.status(404).send();

    };

    if(!bloggers.find((b) => b.id === bloggerId)){
        errors.push({message: "message", field: "bloggerId"})
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    if (typeof title !== 'string' || title.trim().length > 15 || title.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "title"
        });
    }

    if (typeof shortDescription !== 'string' || shortDescription.trim().length > 100 || shortDescription.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "shortDescription"
        });
    }

    if (typeof content !== 'string' || content.trim().length > 1000 || content.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "content"
        });
    }

    if (typeof bloggerId !== 'number') {
        errors.push({
            "message": "bad request",
            "field": "bloggerId"
        });
    }


    if (errors.length > 0) {
        return res.status(400).send({
            "errorsMessages": errors,
            "resultCode": 1
        });
    }

    if (finded) {
        const updatedPost = postsRepository.updatePost(id, title, shortDescription, content, bloggerId);
        return res.status(204).send();
    }
})

postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const filteredPosts = postsRepository.deletePost(id);

    if(!filteredPosts){
        return res.status(404).send();
    }
    return res.status(204).send();

})
