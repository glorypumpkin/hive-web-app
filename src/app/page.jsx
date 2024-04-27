import Menu from '@/components/Menu'
import MainPage from '@/components/MainPage'
import Link from 'next/link'
import { getBeeData } from '@/lib/dataFetching.js'
import RedirectIfNeeded from '@/components/RedirectIfNeeded';

export default async function Home() {
  const data = await getBeeData();
  const pageName = '';
  return (
    <div className='bg-gradient-to-b from-[#d2dce2] via-[#fffae7] via-100% to-[rgba(255, 224, 205, 0)] min-h-screen'>
      {/* <RedirectIfNeeded></RedirectIfNeeded> */}
      <Menu pageName={pageName}></Menu>
      {/* <PeriodGraph data={data}></PeriodGraph> */}
      <MainPage data={data}></MainPage>
      {/* <Link href="/dashboard">Dashboard</Link> */}
      {/* <GraphExample></GraphExample> */}
      {/* <a href="https://www.flaticon.com/free-icons/compression" title="compression icons">Compression icons created by MansyGraphics - Flaticon</a> */}
    </div>
  )
}
