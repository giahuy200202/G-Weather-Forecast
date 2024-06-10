import mongoose from 'mongoose'
import { NextFunction, Request, Response, Router } from 'express'
import IController from '../interfaces/controller'
import catchAsync from '../utils/catch.error'
import fetch from "node-fetch";
import GMailer from '../services/mailer.builder'
import Email from '../models/email.model'

// const serviceApprovalData = DummyData.serviceApprovals

class ServiceApprovalController implements IController {
    readonly path: string = '/weather'
    readonly router: Router = Router()

    constructor() {
        this.router.get('/current', catchAsync(this.returnHelloWorld))
    }

    private async returnHelloWorld(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const apiKey = '4be369c07cb0489a98132328241006'
        const location = 'vietnam'
        const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&aqi=no`
        try {
            await Email.create({
                email: 'giahuy200202@gmail.com',
              });
            const response = await fetch(weatherURL)
            const weatherData = await response.json()
            await GMailer.sendMail({
                to: 'giahuy200202@gmail.com',
                subject: 'Test',
                html: '<h3>weatherData</h3>',
            });
            return res.status(200).json({
                status: 'success',
                data: weatherData,
            })
        } catch (error) {
            console.log('Error fetching weather data:', error)
            throw error
        }
    }
}

export default new ServiceApprovalController()
