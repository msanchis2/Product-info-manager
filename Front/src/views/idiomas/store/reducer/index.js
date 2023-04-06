import {
  GET_IDIOMA,
  GET_IDIOMAS,
  GET_IDIOMAS_COUNT,
  ADD_IDIOMA,
  DELETE_IDIOMA,
  UPDATE_IDIOMA,
  GET_IDIOMA_PIM
} from "../action"

// ** Initial State
const initialState = {
  data: [],
  allData: [],
  selectedIdioma: {},
  selectedIdiomaPIM: {},
  gruposAtributos: [],
  atributos: [],
  usuarios: [],
  idiomas: [],
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
    case GET_IDIOMAS:
      return {
        ...state,
        data: action.usuarios,
        total: action.total || 0,
        processing: false
      }
    case GET_IDIOMA:
      return { ...state, selectedIdioma: action.selectedIdioma }
    case GET_IDIOMA_PIM:
      return { ...state, selectedIdiomaPIM: action.selectedIdiomaPIM }
    case ADD_IDIOMA:
      return { ...state, data: state.data.concat(action.data) }
    case DELETE_IDIOMA:
      return { ...state, data: [...state.data].filter(idioma => idioma.id !== action.data) }
    case GET_IDIOMAS_COUNT:
      return { ...state, total: action.total }
    case UPDATE_IDIOMA:
      return { ...state, data: state.data.map(idioma => (idioma.id === action.data.id ? action.data : idioma)) }
    default:
      return { ...state }
  }
}
export default usuarios
