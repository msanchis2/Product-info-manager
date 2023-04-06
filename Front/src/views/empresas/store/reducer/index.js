import { GET_EMPRESA,
  GET_EMPRESAS,
  GET_EMPRESAS_ALL,
  GET_EMPRESAS_COUNT,
  ADD_EMPRESA,
  DELETE_EMPRESA,
  UPDATE_EMPRESA } from "../action"

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

const prefix = 'empresas'

const empresas = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
      case GET_EMPRESAS:
      return {
        ...state,
        data: action.empresas,
        total: action.total || 0,
        processing: false
      }
      case GET_EMPRESAS_ALL:
      return {
          ...state,
          empresas: action.empresas,
          processing: false
      }
     case GET_EMPRESA:
       return { ...state, selectedEmpresa: action.selectedEmpresa }
    case ADD_EMPRESA:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_EMPRESA:
      return { ...state, data: [...state.data].filter(empresa => empresa.id !== action.data)}
    case GET_EMPRESAS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_EMPRESA:
      return { ...state, data: state.data.map(empresa => (empresa.id === action.data.id ? action.data : empresa)) }
    default:
      return { ...state }
  }
}
export default empresas
