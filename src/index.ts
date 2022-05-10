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

type BloggerItem = {
    id: number
    name: string
    youtubeUrl: string
}

let bloggers: BloggerItem[] = [
    // { id: 1, name: 'About JS - 01', youtubeUrl: 'it-incubator.eu' },
]

type PostItem = {
    id: number,
        title: string,
        shortDescription: string,
        content: string,
        bloggerId: number,
        bloggerName: string

}

let posts: PostItem[] = [
    // {id: 0,
    //     title: "string",
    //     shortDescription: "string",
    //     content: "string",
    //     bloggerId: 0,
    //     bloggerName: "string"}
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

    console.log('post bloggers')
    console.log(req.body);


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


    console.log('new blogger')
    console.log(newBlogger)

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


//posts

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.get('/posts/:id', (req, res) => {
    const id = +req.params.id;

    let findedPost = posts.find(b => b.id === id)

    if (findedPost) {
        return res.status(200).send(findedPost);
    } else {
        return res.status(404).send();
    }
})

app.post('/posts', (req: Request, res: Response) => {

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const errors = [];
    console.log('post posts')
    console.log(req.body);


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

    const newPost = {
        id: +(new Date()),
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: "string"
    }

    console.log('new posts')
    console.log(newPost)

    posts.push(newPost)
    return res.status(201).send(newPost)
})

app.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const finded = posts.find(b => b.id === id);
    if (finded) {
        let newPosts = posts.filter(b => b.id !== id);
        posts = newPosts;
        return res.status(204).send(posts);
    } else {
        return res.status(404).send();
    }
})

app.put('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const errors = [];

    console.log('put posts')
    console.log(req.params.id);
    console.log(req.body);

    const finded = posts.find(b => b.id === id);

    if (!finded) {
        return res.status(404).send();

    };


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
        const updatedPost = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        }

        posts = [...posts.filter(b => b.id !== id), updatedPost];
        return res.status(204).send(posts);

    }
})