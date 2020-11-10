import { Router } from 'express';
import appointmentsRouter from './appointments';
import sessionsRouter from './sessions';
import usersRouter from './users';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
