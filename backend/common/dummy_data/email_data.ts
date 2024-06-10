import EmailModel, { IEmail } from '../models/email.model';

export const getVehicleData = async () => {
    const data: IEmail[] = [];
    const getDataFromDB = await EmailModel.find();
    for (let i = 0; i < getDataFromDB.length; i++) {
        data.push({
            email: getDataFromDB[i].email,
        })
    }
    return data;
}
