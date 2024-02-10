import Dashboard from '@/components/Dashboard'
import Menu from '@/components/Menu'
import { getBeeData } from '@/lib/dataFetching.js'
import AccessHandler from '@/components/AccessHandler';

export default async function DashboardPage() {
    const data = await getBeeData();

    return (
        <div>
            <AccessHandler></AccessHandler>
            <Menu></Menu>
            <Dashboard data={data}></Dashboard>
        </div>
    )
}