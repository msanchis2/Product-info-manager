import { 
  GET_INTEGRACION,
  GET_INTEGRACIONES,
  ADD_INTEGRACION,
  UPDATE_INTEGRACION,
  GET_TABLAS
} from "../action"

// ** Initial State
const initialState = {
  data: [],
  categorias: [],
  allData: [],
  general: [],
  tablas: [],
  selectedIntegracion: {},
  processing: false
}

const prefix = 'integraciones'

const integraciones = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTEGRACIONES:
      return {
        ...state,
        data: action.integraciones,
        allData: action.allData,
        categorias: action.categorias,
        general: action.general,
        tablas: action.tablas,
        total: action.total || 0,
        processing: false
      }
    case GET_INTEGRACION:
      return { 
        ...state, 
        selectedIntegracion: action.selectedIntegracion
      }
    case ADD_INTEGRACION:
      return { ...state, data: state.data.concat(action.data) }
    case UPDATE_INTEGRACION:
      return { ...state, data: state.data.map(integracion => (integracion.id === action.data.id ? action.data : integracion)) }
    default:
      return { ...state }
  }
}
export default integraciones
