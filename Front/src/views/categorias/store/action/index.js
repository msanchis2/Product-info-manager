import { CategoriasControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'categorias'

export const GET_CATEGORIA = `${prefix}/GET_DATA_CATEGORIA`
export const GET_CATEGORIAS = `${prefix}/GET_DATA`
export const GET_CATEGORIAS_ALL = `${prefix}/GET_DATA_ALL`
export const GET_CATEGORIAS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_CATEGORIA = `${prefix}/ADD`
export const DELETE_CATEGORIA = `${prefix}/DELETE`
export const UPDATE_CATEGORIA = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiCategorias = new CategoriasControllerApi(settings)

// ** Get all Data
export const getDataAll = params => {
  return async (dispatch, getState) => {
    try {

      const empresaId = getState().layout.selectedEmpresaId
      
      const filter =  {
        order: "nombre ASC",
        where: {['empresaId']: {eq: `${empresaId}`}
        }
      }

      const {data: dataCategorias} = await apiCategorias.categoriasControllerFind(JSON.stringify(filter))

      dispatch({
        type: GET_CATEGORIAS_ALL,
        categorias: dataCategorias
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getData = params => {
  return async (dispatch, getState) => {
    try {

      const {page = 1, perPage = 10, sortBy = "", q = "", search = "", grupoCategorias} = params
      const empresaId = getState().layout.selectedEmpresaId
      
      const filter =  {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {
          ['empresaId']: {eq: `${empresaId}`},
          ['or'] : [
            {['nombre']: {like: `%${search}%`, options: 'i'}},
            {['codigo']: {like: `%${search}%`, options: 'i'}}
          ]
        }
      }
      //
      //Si existe el padre modifico el filtro para que añada esa condición
      //
      if (grupoCategorias) {
        filter.where = {
          ['empresaId']: {eq: `${empresaId}`},
          ['padre']: {eq: `${grupoCategorias}`},
          ['or'] : [
            {['nombre']: {like: `%${search}%`, options: 'i'}},
            {['codigo']: {like: `%${search}%`, options: 'i'}}
          ]
        }
      }

      const {data: dataCategorias} = await apiCategorias.categoriasControllerFind(JSON.stringify(filter))
      const {data: dataCategoriasCount} = await apiCategorias.categoriasControllerCount(JSON.stringify(filter.where))

      dispatch({
        type: GET_CATEGORIAS,
        categorias: dataCategorias,
        total: dataCategoriasCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addCategoria = (categoria) => {
  return async (dispatch) => {
    try {
      const {data} = await apiCategorias.categoriasControllerCreate(categoria)
      displaySuccessMsg('Categoría Creada')
      dispatch({
         type: ADD_CATEGORIA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateCategoria = (id, categoria) => {
  return async (dispatch) => {
    try {
      const {data} = await apiCategorias.categoriasControllerUpdateById(id, categoria)
      displaySuccessMsg('Categoría Actualizada')
      dispatch({
         type: UPDATE_CATEGORIA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteCategoria = (categoriaId) => {
  return async (dispatch) => {
    try {
      const {data} = await apiCategorias.categoriasControllerDeleteById(categoriaId)
      displaySuccessMsg('Categoría Borrada')
       dispatch({
         type: DELETE_CATEGORIA,
         data: categoriaId
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getCategoria = (categoria) => {
  return async (dispatch) => {
    try {
      const {data: dataCategoria} = await apiCategorias.categoriasControllerFindById(categoria)
      dispatch({
        type: GET_CATEGORIA,
        selectedCategoria: dataCategoria
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initCategoria = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_CATEGORIA,
      selectedCompany: null
    })
  }
}
