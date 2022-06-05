import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import {
  hasBloggerMiddleware,
  inputValidators,
  sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare, userAuthMiddleware } from "../middlewares/auth-middleware";
import { QueryType } from '../types/types';
import { commentsService } from "../domain/comments-service";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";

export const postsRouter = Router({});

//get all posts
postsRouter.get('/', async (req, res) => {
  const pageNumber = req.query.PageNumber as QueryType;
  const pageSize = req.query.PageSize as QueryType;

  const result = await postsService.getPosts(pageNumber, pageSize);
  res.status(200).send(result);
});

//get POST by id
postsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  let foundPost = await postsService.getPostById(id);

  if (foundPost) {
    return res.status(200).send(transferIdToString(foundPost));
  } else {
    return res.status(404).send();
  }
});

//create post
postsRouter.post('/',
  authMiddleWare,
  hasBloggerMiddleware,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const newPost = await postsService.createPost(title, shortDescription, content, bloggerId);

    return res.status(201).send(transferIdToString(newPost));
  });

//update post
postsRouter.put('/:id',
  authMiddleWare,
  hasBloggerMiddleware,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const isUpdated = await postsService.updatePost(id, title, shortDescription, content, bloggerId)

    if (isUpdated) {
      res.send(204);
    } else {
      res.send(404);
    }
  });

//delete post
postsRouter.delete('/:id',
  authMiddleWare,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const isDeleted = await postsService.deletePost(id);
    if (isDeleted) {
      return res.send(204)
    } else {
      return res.send(404)
    }
  });

// adding new comments to posts
postsRouter.post('/:postId/comments',
  userAuthMiddleware,
  inputValidators.comments,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const comment = req.body.content;
    const user = req.user;

    let foundPost = await postsService.getPostById(postId);

    if (foundPost) {
      const newComment = await commentsService.createCommentForSelectedPost(comment, user.login, user._id);

      return res.status(201).send(transferIdToString(newComment));
    }

    return res.status(404).send();
  }
)

// get selected post comments
postsRouter.get('/:postId/comments',
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const pageNumber = Number(req.query.PageNumber) || 1;
    const pageSize = Number(req.query.PageSize) || 10;

    const skip = (pageNumber - 1) * pageSize;

    const posts = await commentsService.getAllPosts(skip, pageSize);
    const totalCount = await commentsService.getAllPostsCount();
    const pagesCount = Math.ceil(totalCount / pageSize);

    let foundPost = await postsService.getPostById(postId);

    if (!foundPost) {
      return res.status(404).send();
    }

    return res.status(200).send({
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: posts.map(p => transferIdToString(p))
    })
  }
)