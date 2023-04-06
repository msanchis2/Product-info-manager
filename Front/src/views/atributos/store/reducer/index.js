import { GET_ATRIBUTO,
  GET_ATRIBUTOS,
  GET_ATRIBUTOS_COUNT,
  ADD_ATRIBUTO,
  DELETE_ATRIBUTO,
  UPDATE_ATRIBUTO,
  INIT_DATA_NECESARIA } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedAtributo: {},
  gruposAtributos: [],
  atributos: [],
  categoriasData: [],
  params: {},
  productos: [],
  processing: false
}

const atributos = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA_NECESARIA:
      return { 
        ...state, 
        gruposAtributos: action.gruposAtributos,
        productos: action.productos,
        categoriasData: action.categoriasData,
        atributos: action.atributos
      }
    case GET_ATRIBUTOS:
      return {
        ...state,
        data: action.atributos,
        total: action.total || 0,
        processing: false
      }
    case GET_ATRIBUTO:
      return { ...state, selectedAtributo: action.selectedAtributo }
    case ADD_ATRIBUTO:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_ATRIBUTO:
      return { ...state, data: [...state.data].filter(atributo => atributo.id !== action.data)}
    case GET_ATRIBUTOS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_ATRIBUTO:
      return { ...state, data: state.data.map(atributo => (atributo.id === action.data.id ? action.data : atributo)) }
    default:
      return { ...state }
  }
}
export default atributos
