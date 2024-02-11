import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

const fileMetadata = {
    'name': 'notes.txt',
    'parents': ['appDataFolder']
};

function readNotesFile(token) {
    const { accessToken, scope, id_token } = token;
    const auth = new google.auth.JWT(null, null, accessToken, scope, null, id_token);
    const drive = google.drive({ version: 'v3', auth })
    drive.files.create({
        resource: fileMetadata,
        media: {
            mimeType: 'text/plain',
            body: 'Hello World'
        },
        fields: 'id'
    }, (err, file) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File Id: ', file.id);
        }
    });
}


export async function GET(request) {
    // console.log(request)
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // console.log("iii", token)
    const accessToken = token.token.account.access_token;
    const scope = token.token.account.scope;
    const id_token = token.token.account.id_token;
    console.log(token.token)
    console.log(accessToken)
    readNotesFile({
        accessToken: accessToken,
        scope: scope,
        id_token: id_token
    });
    return Response.json("hoho");
}