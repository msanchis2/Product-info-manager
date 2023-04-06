// ** Role List Component
import Table from './Table'

import BreadCrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'
// import {isAdmin} from '@src/auth/utils'

const PermisosList = () => {
    // if (!isAdmin()) return null
    return (
        <div className='app-permission-list'>
            <BreadCrumbs breadCrumbTitle='Permisos' breadCrumbParent='Permisos' breadCrumbActive='Lista' />
            <Table />
        </div>
    )
}

export default PermisosList
