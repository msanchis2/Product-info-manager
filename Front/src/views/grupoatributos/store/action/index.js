import { GruposAtributosControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'grupoatributos'

export const GET_GRUPOATRIBUTO = `${prefix}/GET_DATA_ATRIBUTO`
export const GET_GRUPOATRIBUTOS = `${prefix}/GET_DATA`
export const GET_GRUPOATRIBUTOS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_GRUPOATRIBUTO = `${prefix}/ADD`
export const DELETE_GRUPOATRIBUTO = `${prefix}/DELETE`
export const UPDATE_GRUPOATRIBUTO = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiGruposAtributos = new GruposAtributosControllerApi(settings)

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

      const {data: dataGruposAtributos} = await apiGruposAtributos.gruposAtributosControllerFind(JSON.stringify(filter))
      const {data: dataGruposAtributosCount} = await apiGruposAtributos.gruposAtributosControllerCount(JSON.stringify(filter.where))

      dispatch({
        type: GET_GRUPOATRIBUTOS,
        gruposAtributos: dataGruposAtributos,
        total: dataGruposAtributosCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addGrupoatributo = (grupoatributo) => {
  return async (dispatch) => {
    try {
      const {data} = await apiGruposAtributos.gruposAtributosControllerCreate(grupoatributo)
      displaySuccessMsg('Grupo atributo creado')
      dispatch({
        type: ADD_GRUPOATRIBUTO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateGrupoatributo = (id, grupoatributo) => {
  return async (dispatch) => {
    try {
      const {data} = await apiGruposAtributos.gruposAtributosControllerUpdateById(id, grupoatributo)
      displaySuccessMsg('Grupo atributo actualizado')
      dispatch({
        type: UPDATE_GRUPOATRIBUTO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteGrupoatributo = (grupoatributoId) => {
  return async (dispatch) => {
    try {
      await apiGruposAtributos.gruposAtributosControllerDeleteById(grupoatributoId)
      displaySuccessMsg('Grupo atributo eliminado')
      dispatch({
        type: DELETE_GRUPOATRIBUTO,
        data: grupoatributoId
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getGrupoatributo = (grupoatributo) => {
  return async (dispatch) => {
    try {
      const {data: dataGruposAtributo} = await apiGruposAtributos.gruposAtributosControllerFindById(grupoatributo)
      dispatch({
        type: GET_GRUPOATRIBUTO,
        selectedGrupoatributo: dataGruposAtributo
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initGrupoatributo = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_GRUPOATRIBUTO,
      selectedCompany: null
    })
  }
}
