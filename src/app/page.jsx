import Menu from '@/components/Menu'
import MainPage from '@/components/MainPage'
import RegistrationForm from '../components/RegistrationForm.jsx'
import GraphExample from '@/components/GraphExample'
import Link from 'next/link'
import PeriodGraph from '@/components/PeriodGraph.jsx'
import { getBeeData } from '@/lib/dataFetching.js'

export default async function Home() {
  const data = await getBeeData();

  return (
    <div>
      <Menu></Menu>
      {/* <PeriodGraph data={data}></PeriodGraph> */}
      <MainPage data={data}></MainPage>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/registration">Registration</Link>
      {/* <GraphExample></GraphExample> */}
      {/* <a href="https://www.flaticon.com/free-icons/compression" title="compression icons">Compression icons created by MansyGraphics - Flaticon</a> */}
    </div>
  )
}
