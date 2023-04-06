import { GET_ROL,
  GET_ROLES,
  GET_ROLES_COUNT,
  ADD_ROL,
  DELETE_ROL,
  UPDATE_ROL } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedRol: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  empresas: [],
  selectedEmpresaId: 1,
  params: {},
  processing: false
}

const prefix = 'roles'

const roles = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
    case GET_ROLES:
      return {
        ...state,
        data: action.roles,
        total: action.total || 0,
        processing: false
      }
    case GET_ROL:
      return { ...state, selectedRol: action.selectedRol }
    case ADD_ROL:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_ROL:
      return { ...state, data: [...state.data].filter(rol => rol.id !== action.data)}
    case GET_ROLES_COUNT:
      return { ...state, total: action.total }
    case UPDATE_ROL:
      return { ...state, data: state.data.map(rol => (rol.id === action.data.id ? action.data : rol)) }
    default:
      return { ...state }
  }
}
export default roles
