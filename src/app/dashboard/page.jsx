import Dashboard from '@/components/Dashboard'
import Menu from '@/components/Menu'
import { getBeeData } from '@/lib/dataFetching.js'
import AccessHandler from '@/components/AccessHandler';

export default async function DashboardPage() {
    const data = await getBeeData();
    const pageName = 'Dashboard';
    return (
        <div className='bg-[#1976d214] min-h-screen flex flex-col'>
            <AccessHandler></AccessHandler>
            <Menu pageName={pageName}></Menu>
            <Dashboard data={data}></Dashboard>
        </div>
    )
}