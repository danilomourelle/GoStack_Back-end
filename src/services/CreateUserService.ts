import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import BaseError from '../errors/BaseError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const existingUser = await usersRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new BaseError('Email address already used');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
