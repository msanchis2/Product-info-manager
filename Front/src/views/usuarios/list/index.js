// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const UsuariosList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Usuarios' breadCrumbParent='Usuarios' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default UsuariosList