import Dashboard from '@/components/Dashboard'
import Menu from '@/components/Menu'

export default function DashboardPage() {
    const data = [
        { month: 'January', weight: 2 },
        { month: 'Februrary', weight: 16 },
        { month: 'March', weight: 10 },
        { month: 'April', weight: 15 },
        { month: 'May', weight: 3 },
        { month: 'June', weight: 5 },
        { month: 'July', weight: 20 },
        { month: 'August', weight: 16 },
        { month: 'September', weight: 12 },
        { month: 'October', weight: 15 },
        { month: 'November', weight: 18 },
        { month: 'December', weight: 20 }];
    return (
        <div>
            <Menu></Menu>
            <Dashboard></Dashboard>
        </div>
    )
}