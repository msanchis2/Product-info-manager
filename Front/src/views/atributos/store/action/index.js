/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AtributosControllerApi, GruposAtributosControllerApi, settings, CategoriasControllerApi, ProductoAtributosControllerApi, ProductosControllerApi} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'                   
import { Settings } from 'react-feather'

const apiAtributos = new AtributosControllerApi(settings)
const apiGruposAtributos = new GruposAtributosControllerApi(settings)
const apiCat = new CategoriasControllerApi(settings)
const apiProdAtt = new ProductoAtributosControllerApi(settings)
const apiProd = new ProductosControllerApi(settings)

const prefix = 'atributos'

export const GET_ATRIBUTO = `${prefix}/GET_DATA_ATRIBUTO`
export const GET_CATEGORIAS = `${prefix}/GET_CATEGORIAS`
export const GET_ATRIBUTOS = `${prefix}/GET_DATA`
export const GET_ATRIBUTOS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_ATRIBUTO = `${prefix}/ADD`
export const DEL_ATRIBUTO = `${prefix}/DEL`
export const DELETE_ATRIBUTO = `${prefix}/DELETE`
export const UPDATE_ATRIBUTO = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

export const getDatosNecesarios = () => {
  return async (dispatch, getState) => {
    try {
      const empresaId = getState().layout.selectedEmpresaId
      const filter = {where: {['empresaId']: {eq: `${empresaId}`}}}
      const {data: dataGruposAtributos} = await apiGruposAtributos.gruposAtributosControllerFind(JSON.stringify(filter))
      const {data: dataProductos} = await apiProd.productosControllerFind(JSON.stringify(filter))
      const {data: dataCategorias} = await apiCat.categoriasControllerFind()
      const {data: allAtributos} = await apiAtributos.atributosControllerFind()
      const dataAtributos = []
      let idGrupo, grupo
      allAtributos.forEach(el => {
        idGrupo = el.grupoAtributosId
        grupo = dataGruposAtributos.find(item => item.id == idGrupo)
        if (grupo != undefined) { dataAtributos.push(el) }
      })
      dispatch({
        type: INIT_DATA_NECESARIA,
        gruposAtributos: dataGruposAtributos,
        categoriasData: dataCategorias,
        productos: dataProductos,
        atributos: dataAtributos
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}
// ** Get all Data
export const getData = params => {
  return async (dispatch, getState) => {
    try {
      const {page = 1, perPage = 10, sortBy = "", q = "", empresaId, grupoAtributos} = params
      const whereFilter = grupoAtributos == null ? {} : {
        ['grupoAtributosId']: {eq: `${grupoAtributos}`},
        ['or'] : [
          {['nombre']: {like: `%${q}%`, options: 'i'}},
          {['codigo']: {like: `%${q}%`, options: 'i'}}
        ]
      }
      const filter =  {
        // offset: (page - 1) * perPage,
        // limit: perPage,
        // skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: whereFilter
      }

      const {data: allAtributos} = await apiAtributos.atributosControllerFind(JSON.stringify(filter))
      const {data: dataGruposAtributos} = await apiGruposAtributos.gruposAtributosControllerFind(JSON.stringify({where: {['empresaId']: {eq: `${empresaId}`}}}))
      const {data: dataCategorias} = await apiCat.categoriasControllerFind()

      const dataAtributos = []
      let idGrupo, grupo
      allAtributos.forEach(el => {
        idGrupo = el.grupoAtributosId
        grupo = dataGruposAtributos.find(item => item.id == idGrupo)
        if (grupo != undefined) { dataAtributos.push(el) }
      })
      const inicio = (page - 1) * perPage
      const fin = inicio + perPage

      dispatch({
        type: GET_ATRIBUTOS,
        atributos: dataAtributos.slice(inicio, fin),
        categoriasData: dataCategorias,
        total: dataAtributos.length || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getProductosCategorias = (cat) => {
  return async (dispatch, getState) => {
    try {
      const filter = {where: {['categorias']: {eq: cat}}}
      const {data: dataGruposAtributos} = await apiProd.productoControllerFind(JSON.stringify(filter))
      dispatch({
        type: INIT_DATA_NECESARIA,
        gruposAtributos: dataGruposAtributos
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addAtributo = (atributo) => {
  return async (dispatch) => {
    try {
      const {data} = await apiAtributos.atributosControllerCreate(atributo)
      displaySuccessMsg('Atributo creado')
      dispatch({
        type: ADD_ATRIBUTO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addAtributoProducto = (atributo) => {
  return async (dispatch) => {
    try {
      const {data} = await apiProdAtt.productoAtributosControllerCreate(atributo)
      dispatch({
        type: ADD_ATRIBUTO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAtributosProducto = (id) => {
  return async () => {
    try {
      const filter = {where: {['atributoId']: {eq: id}}}
      return await apiProdAtt.productoAtributosControllerFind(JSON.stringify(filter))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const delAtributoProducto = (id) => {
  return async (dispatch) => {
    try {
      await apiProdAtt.productoAtributosControllerDeleteById(id)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateAtributo = (id, atributo) => {
  return async (dispatch) => {
    try {
      const {data} = await apiAtributos.atributosControllerUpdateById(id, atributo)
      displaySuccessMsg('Atributo actualizado')
      dispatch({
        type: UPDATE_ATRIBUTO,
        data
      })
      return data
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteAtributo = (id) => {
  return async (dispatch) => {
    try {
      await apiAtributos.atributosControllerDeleteById(id)
      displaySuccessMsg('Atributo eliminado')
      dispatch({
        type: DELETE_ATRIBUTO,
        data: id
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAtributo = (atributo) => {
  return async (dispatch) => {
    try {
      const {data: dataAtributo} = await apiAtributos.atributosControllerFindById(atributo)
      dispatch({
        type: GET_ATRIBUTO,
        selectedAtributo: dataAtributo
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getCategorias = () => {
  return async (dispatch) => {
    try {
      const {data: dataAtributo} = await apiCat.categoriasControllerFind()
      dispatch({
        type: GET_CATEGORIAS,
        selectedAtributo: dataAtributo
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}
