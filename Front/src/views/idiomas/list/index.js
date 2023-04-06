// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const IdiomasList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Idiomas' breadCrumbParent='Idiomas' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default IdiomasList