import mongoose from 'mongoose'
import { NextFunction, Request, Response, Router } from 'express'
import IController from '../interfaces/controller'
import catchAsync from '../utils/catch.error'
import fetch from 'node-fetch'
import IWeather from 'common/interfaces/weather'
import GMailer from '../services/mailer.builder'
import Information from '../models/information.model'
import fs from 'fs'
import cron from 'node-cron'

// const serviceApprovalData = DummyData.serviceApprovals

class WeatherController implements IController {
    readonly path: string = '/weather'
    readonly router: Router = Router()

    constructor() {
        this.router.post('/current', catchAsync(this.getCurrentWeather))
        this.router.post('/subscribe', catchAsync(this.subcribeWeather))
    }

    private async getCurrentWeather(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // await Information.create({
        //     email: 'giahuy200204@gmail.com',
        //     location: 'ho chi minh',
        // })
        const location = req.body.location ?? 'ho chi minh'
        const pathname = location
            .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
            .toLowerCase()

        if (fs.existsSync(`../backend/common/dummy_data/${pathname}.json`)) {
            fs.readFile(
                `../backend/common/dummy_data/${pathname}.json`,
                'utf8',
                (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const weatherData = JSON.parse(data) //now it an object
                        return res.status(200).json({
                            success: true,
                            data: weatherData,
                        })
                    }
                }
            )

            // fs.unlinkSync(`../backend/common/dummy_data/${pathname}.json`);
        } else {
            const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=14&aqi=no&alerts=no`
            try {
                const response = await fetch(weatherURL)
                const weatherData = await response.json()
                console.log(weatherData);
                if('error' in weatherData){
                    return res.status(200).json({
                        success: false,
                        message: weatherData.error.message,
                    })
                }
                else{
                    const weatherArray: IWeather[] = []
                    for (const weather of weatherData.forecast.forecastday) {
                        weatherArray.push({
                            location: weatherData.location.name,
                            date: weather.date,
                            temperature: weather.day.maxtemp_c
                                ? weather.day.maxtemp_c.toString()
                                : '',
                            wind: weather.day.maxwind_kph
                                ? (
                                      Math.floor(
                                          (weather.day.maxwind_kph / 3.6) * 100
                                      ) / 100
                                  ).toString()
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
                                success: true,
                                data: weatherArray,
                            })
                        }
                    )
                }
            } catch (error) {
                console.log('Error fetching weather data:', error)
                throw error
            }
        }
    }

    private async subcribeWeather(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email, location } = req.body

        if (!email || email.length === 0 || email.trim().length === 0) {
            return res.status(200).json({
                success: false,
                message: 'Please provide email',
            })
        } else if (
            !location ||
            location.length === 0 ||
            location.trim().length === 0
        ) {
            return res.status(200).json({
                success: false,
                message: 'Please provide location',
            })
        } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == false) {
            return res.status(200).json({
                success: false,
                message: 'Invalid email format',
            })
        }

        const isEmailExists = await Information.findOne({ email: email })

        if (isEmailExists) {
            return res.status(200).json({
                success: false,
                message: 'Email already exists',
            })
        } else {
            await Information.create({
                email: email,
                location: location,
            })

            GMailer.sendMail({
                to: email,
                subject: 'Weather Information',
                html: `
                    <h4>Thank you for subscribing to the weather forecast service. The forecast will be sent at 6:00 a.m. every day. Wish you a great day ahead!</h4> 
                `,
            })

            const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=1&aqi=no&alerts=no`
            const response = await fetch(weatherURL)
            const weatherData = await response.json()
            const assignWeather = weatherData.forecast.forecastday[0]
            const formatWeather: IWeather = {
                location: weatherData.location.name,
                date: assignWeather.date,
                temperature: assignWeather.day.maxtemp_c
                    ? assignWeather.day.maxtemp_c.toString()
                    : '',
                wind: assignWeather.day.maxwind_kph
                    ? (
                          Math.floor(
                              (assignWeather.day.maxwind_kph / 3.6) * 100
                          ) / 100
                      ).toString()
                    : '',
                humidity: assignWeather.day.avghumidity
                    ? assignWeather.day.avghumidity.toString()
                    : '',
                imgCondition: assignWeather.day.condition.icon ?? '',
                textCondition: assignWeather.day.condition.text ?? '',
            }
            cron.schedule('*/60 * * * * *', () => {
                // GMailer.sendMail({
                //     to: email,
                //     subject: 'Weather Information',
                //     html: `
                //             <h4>We would like to send you today\'s weather information</h4>
                //             <p>Location: ${formatWeather.location}</p>
                //             <p>Date: ${formatWeather.date}</p>
                //             <p>Temperature: ${formatWeather.temperature}</p>
                //             <p>Wind: ${formatWeather.wind}</p>
                //             <p>Humidity: ${formatWeather.humidity}</p>
                //             <p>Condition: ${formatWeather.textCondition}</p>
                //         `,
                // })
            })

            return res.status(200).json({
                success: true,
            })
        }
    }
}

export default new WeatherController()
