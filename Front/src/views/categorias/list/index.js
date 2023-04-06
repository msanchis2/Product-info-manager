// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
const CategoriasList = () => {

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Categorias' breadCrumbParent='Categorias' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default CategoriasList