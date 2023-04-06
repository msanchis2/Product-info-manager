// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const EmpresasList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Empresas' breadCrumbParent='Empresas' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default EmpresasList