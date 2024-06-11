interface IWeather {
    location: string
    date: string
    temperature: string
    wind: string
    humidity: string
    imgCondition: string
    textCondition: string
}

// await Email.create({
//     email: 'giahuy200202@gmail.com',
//   });
// await GMailer.sendMail({
//     to: 'giahuy200202@gmail.com',
//     subject: 'Test',
//     html: '<h3>weatherData</h3>',
// });

export default IWeather
