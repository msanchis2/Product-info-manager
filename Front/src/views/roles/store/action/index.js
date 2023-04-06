import { RolesControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'roles'

export const GET_ROL = `${prefix}/GET_DATA_ATRIBUTO`
export const GET_ROLES = `${prefix}/GET_DATA`
export const GET_ROLES_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_ROL = `${prefix}/ADD`
export const DELETE_ROL = `${prefix}/DELETE`
export const UPDATE_ROL = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiRoles = new RolesControllerApi(settings)

// ** Get all Data
export const getData = params => {
  return async (dispatch, getState) => {
    try {

      const {page = 1, perPage = 10, sortBy = "", q = ""} = params
      const empresaId = getState().layout.selectedEmpresaId

      const filter =  {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {
          ['empresaId']: {eq: `${empresaId}`},
          ['or'] : [
            {['nombre']: {like: `%${q}%`, options: 'i'}},
            {['codigo']: {like: `%${q}%`, options: 'i'}}
          ]
        }
      }
      
      const {data: dataRoles} = await apiRoles.rolesControllerFind(JSON.stringify(filter))
      const {data: dataRolesCount} = await apiRoles.rolesControllerCount(JSON.stringify(filter.where))
      dispatch({
        type: GET_ROLES,
        roles: dataRoles,
        total: dataRolesCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addRol = (rol) => {
  return async (dispatch) => {
    try {
      const {data} = await apiRoles.rolesControllerCreate(rol)
      displaySuccessMsg('Rol', 'creado')
      dispatch({
        type: ADD_ROL,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateRol = (id, rol) => {
  return async (dispatch) => {
    try {
      const {data} = await apiRoles.rolesControllerUpdateById(id, rol)
      displaySuccessMsg('Rol', 'actualizado')
      dispatch({
        type: UPDATE_ROL,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteRol = (rolId) => {
  return async (dispatch) => {
    try {
      await apiRoles.rolesControllerDeleteById(rolId)
      displaySuccessMsg('Rol', 'eliminado')
      dispatch({
        type: DELETE_ROL,
        data: rolId
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getRol = (rol) => {
  return async (dispatch) => {
    try {
      const {data: dataRol} = await apiRoles.rolesControllerFindById(rol)
      dispatch({
        type: GET_ROL,
        selectedRol: dataRol
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initRol = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ROL,
      selectedRol: null
    })
  }
}
