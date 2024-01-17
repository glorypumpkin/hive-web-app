import Dashboard from '@/components/Dashboard'
import Menu from '@/components/Menu'
import { getBeeData } from '@/lib/dataFetching.js'


export default async function DashboardPage() {
    const data = await getBeeData();
    return (
        <div>
            <Menu></Menu>
            <Dashboard data={data}></Dashboard>
        </div>
    )
}