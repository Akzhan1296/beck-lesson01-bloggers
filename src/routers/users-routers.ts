import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { usersService } from "../domain/users-service";
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { requestsSaverMiddleware } from "../middlewares/request-test";

export const usersRouter = Router({});

// get all users
usersRouter.use(requestsSaverMiddleware);
usersRouter.get('/', async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.PageNumber) || 1;
  const pageSize = Number(req.query.PageSize) || 10;

  const skip = (pageNumber - 1) * pageSize;

  const users = await usersService.getAllUsers(skip, pageSize);
  const totalCount = await usersService.getAllUsersCount();
  const pagesCount = Math.ceil(totalCount / pageSize);

  console.log(users);

  return res.status(200).send({
    page: pageNumber,
    pageSize: pageSize,
    totalCount,
    pagesCount,
    items: users.map(u => ({id: u.id, login: u.login })),
  })
});

// create user with JWT
usersRouter.post('/', authMiddleWare, inputValidators.login, inputValidators.password, sumErrorsMiddleware, async (req: Request, res: Response) => {
  const newUser = await usersService.createUser(req.body.login, req.body.password);

  const { login, id } = newUser;

  return res.status(201).send({ id, login });
});

// delete user with JWT
usersRouter.delete('/:id', authMiddleWare, async (req: Request, res: Response) => {
  const id = req.params.id;

  const isDeleted = await usersService.deleteUser((id));
  if (isDeleted) {
    return res.send(204);
  } else {
    return res.send(404);
  }
});