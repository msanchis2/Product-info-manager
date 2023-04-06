// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const TraduccionesList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Traducciones' breadCrumbParent='Traducciones' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default TraduccionesList