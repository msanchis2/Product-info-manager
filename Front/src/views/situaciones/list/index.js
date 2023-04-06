// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const SituacionesList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Situaciones' breadCrumbParent='Situaciones' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default SituacionesList