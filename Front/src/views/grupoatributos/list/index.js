// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const GrupoatributosList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Grupos de atributos' breadCrumbParent='Grupos de Atributos' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default GrupoatributosList