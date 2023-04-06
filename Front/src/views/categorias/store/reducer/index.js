import { GET_CATEGORIA,
  GET_CATEGORIAS,
  GET_CATEGORIAS_ALL,
  GET_CATEGORIAS_COUNT,
  ADD_CATEGORIA,
  DELETE_CATEGORIA,
  UPDATE_CATEGORIA } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedProducto: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  empresas: [],
  selectedEmpresaId: 1,
  params: {},
  processing: false
}

const prefix = 'categorias'

const categorias = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
    case GET_CATEGORIAS:
     return {
        ...state,
        data: action.categorias,
        total: action.total || 0,
        processing: false
     }
     case GET_CATEGORIAS_ALL:
     return {
        ...state,
        categorias: action.categorias,
        processing: false
     }
     case GET_CATEGORIA:
       return { ...state, selectedCategoria: action.selectedCategoria }
    case ADD_CATEGORIA:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_CATEGORIA:
      return { ...state, data: [...state.data].filter(categoria => categoria.id !== action.data)}
    case GET_CATEGORIAS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_CATEGORIA:
      return { ...state, data: state.data.map(categoria => (categoria.id === action.data.id ? action.data : categoria)) }
    default:
      return { ...state }
  }
}
export default categorias
