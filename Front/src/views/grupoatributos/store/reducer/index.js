import { GET_GRUPOATRIBUTO,
  GET_GRUPOATRIBUTOS,
  GET_GRUPOATRIBUTOS_COUNT,
  ADD_GRUPOATRIBUTO,
  DELETE_GRUPOATRIBUTO,
  UPDATE_GRUPOATRIBUTO } from "../action"

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

const prefix = 'grupoatributos'

const grupoatributos = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
    case GET_GRUPOATRIBUTOS:
      return {
        ...state,
        data: action.gruposAtributos,
        total: action.total || 0,
        processing: false
      }
    case GET_GRUPOATRIBUTO:
      return { ...state, selectedGrupoatributo: action.selectedGrupoatributo }
    case ADD_GRUPOATRIBUTO:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_GRUPOATRIBUTO:
      return { ...state, data: [...state.data].filter(grupo => grupo.id !== action.data)}
    case GET_GRUPOATRIBUTOS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_GRUPOATRIBUTO:
      return { ...state, data: state.data.map(grupo => (grupo.id === action.data.id ? action.data : grupo)) }
    default:
      return { ...state }
  }
}
export default grupoatributos
