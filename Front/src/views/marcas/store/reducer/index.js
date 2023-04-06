import { 
  GET_MARCA,
  GET_MARCAS,
  GET_MARCAS_ALL,
  GET_MARCAS_COUNT,
  ADD_MARCA,
  DELETE_MARCA,
  UPDATE_MARCA } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedProducto: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  marcas: [],
  selectedmarcaId: 1,
  params: {},
  processing: false
}

const prefix = 'marcas'

const marcas = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
      case GET_MARCAS:
      return {
        ...state,
        data: action.marcas,
        total: action.total || 0,
        processing: false
      }
      case GET_MARCAS_ALL:
      return {
          ...state,
          marcas: action.marcas,
          processing: false
      }
     case GET_MARCA:
       return { ...state, selectedmarca: action.selectedmarca }
    case ADD_MARCA:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_MARCA:
      return { ...state, data: [...state.data].filter(marca => marca.id !== action.data)}
    case GET_MARCAS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_MARCA:
      return { ...state, data: state.data.map(marca => (marca.id === action.data.id ? action.data : marca)) }
    default:
      return { ...state }
  }
}
export default marcas
