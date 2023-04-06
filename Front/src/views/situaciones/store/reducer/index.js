import { 
  GET_SITUACION,
  GET_SITUACIONES,
  GET_SITUACIONES_ALL,
  GET_SITUACIONES_COUNT,
  ADD_SITUACION,
  DELETE_SITUACION,
  UPDATE_SITUACION } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedProducto: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  situaciones: [],
  selectedSituacionId: 1,
  params: {},
  processing: false
}

const prefix = 'Situaciones'

const situaciones = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
      case GET_SITUACIONES:
      return {
        ...state,
        data: action.situaciones,
        total: action.total || 0,
        processing: false
      }
      case GET_SITUACIONES_ALL:
      return {
          ...state,
          situaciones: action.situaciones,
          processing: false
      }
     case GET_SITUACION:
       return { ...state, selectedSituacion: action.selectedSituacion }
    case ADD_SITUACION:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_SITUACION:
      return { ...state, data: [...state.data].filter(Situacion => Situacion.id !== action.data)}
    case GET_SITUACIONES_COUNT:
      return { ...state, total: action.total }
    case UPDATE_SITUACION:
      return { ...state, data: state.data.map(Situacion => (Situacion.id === action.data.id ? action.data : Situacion)) }
    default:
      return { ...state }
  }
}
export default situaciones
