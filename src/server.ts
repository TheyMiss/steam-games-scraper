import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import log from '.';

const app = express();

const PORT = process.env.PORT;

//Allow all requests from all domains & localhost
app.all('/*', function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  log.info(`Server is listening at ${PORT}`);
});
