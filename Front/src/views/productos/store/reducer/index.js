import { CREATE_PRODUCTO, UPDATE_ATRIBUTO, GET_DATA, GET_PRODUCT_DATA, ADD_PRODUCTO_MULTIMEDIA, INIT_DATA_NECESARIA, REFRESH_SELECTED_EMPRESA, UPDATE_PRODUCTO_DATA, REFRESH_MULTIMEDIA } from "../actions"

const initialState = {
  data: [],
  allData: [],
  selectedProducto: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  empresas: [],
  situaciones: [],
  marcas: [],
  multimedias: [],
  general: [],
  params: {},
  processing: false
}

const productosReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA_NECESARIA:
      return {
        ...state,
        gruposAtributos: action.gruposAtributos,
        atributos: action.atributos,
        categorias: action.categorias,
        empresas: action.empresas,
        situaciones: action.situaciones,
        marcas: action.marcas,
        multimedias: action.multimedias
      }
    case ADD_PRODUCTO_MULTIMEDIA:
      return {...state }
    case GET_DATA:
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        params: action.params,
        total: action.total || 0,
        atributos: action.atributos,
        categorias: action.categorias,
        general: action.general
      }
    
    case GET_PRODUCT_DATA:
      return {
        ...state,
        selectedProducto: action.selectedProducto
      }
    case REFRESH_SELECTED_EMPRESA:
      return {
        ...state,
        gruposAtributos: action.gruposAtributos,
        categorias: action.categorias,
        usuarios: action.usuarios
      }
      case REFRESH_MULTIMEDIA:
      return {
        ...state,
        multimedia: action.multimediaProduct
        
      }
    case CREATE_PRODUCTO:
      return { ...state, newId: action.id }
    case UPDATE_ATRIBUTO:
      return { ...state }
    case UPDATE_PRODUCTO_DATA:
      return { ...state }
    default:
      return { ...state }
  }
}
export default productosReducer
