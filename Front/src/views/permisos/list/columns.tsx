// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getRolePermission, deleteRolePermission, addPermission, deletePermission } from '../store/action'
import { store } from '@store/storeConfig/store'
import { PermisosState } from '../store/reducer'
import { useSelector } from 'react-redux'

// ** Third Party Components
import { UncontrolledTooltip, CustomInput } from 'reactstrap'
import { Eye, Trash2, Edit } from 'react-feather'
import { FormattedMessage } from 'react-intl'

// ** Types
import { RootState } from 'src/types'

// ** Utils
import { PermisosWithRelations, RolesWithRelations } from '@api/backend'
import { BaseSyntheticEvent } from 'react'


const getDescriptionKey = (key: string): string => {

    const parts = key && key.split('-')
    switch (parts?.length) {
        case 3:
            return parts[2]
        case 2:
            return parts[1]
        default:
            return key
    }
}
// Devuelve columna Rol, y punto menu con sus acciones
export const columns = [
    {
        name: <FormattedMessage id='Rol' />,
        minWidth: '297px',
        selector: 'name',
        sortable: true,
        className: 'text-success',
        cell: (row: any) => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <span className='font-weight-bold'>{getDescriptionKey(row.key)}</span>
                </div>
            </div>
        )
    }
]

const columnsActions = [
    {
        name: <FormattedMessage id='Acciones' />,
        minWidth: '100px',
        cell: (row: PermisosWithRelations) => (
            <div className='column-action d-flex align-items-center'>
                <Link to={`/admin/role/view/${row.id}`} id={`pw-tooltip-${row.id}`} onClick={() => store.dispatch(getRolePermission(row.id))}>
                    <Eye size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                    <FormattedMessage id='Preview' />
                </UncontrolledTooltip>
                <Link to={`/admin/role/edit/${row.id}`} id={`edit-tooltip-${row.id}`} onClick={() => store.dispatch(getRolePermission(row.id))}>
                    <Edit size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
                    <FormattedMessage id='Edit' />
                </UncontrolledTooltip>

                <Link to="#" id={`delete-tooltip-${row.id}`} onClick={() => store.dispatch(deleteRolePermission(row.id))}>
                    <Trash2 size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.id}`}>
                    <FormattedMessage id='Borrar' />
                </UncontrolledTooltip>
            </div>
        )
    }
]
// Añade o borra permiso
const handleRolePermission = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    const {checked, id, value} = event.target
    if (checked) {
        store.dispatch(addPermission(id, checked))
    } else {
        store.dispatch(deletePermission(id, checked))
    }
    return null
}

// Controlo que cada rol tenga acceso a cada permiso
// Comparo todo el allData, con los datos que recibe el checkbox
const  getPermissionId = (key: string, roleId, allData: PermisosWithRelations[]) => {
    const [module, controller, action] = key?.split('-')
    const found = allData.find(permission => (
        permission.moduleName === module &&
        permission.controllerName === controller &&
        permission.actionName === action &&
        permission.rolesId === roleId
    ))
    return found?.id
}
// Imprimo los checkbox por cada Rol
// E imprimo cada nombre de rol
const getRoleColum: any = (role: RolesWithRelations, allData: PermisosWithRelations[]) => {
    return {
        name: role.nombre,
        minWidth: '120px',
        selector: 'nombre',
        sortable: true,
        cell: (row: any) => (
            // Only show checkbox for actions
            row.key?.split('-').length > 2 &&
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                <CustomInput
                        type="checkbox"
                        id={`role_${row.key}_${role.id}`}
                        onChange={(e) => handleRolePermission(e)}
                        defaultChecked={!!getPermissionId(row.key, role.id, allData)}
                        value={getPermissionId(row.key, role.id, allData)}
                    />     
                </div>
            </div>
        )
    }

}

export const getColumns: any = () => {
    const store = useSelector((state: RootState): PermisosState => state.permisos)
    // const rolesColumns = store.roles.map((role: RolesWithRelations) => getRoleColum(role, store.allData))
    // Recojo los roles y los paso a la funcion getRoleColumn que pinta checkbox y el nombre del rol, id, etc.
    // store roles, store permisos o stores que?
    const rolesColumns = store.roles.map((role: RolesWithRelations) => getRoleColum(role, store.allData))
    return [
        ...columns,
        ...rolesColumns
    ]
}
