import { parseISO } from 'date-fns';
import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req: Request, res: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.status(200).send(appointments);
});

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
