import { Request, Response, NextFunction } from 'express';

export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (!req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
//catch input errors(name.length<3 or id.length>36)
export function validationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err.message);
  if (err.message === "name input" || err.message === "id input") {
    res.status(400);
    res.send(`${err.message} error`);
  }
  else if (err.message === "id not found") {
    res.status(404);
    res.send(`${err.message} error`);
  }
  else next(err);
}

