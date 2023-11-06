import { getBeeData } from '@/lib/dataFetching';

export async function GET(request) {
    const data = await getBeeData();
    return Response.json(data);
}

