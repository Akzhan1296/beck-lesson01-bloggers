import { Request, Response, Router } from "express";
import { bloggersService, QueryType } from "../domain/bloggers-service";
import { postsService } from '../domain/posts-service';
import { hasBloggerMiddleware, inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware'
import { authMiddleWare } from "../middlewares/auth-middleware";

export const bloggersRouter = Router({})

bloggersRouter.get('/', async (req, res) => {
  const pageNumber = req.query.pageNumber as QueryType;
  const pageSize = req.query.pageSize as QueryType;
  const searchNameTerm = req.query.searchNameTerm as QueryType

  const bloggers = await bloggersService.getBloggers(pageNumber, pageSize, searchNameTerm);
  res.status(200).send(bloggers);
});

bloggersRouter.get('/:id', async (req, res) => {
  const id = +req.params.id;

  let foundBlogger = await bloggersService.getBloggerById(id)

  if (foundBlogger) {
    return res.status(200).send(foundBlogger);
  } else {
    return res.status(404).send();
  }
})

bloggersRouter.get('/:bloggerId/posts', async (req, res) => {
  const bloggerId = +req.params.bloggerId;
  const pageNumber = req.query.pageNumber as QueryType;
  const pageSize = req.query.pageSize as QueryType;
  let foundBlogger = await bloggersService.getBloggerById(bloggerId)

  if (foundBlogger) {
    let posts = await postsService.getPostByBloggerId(bloggerId, pageNumber, pageSize);
    return res.status(200).send(posts);
  } else {
    return res.status(404).send();
  }
})

bloggersRouter.post('/',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl)
    return res.status(201).send(newBlogger)
  })

  bloggersRouter.post('/:bloggerId/posts',
  authMiddleWare,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = +req.params.bloggerId;

    let foundBlogger = await bloggersService.getBloggerById(bloggerId)
    if (foundBlogger) {
      const newPost = await postsService.createPost(title, shortDescription, content, bloggerId);
      return res.status(201).send(newPost);
    } else {
      return res.status(404).send();
    }
  })

bloggersRouter.put('/:id',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const id = +req.params.id;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const isUpdated = await bloggersService.updateBlogger(id, name, youtubeUrl)
    if (isUpdated) {
      const product = await bloggersService.getBloggerById(id);
      res.send(product)
    } else {
      res.send(404)
    }
  })

bloggersRouter.delete('/:id',
  authMiddleWare,
  async (req: Request, res: Response) => {
    const id = +req.params.id;

    const isDeleted = await bloggersService.deleteBlogger(id);
    if (isDeleted) {
      return res.send(204)
    } else {
      return res.send(404)
    }
  })

