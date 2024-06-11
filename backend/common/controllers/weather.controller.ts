import mongoose from 'mongoose'
import { NextFunction, Request, Response, Router } from 'express'
import IController from '../interfaces/controller'
import catchAsync from '../utils/catch.error'
import fetch from 'node-fetch'
import IWeather from 'common/dummy_data/interface'
import GMailer from '../services/mailer.builder'
import Email from '../models/email.model'
import fs from 'fs'

// const serviceApprovalData = DummyData.serviceApprovals

class WeatherController implements IController {
    readonly path: string = '/weather'
    readonly router: Router = Router()

    constructor() {
        this.router.post('/current', catchAsync(this.getCurrentWeather))
    }

    private async getCurrentWeather(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const location = req.body.location ?? 'ho chi minh'
        const pathname = location
            .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
            .toLowerCase()

        if (fs.existsSync(`../backend/common/dummy_data/${pathname}.json`)) {

            fs.readFile(`../backend/common/dummy_data/${pathname}.json`, 'utf8', (err, data) => {
                if (err){
                    console.log(err);
                } else {
                const weatherData = JSON.parse(data); //now it an object
                return res.status(200).json({
                    status: 'success',
                    data: weatherData,
                })
            }});

        } else {
            const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=14&aqi=no&alerts=no`
            try {
    
                const response = await fetch(weatherURL)
                const weatherData = await response.json()
                const weatherArray: IWeather[] = []
                for (const weather of weatherData.forecast.forecastday) {
                    weatherArray.push({
                        location: weatherData.location.name,
                        date: weather.date,
                        temperature: weather.day.maxtemp_c
                            ? weather.day.maxtemp_c.toString()
                            : '',
                        wind: weather.day.maxwind_kph
                            ? (Math.floor(weather.day.maxwind_kph/3.6 *100)/100).toString()
                            : '',
                        humidity: weather.day.avghumidity
                            ? weather.day.avghumidity.toString()
                            : '',
                        imgCondition: weather.day.condition.icon ?? '',
                        textCondition: weather.day.condition.text ?? '',
                    })
                }
    
                const json = JSON.stringify(weatherArray)
                fs.writeFile(
                    `../backend/common/dummy_data/${pathname}.json`,
                    json,
                    'utf8',
                    () => {
                        return res.status(200).json({
                            status: 'success',
                            data: weatherArray,
                        })
                    }
                )
            } catch (error) {
                console.log('Error fetching weather data:', error)
                throw error
            }
        }

    }
}

export default new WeatherController()
