// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const GrupoatributosList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Roles' breadCrumbParent='Roles' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default GrupoatributosList