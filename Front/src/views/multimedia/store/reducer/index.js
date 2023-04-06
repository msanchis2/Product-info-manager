import {
  GET_MULTIMEDIA,
  ADD_MULTIMEDIA,
  DELETE_MULTIMEDIA,
  GET_MULTIMEDIAS,
  GET_MULTIMEDIA_COUNT,
  UPDATE_MULTIMEDIA
} from "../actions"

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

const prefix = 'multimedia'

const multimedia = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
    case GET_MULTIMEDIA:
      return {
        ...state,
        data: action.multimedia,
        todaMultimedia: action.todaMultimedia,
        total: action.total || 0,
        processing: false
      }
    case GET_MULTIMEDIAS:
      return { ...state, selectedMultimedia: action.selectedMultimedia }
    case ADD_MULTIMEDIA:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_MULTIMEDIA:
      return { ...state, data: [...state.data].filter(grupo => grupo.id !== action.data) }
    case GET_MULTIMEDIA_COUNT:
      return { ...state, total: action.total }
    case UPDATE_MULTIMEDIA:
      return { ...state, data: state.data.map(grupo => (grupo.id === action.data.id ? action.data : grupo)) }
    default:
      return { ...state }
  }
}
export default multimedia
