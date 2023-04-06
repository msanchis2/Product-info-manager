import { MarcaControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'marcas'

export const GET_MARCA = `${prefix}/GET_DATA_marca`
export const GET_MARCAS = `${prefix}/GET_DATA`
export const GET_MARCAS_ALL = `${prefix}/GET_DATA_ALL`
export const GET_MARCAS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_MARCA = `${prefix}/ADD`
export const DELETE_MARCA = `${prefix}/DELETE`
export const UPDATE_MARCA = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apimarcas = new MarcaControllerApi(settings)

// ** Get all Data

export const getData = (empresaId, page = 1, perPage = 10, q = "") => {
  return async (dispatch, getState) => {
    try {
      const filter =  {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: "nombre ASC",
        where: {
          ['empresaId']: {eq: `${empresaId}`},
          ['or'] : [
            {['nombre']: {like: `%${q}%`, options: 'i'}},
            {['codigo']: {like: `%${q}%`, options: 'i'}}
          ]
        }
      }
      const {data: datamarcasCount} = await apimarcas.marcaControllerCount() 
      const {data: datamarcas} = await apimarcas.marcaControllerFind(JSON.stringify(filter)) 
      dispatch({
        type: GET_MARCAS,
        marcas: datamarcas,
        total: datamarcasCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addmarca = (marca) => {
  return async (dispatch) => {
    try {
      const {data} = await apimarcas.marcaControllerCreate(marca)
      displaySuccessMsg('marca creada')
      dispatch({
         type: ADD_MARCA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updatemarca = (id, marca) => {
  return async (dispatch) => {
    try {
      const {data} = await apimarcas.marcaControllerUpdateById(id, marca)
      displaySuccessMsg('marca actualizada')
      dispatch({
         type: UPDATE_MARCA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deletemarca = (marcaId) => {
  return async (dispatch) => {
    try {
      const {data} = await apimarcas.marcaControllerDeleteById(marcaId)
      displaySuccessMsg('Marca borrada')
       dispatch({
         type: DELETE_MARCA,
         data: marcaId
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getmarca = (marca) => {
  return async (dispatch) => {
    try {
      const {data: datamarca} = await apimarcas.marcaControllerFindById(marca)
      dispatch({
        type: GET_MARCA,
        selectedmarca: datamarca
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initmarca = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_MARCA,
      selectedCompany: null
    })
  }
}
