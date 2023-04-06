// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const marcasList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Marcas' breadCrumbParent='Marcas' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default marcasList