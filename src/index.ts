import express, { Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

//routers
import {bloggersRouter} from "./routers/bloggers-routers";
import {postsRouter} from "./routers/posts-routers";

//middlewares
import {blockIpMiddleWare} from './middlewares/block-ip-middleware';
import {countRequestsMiddleWare} from './middlewares/counter-middleware';
import {checkContentTypeMiddleWare} from './middlewares/content-type-check-middleware'

//dataBase
import {runDb} from './repositories/db'

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// app.use(blockIpMiddleWare);
// app.use(countRequestsMiddleWare);
//app.use(checkContentTypeMiddleWare('application/json'))

app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);


const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    })
}

startApp();