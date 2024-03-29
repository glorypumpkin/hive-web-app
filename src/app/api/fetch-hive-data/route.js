import { getBeeData, dataFetching } from '@/lib/dataFetching';
import { convertor } from '@/lib/convertor';
import { genericGetData } from '@/lib/weatherStore';
import { differenceInYears } from "date-fns";

const weightStrategy = {
    set: 'weight_set',
    getAndFetchMissing: async ({ set, from, to, data }) => {
        const fileContents = await dataFetching();
        const dataFromDrive = convertor(fileContents);
        // find differences between data and dataFromDrive
        // expect that both arrays are sorted with oldest data at the beginning
        // console.log('datafromdrive', dataFromDrive)
        // console.log('data length', data.length)
        const newestTimestamp = data[data.length - 1]?.timestamp ?? 0;
        const newData = [];
        for (let i = dataFromDrive.length - 1; i >= 0; i--) {
            const current = dataFromDrive[i];
            if (current.timestamp > newestTimestamp) {
                newData.push(current);
            } else {
                break;
            }
        }
        return newData;
    },
    extractTimestamp: (item) => {
        const timestamp = item.timestamp;
        return timestamp;
    }

}

export async function GET(request) {
    const queryParams = new URLSearchParams(request.url);
    const fromQuery = queryParams.get('from');
    const toQuery = queryParams.get('to');

    // convert to date objects
    const from = new Date(fromQuery);
    const to = new Date(toQuery);

    const diffInYears = differenceInYears(from, to);
    if (diffInYears > 4) {
        return new Response("Date range is too large", { status: 400 });
    }

    let weightData = null;
    try {
        weightData = await genericGetData({ ...weightStrategy, from, to });
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }

    if (weightData === null) {
        return new Response("No data found", { status: 404 });
    }
    return new Response(JSON.stringify(weightData), { headers: { 'Content-Type': 'application/json' } });
}

