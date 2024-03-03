import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

const fileMetadata = {
    'name': 'notes.json',
    'parents': ['appDataFolder']
};

async function getNotesFileId(drive) {
    //look up file notes.txt in appDataFolder

    const listResult = await drive.files.list({
        spaces: 'appDataFolder',
        fields: 'files(id, name)',
        pageSize: 10,
        // q: `name='${fileMetadata.name}'`
    });

    // console.log('list result:', listResult)
    const length = listResult.data.files.length;
    if (length > 0) {
        return listResult.data.files[0].id;
    }

    //if not found, create a new file
    const result = await drive.files.create({
        resource: fileMetadata,
        media: {
            mimeType: 'text/plain',
            body: '[]'
        },
        fields: 'id'
    });
    console.log('created file')
    return result.data.id;
}

async function writeNoteContent(drive, fileId, content) {
    const media = {
        mimeType: 'text/plain',
        body: content
    };
    const result = await drive.files.update({
        fileId: fileId,
        media: media
    });
    console.log('updated file')
    return result.data.id;
}

async function readNoteContent(drive, fileId) {
    const result = await drive.files.get({
        fileId: fileId,
        alt: 'media'
    });
    console.log('read file')
    return result.data;
}

async function deleteNoteContent(drive, fileId) {
    const result = await drive.files.delete({
        fileId: fileId
    });
    console.log('deleted file')
    return result.data;
}

async function getDrive(token) {
    const { accessToken } = token;
    const auth = new google.auth.OAuth2({});
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth })

    return drive;
}


export async function GET(request) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const drive = await getDrive({
            accessToken: token.access_token
        });
        const fileId = await getNotesFileId(drive);
        const content = await readNoteContent(drive, fileId);
        return new Response(content);
        // return new Response('test');
    }
    catch (e) {
        console.error(e)
        return new Response(e)
    }
}
// TODO: test functionality later in client
export async function POST(request) {
    // console.log(request)
    const content = await request.text();
    const contentJSON = JSON.parse(content);
    if (contentJSON === undefined || contentJSON === null || contentJSON === '') {
        return new Response('Invalid content');
    }
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const drive = await getDrive({
            accessToken: token.access_token
        });
        const fileId = await getNotesFileId(drive);
        await writeNoteContent(drive, fileId, content);
        return new Response("OK");
        // return new Response('test');
    }
    catch (e) {
        console.error(e)
        return new Response(e)
    }
}

export async function DELETE(request) {
    // console.log(request)
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const drive = await getDrive({
            accessToken: token.access_token
        });
        const fileId = await getNotesFileId(drive);
        await deleteNoteContent(drive, fileId);
        return new Response("OK");
        // return new Response('test');
    }
    catch (e) {
        console.error(e)
        return new Response(e)
    }
}