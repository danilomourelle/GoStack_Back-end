import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import chalk from 'chalk';

import uploadConfig from './config/upload';
import routes from './routes';

import './database';
import BaseError from './errors/BaseError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).send({
      error: true,
      message: err.message,
    });

    console.error(err.stack);
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    });
  }
});

app.listen(5000, () => {
  console.log(chalk.yellow('✨ Server started on http://localhost:5000 ✨'));
});
