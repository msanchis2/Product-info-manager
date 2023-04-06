import { INIT_DATA_NECESARIA, INIT_REQUEST, REQUEST_COMPLETED} from "../actions"

const initialState = {
  productos: [],
  productosG: [],
  productosA: [],
  productosM: [],
  categorias: [],
  atributos: [],
  marcas: [],
  processing: false
}

const productosReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA_NECESARIA:
      return {
        ...state,
        productos: action.productos,
        productosG: action.productosG,
        productosA: action.productosA,
        productosM: action.productosM,
        categorias: action.categorias,
        atributos: action.atributos,
        marcas: action.marcas
      }
    case INIT_REQUEST:
      return { ...state, processing: true }
    case REQUEST_COMPLETED:
      return { ...state, processing: false }
    default:
      return { ...state }
  }
}
export default productosReducer
