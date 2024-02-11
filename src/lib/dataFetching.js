import { google } from 'googleapis';
import path from 'path';
import { convertor } from './convertor';

const FOLDER_ID_TEST = '1mo1WOEb1ZIwGHrEvTa2GQbZbnoNa6Ifi'
const FOLDER_ID = "1nJ_jKKuf4x8dbDZ7lwUmV5Jv3dWMGfqm"

export async function getBeeData() {
    const fileContents = await dataFetching();
    const data = convertor(fileContents);
    return data;
}

async function dataFetching() {

    // const auth = await authenticate({
    //     keyfilePath: path.join(__dirname, './oauth2.keys.json'),
    //     scopes: 'https://www.googleapis.com/auth/drive',
    // });
    // google.options({ auth });

    const auth = new google.auth.GoogleAuth({
        // keyFile: path.join(process.cwd(), './service.keys.json'),
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    google.options({ auth });

    const service = google.drive('v3');
    const res = await service.files.list({ pageSize: 8, q: `'${FOLDER_ID}' in parents` });
    // console.dir(res);
    let dataId = null;
    const dataFile = res.data.files.forEach(file => {
        if (file.mimeType === 'text/plain') {
            dataId = file.id;
        }
    });
    if (dataId == null) {
        throw new Error('No data file found');
    }
    const data = await service.files.get({ fileId: dataId, alt: 'media' }, { responseType: 'stream' });
    const fileContents = await loadFile(data.data);
    return fileContents;
}

async function loadFile(stream) {
    return new Promise((resolve, reject) => {
        let fileContents = "";
        stream
            .on('end', () => {
                console.log('Done downloading file.');
                resolve(fileContents);
            })
            .on('error', err => {
                console.error('Error downloading file.');
                reject(err);
            })
            .on('data', d => {
                fileContents += d;
            })
    })
}