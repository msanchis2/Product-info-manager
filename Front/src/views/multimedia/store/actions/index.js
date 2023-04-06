import { MultimediaControllerApi, ProductoMultimediaControllerApi, settings } from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'multimedia'

export const GET_MULTIMEDIA = `${prefix}/GET_MULTIMEDIA`
export const GET_MULTIMEDIAS = `${prefix}/GET_DATA`
export const GET_MULTIMEDIA_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_MULTIMEDIA = `${prefix}/ADD`
export const DELETE_MULTIMEDIA = `${prefix}/DELETE`
export const UPDATE_MULTIMEDIA = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiMultimedia = new MultimediaControllerApi(settings)
const apiMultimediaProducto = new ProductoMultimediaControllerApi(settings)

// ** Get all Data
export const getData = params => {
  return async (dispatch, getState) => {
    try {
      const { page = 1, perPage = 10, sortBy = "", q = "", search = "", grupoMultimedia, searchInputs } = params
      const empresaId = getState().layout.selectedEmpresaId

      const filter = {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "clave ASC",
        where: {
          ['empresaId']: { eq: `${empresaId}` },
          ['or']: [
            { ['clave']: { like: `%${q}%`, options: 'i' } },
            { ['tipo']: { like: `%${q}%`, options: 'i' } }
          ]
        }
      }
      if (grupoMultimedia) {
        filter.where = {
          ['empresaId']: { eq: `${empresaId}` },
          ['tipo']: { eq: `${grupoMultimedia}` },
          ['or']: [
            { ['tipo']: { like: `%${search}%`, options: 'i' } },
            { ['codigo']: { like: `%${search}%`, options: 'i' } }
          ]
        }
      }
      if (searchInputs) {
        filter.where = {
          ['empresaId']: { eq: `${empresaId}` },
          ['clave']: { like: `%${searchInputs}%`, options: 'i' }
        }
      }
      const filterProducto = {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {

        }
      }

      const { data: dataMultimedia } = await apiMultimedia.multimediaControllerFind(JSON.stringify(filter))
      const { data: dataMultimediaCount } = await apiMultimedia.multimediaControllerCount(JSON.stringify(filter.where))
      // Recojo todos
      const { data: dataProductoMultimedia } = await apiMultimediaProducto.productoMultimediaControllerFind(JSON.stringify(filterProducto.where))
      dispatch({
        type: GET_MULTIMEDIA,
        multimedia: dataMultimedia,
        todaMultimedia: dataProductoMultimedia,
        total: dataMultimediaCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addMultimedia = (multimedia) => {
  return async (dispatch, getState) => {
    try {
      const idEmpresa = getState().layout.selectedEmpresaId
      const multimediaRellena = {
        clave: multimedia.clave,
        tipo: multimedia.tipo,
        categoria: multimedia.categoria,
        defectosn: multimedia.defectosn,
        empresaId: idEmpresa
      }
      const { data } = await apiMultimedia.multimediaControllerCreate(multimediaRellena)
      displaySuccessMsg('Multimedia creado')
      dispatch({
        type: ADD_MULTIMEDIA,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateMultimedia = (id, multimedia) => {
  return async (dispatch) => {
    try {
      const { data } = await apiMultimedia.multimediaControllerUpdateById(id, multimedia)
      displaySuccessMsg('Multimedia actualizado')
      dispatch({
        type: UPDATE_MULTIMEDIA,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateProductoMultimedia = (id, multimedia) => {
  return async (dispatch) => {
    try {
      const { data } = await apiMultimediaProducto.productoMultimediaControllerUpdateById(id, multimedia)
      dispatch({
        type: UPDATE_MULTIMEDIA,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteMultimedia = (multimediaId) => {
  return async (dispatch) => {
    try {
      await apiMultimedia.multimediaControllerDeleteById(multimediaId)
      displaySuccessMsg('Multimedia eliminado')
      dispatch({
        type: DELETE_MULTIMEDIA,
        data: multimediaId
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getMultimedia = (multimedia) => {
  return async (dispatch) => {
    try {
      const { data: dataMultimedia } = await apiMultimedia.multimediaControllerFindById(multimedia)
      dispatch({
        type: GET_MULTIMEDIAS,
        selectedMultimedia: dataMultimedia
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initMultimedia = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_MULTIMEDIA,
      selectedCompany: null
    })
  }
}
