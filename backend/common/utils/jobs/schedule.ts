import cron from 'node-cron'
import fs from 'fs'
import path from 'path'

export default async () => {
    const directory = '../backend/common/dummy_data'
    cron.schedule('*/60 * * * * *', () => {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(directory, file), (err) => {
                console.log('delete file:', path.join(directory, file));
                if (err) throw err;
              });
            }
          });
    })
}
