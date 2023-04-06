import { GET_USUARIO,
  GET_USUARIOS,
  GET_USUARIOS_COUNT,
  ADD_USUARIO,
  DELETE_USUARIO,
  UPDATE_USUARIO } from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedProducto: {},
  gruposAtributos: [],
  atributos: [],
  categorias: [],
  usuarios: [],
  empresas: [],
  selectedEmpresaId: 1,
  params: {},
  processing: false
}

const prefix = 'usuarios'

const usuarios = (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}/GET_ALL_DATA`:
      return { ...state, allData: action.data }
    case GET_USUARIOS:
      return {
        ...state,
        data: action.usuarios,
        total: action.total || 0,
        processing: false
      }
     case GET_USUARIO:
       return { ...state, selectedUsuario: action.selectedUsuario }
    case ADD_USUARIO:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_USUARIO:
      return { ...state, data: [...state.data].filter(usuario => usuario.id !== action.data)}
    case GET_USUARIOS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_USUARIO:
      return { ...state, data: state.data.map(usuario => (usuario.id === action.data.id ? action.data : usuario)) }
    default:
      return { ...state }
  }
}
export default usuarios
