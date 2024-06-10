import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import { Server, createServer } from 'http'
import chalk from 'chalk'
import IController from './interfaces/controller'
import ErrorFactoryHandler from './middlewares/error.middleware'
import CorsCustomOptions from './configs/cors.config'
import IEvent from './interfaces/event'
import mimes from './constants/mimes'
import AppError from './services/errors/app.error'
import credentials from './middlewares/credential.middleware'
import Logger from './utils/logger'

type MongoConnection = {
    uri: string
    options?: mongoose.ConnectOptions
}


type ApplicationOptions = {
    controllers: IController[]
    mongoConnection: MongoConnection
}

class Application {
    private app: express.Application
    private appName: string
    private appVersion: string
    private httpServer: Server

    private controllers: IController[] = []
    private events: IEvent[] = []

    private mongoConnection: MongoConnection

    private rabbitRetry: number = 5

    constructor(options: ApplicationOptions) {
        this.app = express()

        this.httpServer = createServer(this.app)

        this.controllers = options.controllers
        this.mongoConnection = options.mongoConnection

        this.appName = `[${process.env.APP_NAME}]`
        this.appVersion = `${process.env.APP_VERSION}`

        this.mongoDBConnect(
            this.mongoConnection.uri,
            this.mongoConnection.options
        )

        this.setup()
    }

    public application() {
        return this.app
    }

    private async setup() {
        this.app.enable('trust proxy')

        Logger.info(chalk.yellow('Setting up server...'))

        this.app.use(credentials)
        this.app.use(cors(CorsCustomOptions))
 
        this.app.use(express.json({ limit: '50mb' }))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())

        this.app.use(
            morgan(
                `${chalk.blue(this.appName)}${chalk.yellow('[:date]')} ${chalk.green(':method')} ${chalk.cyan(
                    ':status'
                )} ${chalk.white(':url')} :res[content-length] - :response-time ms`
            )
        )

        this.controllers.forEach((controller) => {
            this.app.use(
                `/${this.appVersion}${controller.path}`,
                controller.router
            )
        })

        this.app.get('/status', (req, res) => {
            return res.json({
                server: this.appName.replace(/\[(.*)\]/, '$1'),
                status: '200 - OK',
                message: 'Server is running ...',
            })
        })

        this.app.all('*', (req, res, next) => {
            const file = path.join(__dirname, req.path)
            const type: string = mimes[path.extname(file).slice(1)]

            if (type) {
                const s = fs.createReadStream(file)

                s.on('open', () => {
                    res.set('Content-Type', type)
                    s.pipe(res)
                })

                s.on('error', () => {
                    return next(
                        new AppError(
                            `Can't find ${req.originalUrl} on this server!`,
                            404
                        )
                    )
                })
            } else {
                return next(
                    new AppError(
                        `Can't find ${req.originalUrl} on this server!`,
                        404
                    )
                )
            }
        })

        this.app.use(ErrorFactoryHandler)
    }

    private mongoDBConnect(
        uri: string,
        options: mongoose.ConnectOptions = {}
    ): void {
        mongoose
            .connect(uri, options)
            .then(() => {
                Logger.info(chalk.green('Connected to database successfully'))
            })
            .catch((error) => {
                Logger.error('Could not connect to the database', error)
            })
    }

    public run(callback: () => void = () => {}) {
        Logger.info(chalk.blue('Server is starting...'))

        const availablePort = process.env.APP_PORT ?? 3000

        const server: Server = this.httpServer.listen(
            availablePort,
            async () => {
                Logger.info(
                    chalk.green(
                        `Server is running on port ${chalk.cyan(availablePort)}`
                    )
                )
                callback()
            }
        )

        return server
    }
}

export default Application
