import ErrorFactory from '../services/error.factory'
import {
    CastError,
    DuplicateFieldsError,
    ValidationError,
} from '../services/errors/db.error'
import { Request, Response, NextFunction } from 'express'

const ErrorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let factory = new ErrorFactory(error)

    if (error.name === 'CastError') factory = new CastError(error)
    else if (error.code === 11000) factory = new DuplicateFieldsError(error)
    else if (error.name === 'ValidationError')
        factory = new ValidationError(error)

    factory.handler((error_reponse: any): void => {
        res.status(error_reponse.statusCode).json(error_reponse)
    })
}

export default ErrorMiddleware
