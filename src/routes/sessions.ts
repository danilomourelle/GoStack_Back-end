import { Request, Response, Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authentication = new AuthenticateUserService();

  const { user, token } = await authentication.execute({ email, password });

  return res.status(201).send({ user, token });
});

export default sessionsRouter;
