import { Request, Response, NextFunction } from 'express';

const Joi = require('joi');
const schema = Joi.object().keys({
    id: Joi.string().min(36).max(36),
    name: Joi.string().alphanum().min(3)
})

//validate id
export function validateId(req: Request, res: Response, next: NextFunction) {

    const id = req.params.id;
    const result = Joi.validate({ id: id }, schema);
    if (result.error !== null) {
        throw new Error("id input");
    }
    else next();
}

//validate name
export function validateName(req: Request, res: Response, next: NextFunction) {
    const result = Joi.validate({ name: req.params.name }, schema);
    if (result.error !== null) {
        throw new Error("name input");
    }
    else next();
}