import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers-routers";
import {postsRouter} from "./routers/posts-routers";

const app = express()
const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('')
})
app.use(cors());
app.use(bodyParser.json());

app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

