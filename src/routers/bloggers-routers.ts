import {Request, Response, Router} from "express";

type BloggerItem = {
    id: number
    name: string
    youtubeUrl: string
}

let bloggers: BloggerItem[] = []
const pattern = RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');

export const bloggersRouter = Router({})

bloggersRouter.get('/', (req, res) => {
    res.status(200).send(bloggers);
});

bloggersRouter.get('/:id', (req, res) => {
    const id = +req.params.id;

    let findedBlogger = bloggers.find(b => b.id === id)

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

    const newBlogger = {
        id: +(new Date()),
        name,
        youtubeUrl,
    }
    bloggers.push(newBlogger)

    return res.status(201).send(newBlogger)
})

bloggersRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const errors = [];

    const finded = bloggers.find(b => b.id === id);

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
        const updatedBloger = {
            id,
            name,
            youtubeUrl,
        }

        bloggers = [...bloggers.filter(b => b.id !== id), updatedBloger];
        return res.status(204).send(bloggers);

    }
})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const finded = bloggers.find(b => b.id === id);
    if (finded) {
        let newBlogger = bloggers.filter(b => b.id !== id);
        bloggers = newBlogger;
        return res.status(204).send(newBlogger);
    } else {
        return res.status(404).send();
    }
})

