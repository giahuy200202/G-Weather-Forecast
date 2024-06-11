import cron from 'node-cron'
import InformationModel, { IInformation } from '../../models/information.model'
import GMailer from '../../services/mailer.builder'
import IWeather from 'common/dummy_data/interface'
import fetch from 'node-fetch'

export default async () => {
    const data: IInformation[] = []
    let weatherURL: string = ''
    const getDataFromDB = await InformationModel.find()
    for (let i = 0; i < getDataFromDB.length; i++) {
        data.push({
            email: getDataFromDB[i].email,
            location: getDataFromDB[i].location,
        })
    }

    for (const value of data) {
        weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${value.location}&days=1&aqi=no&alerts=no`
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
                      Math.floor((assignWeather.day.maxwind_kph / 3.6) * 100) /
                      100
                  ).toString()
                : '',
            humidity: assignWeather.day.avghumidity
                ? assignWeather.day.avghumidity.toString()
                : '',
            imgCondition: assignWeather.day.condition.icon ?? '',
            textCondition: assignWeather.day.condition.text ?? '',
        }
        // cron.schedule('*/60 * * * * *', () => {
        //     GMailer.sendMail({
        //         to: value.email,
        //         subject: 'Weather Information',
        //         html: `
        //                 <h4>We would like to send you today\'s weather information</h4> 
        //                 <p>Location: ${formatWeather.location}</p>
        //                 <p>Date: ${formatWeather.date}</p>
        //                 <p>Temperature: ${formatWeather.temperature}</p>
        //                 <p>Wind: ${formatWeather.wind}</p>
        //                 <p>Humidity: ${formatWeather.humidity}</p>
        //                 <p>Condition: ${formatWeather.textCondition}</p>
        //             `,
        //     })
        // })
    }
}
