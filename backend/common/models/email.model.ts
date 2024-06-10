import mongoose from 'mongoose'

export interface IEmail {
    email: string
}

const EmailSchema = new mongoose.Schema<IEmail>({
    email: { type: String },
})

const EmailModel = mongoose.model<IEmail>('email', EmailSchema)

export default EmailModel
