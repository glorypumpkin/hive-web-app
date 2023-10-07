import Menu from '../components/Menu.jsx'
import MainPage from '../components/MainPage.jsx'
import RegistrationForm from '../components/RegistrationForm.jsx'
import GraphExample from '../components/GraphExample.jsx'
import BigGraphPage from '@/components/BigGraphPage.jsx'

export default function Home() {
  return (
    <div>
      <Menu></Menu>
      <MainPage></MainPage>
      <GraphExample></GraphExample>
    </div>
  )
}
