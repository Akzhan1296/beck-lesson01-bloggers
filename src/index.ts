import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('')
})
app.use(cors());
app.use(bodyParser.json());

// blogers

let bloggers = [
    { id: 1, name: 'About JS - 01', youtubeUrl: 'it-incubator.eu' },
]
const pattern = RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/bloggers', (req, res) => {
    res.status(200).send(bloggers);
});

app.get('/bloggers/:id', (req, res) => {
    const id = +req.params.id;

    let findedBlogger = bloggers.find(b => b.id === id)

    if (findedBlogger) {
        return res.status(200).send(findedBlogger);
    } else {
        return res.status(404).send();
    }
})

app.post('/bloggers', (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const errors = [];


    if (typeof name !== 'string' || name.trim().length > 15 || name.trim().length <= 0) {
        errors.push({
            "message": "bad request",
            "field": "name"
        });
    }

    if (typeof youtubeUrl !== 'string' || youtubeUrl.trim().length > 100 || youtubeUrl.trim().length <= 0 || pattern.test(youtubeUrl)) {
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

app.delete('/bloggers/:id', (req: Request, res: Response) => {
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

app.put('/bloggers/:id', (req: Request, res: Response) => {
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

    if (typeof youtubeUrl !== 'string' || youtubeUrl.trim().length > 100 || youtubeUrl.trim().length <= 0 ||  pattern.test(youtubeUrl)) {
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