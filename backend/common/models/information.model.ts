import mongoose from 'mongoose'

export interface IInformation {
    email: string
    location: string
}

const InformationSchema = new mongoose.Schema<IInformation>({
    email: { type: String },
    location: { type: String },
})

const InformationModel = mongoose.model<IInformation>('information', InformationSchema)

export default InformationModel
