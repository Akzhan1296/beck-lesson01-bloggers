import { Request, Response, Router } from "express";
import { bloggersService } from "../domain/bloggers-service";
import { postsService } from '../domain/posts-service';
import { hasBloggerMiddleware, inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware';
import { authMiddleWare } from "../middlewares/auth-middleware";
import { QueryType } from '../types/types';

export const bloggersRouter = Router({});

//get all bloggers
bloggersRouter.get('/', async (req, res) => {
  const pageNumber = req.query.PageNumber as QueryType;
  const pageSize = req.query.PageSize as QueryType;
  const searchNameTerm = req.query.SearchNameTerm as QueryType

  const bloggers = await bloggersService.getBloggers(pageNumber, pageSize, searchNameTerm);
  res.status(200).send(bloggers);
});

//get blogger by id
bloggersRouter.get('/:id', async (req, res) => {
  const id = +req.params.id;

  let foundBlogger = await bloggersService.getBloggerById(id)

  if (foundBlogger) {
    const {id, ...rest} = foundBlogger;
    return res.status(200).send({id: id.toString(), ...rest});
  } else {
    return res.status(404).send();
  }
})


//get specific blogger POSTS
bloggersRouter.get('/:bloggerId/posts', async (req, res) => {
  const bloggerId = +req.params.bloggerId;
  const pageNumber = req.query.PageNumber as QueryType;
  const pageSize = req.query.PageSize as QueryType;
  let foundBlogger = await bloggersService.getBloggerById(bloggerId)

  if (foundBlogger) {
    let posts = await postsService.getPostByBloggerId(bloggerId, pageNumber, pageSize);
    return res.status(200).send(posts);
  } else {
    return res.status(404).send();
  }
})

//create blogger
bloggersRouter.post('/',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl);
    const {id, ...rest} = newBlogger;
    return res.status(201).send({id: id.toString(), ...rest});
  })

// create POST for specific blogger 
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

//update blogger
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
      await bloggersService.getBloggerById(id);
      res.send(204)
    } else {
      res.send(404)
    }
  })

// delete blogger
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

