import { SituacionesControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'Situaciones'

export const GET_SITUACION = `${prefix}/GET_DATA_Situacion`
export const GET_SITUACIONES = `${prefix}/GET_DATA`
export const GET_SITUACIONES_ALL = `${prefix}/GET_DATA_ALL`
export const GET_SITUACIONES_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_SITUACION = `${prefix}/ADD`
export const DELETE_SITUACION = `${prefix}/DELETE`
export const UPDATE_SITUACION = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiSituaciones = new SituacionesControllerApi(settings)

// ** Get all Data

export const getData = (page = 1, perPage = 10, q = "") => {
  return async (dispatch, getState) => {
    try {
      const filter =  {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: "nombre ASC",
        where: {['nombre']: {like: `%${q}%`}}
      }
      const {data: dataSituaciones} = await apiSituaciones.situacionesControllerFind(JSON.stringify(filter))
      const {data: dataSituacionesCount} = await apiSituaciones.situacionesControllerCount()
      dispatch({
        type: GET_SITUACIONES,
        situaciones: dataSituaciones,
        total: dataSituacionesCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addSituacion = (Situacion) => {
  return async (dispatch) => {
    try {
      const {data} = await apiSituaciones.situacionesControllerCreate(Situacion)
      displaySuccessMsg('Situacion', 'creada')
      dispatch({
         type: ADD_SITUACION,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateSituacion = (id, Situacion) => {
  return async (dispatch) => {
    try {
      const {data} = await apiSituaciones.situacionesControllerUpdateById(id, Situacion)
      displaySuccessMsg('Situacion', 'actualizada')
      dispatch({
         type: UPDATE_SITUACION,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteSituacion = (SituacionId) => {
  return async (dispatch) => {
    try {
      const {data} = await apiSituaciones.situacionesControllerDeleteById(SituacionId)
      displaySuccessMsg('Situacion', 'borrada')
       dispatch({
         type: DELETE_SITUACION,
         data: SituacionId
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSituacion = (Situacion) => {
  return async (dispatch) => {
    try {
      const {data: dataSituacion} = await apiSituaciones.situacionesControllerFindById(Situacion)
      dispatch({
        type: GET_SITUACION,
        selectedSituacion: dataSituacion
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initSituacion = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SITUACION,
      selectedCompany: null
    })
  }
}
