import { Request, Response, Router } from "express";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
  const user = await authService.checkCredentials(req.body.login, req.body.password)

  if (user) {
    const token = await jwtUtility.createJWT(user)
    res.status(200).send({token})
  } else {
    res.sendStatus(401)
  }
})