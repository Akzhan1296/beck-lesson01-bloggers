import { Request, Response, Router } from "express";
import { bloggersService } from "../domain/bloggers-service";
import { inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware'
import { authMiddleWare } from "../middlewares/auth-middleware";

export const bloggersRouter = Router({})

bloggersRouter.get('/', async (req, res) => {
  const bloggers = await bloggersService.getBloggers();
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

