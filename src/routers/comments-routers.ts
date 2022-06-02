import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { commentsService } from "../domain/comments-service";
import { userAuthMiddleware } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";

export const commentsRouter = Router({});

commentsRouter.get('/:id',
  userAuthMiddleware,
  async (req: Request, res: Response) => {
    const commentId = new ObjectId(req.params.id);
    let foundComment = await commentsService.getCommentById(commentId);

    if (foundComment) {
      const { _id, ...rest } = foundComment;

      return res.status(200).send({ id: _id, ...rest });
    } else {
      return res.status(404).send();
    }
  });


commentsRouter.put('/:id', userAuthMiddleware,
  inputValidators.comments,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const user = req.user;
    const commentId = new ObjectId(req.params.id);
    const content = req.body.content;

    let foundComment = await commentsService.getCommentById(commentId);

    if (!foundComment) {
      return res.status(404).send();
    }

    if (foundComment && user && !foundComment.userId.equals(user._id)) {
      return res.status(403).send();
    }

    if (foundComment) {
      const isUpdated = await commentsService.updateComment(commentId, content, user.login, user._id);
      if (isUpdated) {
        return res.status(204).send();
      }
    }
  });

commentsRouter.delete('/:id', userAuthMiddleware, async (req: Request, res: Response) => {

  const user = req.user;
  const commentId = new ObjectId(req.params.id);

  let foundComment = await commentsService.getCommentById(commentId);

  if (!foundComment) {
    return res.status(404).send();
  }

  if (foundComment && user && !foundComment.userId.equals(user._id)) {
    return res.status(403).send();
  }

  if (foundComment) {
    const isDeleted = await commentsService.deleteComment(commentId);
    if (isDeleted) {
      return res.status(204).send();
    }
  }
});