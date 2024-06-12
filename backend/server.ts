import Application from './common/app'
import * as allController from './common/controllers'
import Logger from './common/utils/logger'
import scheduleJob from './common/utils/jobs/schedule'

process.on('uncaughtException', (err: Error) => {
    Logger.error('Uncaught Exception. Shutting down...')
    Logger.error(err.name, err.message, err.stack)

    setTimeout(() => {
        process.exit(1)
    }, 3000)
})

const app = new Application({
    controllers: Object.values(allController),
    mongoConnection: {
        uri: process.env.MONGO_URI as string,
    },
})

const server = app.run()

// scheduleJob();

process.on('unhandledRejection', (err: Error) => {
    Logger.error('Unhandled Rejection. Shutting down...')
    Logger.error(err.name, err.message, err.stack)
    setTimeout(() => {
        server.close(() => {
            process.exit(1)
        })
    }, 3000)
})

export default server
