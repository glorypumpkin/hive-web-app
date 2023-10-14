import Menu from '@/components/Menu'
import MainPage from '@/components/MainPage'
import RegistrationForm from '../components/RegistrationForm.jsx'
import GraphExample from '@/components/GraphExample'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Menu></Menu>
      <MainPage></MainPage>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/registration">Registration</Link>
      <GraphExample></GraphExample>
    </div>
  )
}
