import { Dispatch } from 'react'
import { NewPermisos, PermisosControllerApi, RolesControllerApi, PermisosFilter, RolesFilter1, settings } from '@api/backend'

const prefix = 'permisos'
const api = new PermisosControllerApi(settings)
export const getRoles = () => {
    const api = new RolesControllerApi(settings)

    return async (dispatch) => {
        const filter = { where: { ['active']: { eq: true } }, include: [{ relation: "permisos" }] }
        await api.rolesControllerFind(JSON.stringify(filter)).then(response => {
            dispatch({
                type: `${prefix}/GET_ROLES`,
                data: response.data
            })
        })
    }
}

export const addPermission = (id, value) => {
    return async (dispatch) => {
        const parts = id.split('_')
        const [module, controller, action] = parts[1].split('-')
        const newPermission = {
            moduleName: module,
            controllerName: controller || '',
            actionName: action || '',
            rolesId: Number(parts[2])
        }
        await api.permisosControllerCreate(newPermission).then(response => {
            dispatch({
                type: `${prefix}/ADD`,
                data: response.data
            })
        })


    }
}

export const deletePermission = (id, value) => {
    return async (dispatch) => {
        const [role, key, roleId] = id.split('_')
        const [module, controller, action] = key.split('-')
        const filter = {
            limit: 1,
            where: {
                ['rolesId']: { eq: roleId },
                ['moduleName']: { eq: module },
                ['controllerName']: { eq: controller },
                ['actionName']: { eq: action }
            }
        }
        await api.permisosControllerFind(JSON.stringify(filter)).then(async response => {
            const [permission] = response.data
            if (permission) {
                const { id } = permission
                await api.permisosControllerDeleteById(Number(id)).then(res => {
                    dispatch({
                        type: `${prefix}/DELETE`,
                        data: id
                    })
                })
            }
            // dispatch({
            //     type: `${prefix}/CREATE_PERMISSION`,
            //     data: newPermission
            // })
        })

    }
}

// ** Get all Data
export const getAllData = () => {
    return async (dispatch) => {
        await api.permisosControllerFind().then(response => {
            dispatch({
                type: `${prefix}/GET_ALL_DATA`,
                data: response.data
            })
        })
    }
}

// ** Get data on page or row change
export const getData = (params) => {

    return async (dispatch) => {
        const { page, perPage, q, sortBy } = params

        const filter = {
            offset: (page - 1) * perPage,
            limit: perPage,
            skip: ((page - 1) * perPage),
            order: sortBy || "moduleName ASC",
            where: {
                ['moduleName']: { like: `%${q}%` },
                ['controllerName']: { like: `%${q}%` },
                ['actionName']: { like: `%${q}%` }
            }
        }

        await api.permisosControllerFind(JSON.stringify(filter)).then(response => {
            dispatch({
                type: `${prefix}/GET_DATA`,
                data: response.data,
                // totalPages: response.data?.length || 0,
                params
            })
        })

        await api.permisosControllerCount(JSON.stringify(filter.where)).then(response => {
            dispatch({
                type: `${prefix}/GET_DATA_COUNT`,
                totalPages: response.data.count || 0
            })

        })
    }
}

// ** Get Role Permission
export const getRolePermission = (id = 0) => {
    return async (dispatch) => {
        await api.permisosControllerFindById(id).then(response => {
            dispatch({
                type: `${prefix}/GET`,
                selectedRole: response.data
            })
        })
            .catch(err => console.error(err))
    }
}

// ** Add new role
export const addRole = (permission) => {
    return (dispatch, getState) => {
        api.permisosControllerCreate(permission).then(response => {
            dispatch({
                type: `${prefix}/ADD`,
                permission
            })
        })
            .then(() => {
                dispatch(getData(getState().roles.params))
                dispatch(getAllData())
            })
            .catch(err => console.error(err))

    }
}

// ** Delete role Permission
export const deleteRolePermission = (id = 0) => {
    return (dispatch, getState) => {

        api.permisosControllerDeleteById(id)
            .then(response => {
                dispatch({
                    type: `${prefix}/DELETE`
                })
            })
            .then(() => {
                dispatch(getData(getState().roles.params))
                dispatch(getAllData())
            })

    }
}
