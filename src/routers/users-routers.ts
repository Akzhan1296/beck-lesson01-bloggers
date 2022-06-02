import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { usersService } from "../domain/users-service";
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";

export const usersRouter = Router({});

// get all users
usersRouter.get('/', async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.PageNumber) || 1;
  const pageSize = Number(req.query.PageSize) || 10;

  const skip = (pageNumber - 1) * pageSize;

  const users = await usersService.getAllUsers(skip, pageSize);
  const totalCount = await usersService.getAllUsersCount();
  const pagesCount = Math.ceil(totalCount / pageSize);

  return res.status(200).send({
    page: pageNumber,
    pageSize: pageSize,
    totalCount,
    pagesCount,
    items: users.map(u => ({ login: u.login, id: u._id })),
  })
});

// create user with JWT
usersRouter.post('/', authMiddleWare, inputValidators.login, inputValidators.password, sumErrorsMiddleware, async (req: Request, res: Response) => {
  const newUser = await usersService.createUser(req.body.login, req.body.password);
  return res.status(201).send({ id: newUser._id, login: newUser.login });
});

// delete user with JWT
usersRouter.delete('/:id', authMiddleWare, async (req: Request, res: Response) => {
  const id = new ObjectId (req.params.id);

  const isDeleted = await usersService.deleteUser((id));
  if (isDeleted) {
    return res.send(204);
  } else {
    return res.send(404);
  }
});