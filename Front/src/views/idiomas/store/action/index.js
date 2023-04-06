import { IdiomasControllerApi, settings } from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'idiomas'

export const GET_IDIOMA = `${prefix}/GET_DATA_IDIOMA`
export const GET_IDIOMAS = `${prefix}/GET_DATA`
export const GET_IDIOMAS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_IDIOMA = `${prefix}/ADD`
export const DELETE_IDIOMA = `${prefix}/DELETE`
export const UPDATE_IDIOMA = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`
export const GET_IDIOMA_PIM = `${prefix}/GET_IDIOMA_PIM`

const apiIdiomas = new IdiomasControllerApi(settings)

// ** Get all Data
export const getData = params => {
  return async (dispatch, getState) => {
    try {
      const { page = 1, perPage = 10, sortBy = "", q = "" } = params
      const empresaId = getState().layout.selectedEmpresaId

      const filter = {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {
          ['empresaId']: { eq: `${empresaId}` },
          ['or']: [
            { ['nombre']: { like: `%${q}%`, options: 'i' } },
            { ['codigo']: { like: `%${q}%`, options: 'i' } }
          ]
        }
      }
      const { data: dataIdiomas } = await apiIdiomas.idiomasControllerFind(JSON.stringify(filter))
      const { data: dataIdiomasCount } = await apiIdiomas.idiomasControllerCount(JSON.stringify(filter.where))
      dispatch({
        type: GET_IDIOMAS,
        usuarios: dataIdiomas,
        total: dataIdiomasCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addIdioma = (usuario) => {
  return async (dispatch) => {
    try {
      const { data } = await apiIdiomas.idiomasControllerCreate(usuario)
      displaySuccessMsg('Idioma creado')
      dispatch({
        type: ADD_IDIOMA,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateIdioma = (id, usuario) => {
  return async (dispatch) => {
    try {
      const { data } = await apiIdiomas.idiomasControllerUpdateById(id, usuario)
      displaySuccessMsg('Idioma actualizado')
      dispatch({
        type: UPDATE_IDIOMA,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteIdioma = (usuarioId) => {
  return async (dispatch) => {
    try {
      const { data } = await apiIdiomas.idiomasControllerDeleteById(usuarioId)
      displaySuccessMsg('Idioma borrado')
      dispatch({
        type: DELETE_IDIOMA,
        data: usuarioId
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getIdioma = (usuario) => {
  return async (dispatch) => {
    try {
      const { data: dataIdioma } = await apiIdiomas.idiomasControllerFindById(usuario)
      dispatch({
        type: GET_IDIOMA,
        selectedIdioma: dataIdioma
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initIdioma = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_IDIOMA,
      selectedCompany: null
    })
  }
}
// Almaceno el idioma seleccionado en el store
export const refreshByIdiomaSeleccionado = (idiomaNombre) => {
  return async (dispatch) => {
    try {
      const filter = {
        where: {
          ['nombre']: { eq: `${idiomaNombre}` }
        }
      }
      const { data: dataIdioma } = await apiIdiomas.idiomasControllerFind(JSON.stringify(filter))
      dispatch({
        type: GET_IDIOMA_PIM,
        selectedIdiomaPIM: dataIdioma
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}
