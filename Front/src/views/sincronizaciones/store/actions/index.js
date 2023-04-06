import { MarcaControllerApi, ProductoMultimediaControllerApi, TwFunctionsControllerApi, ProductoGeneralControllerApi, ProductoAtributosControllerApi, ProductosControllerApi, AtributosControllerApi, CategoriasControllerApi, GruposAtributosControllerApi, settings } from '@api/backend'
import Swal from 'sweetalert2'

const apiAtributos = new AtributosControllerApi(settings)
const apiCategorias = new CategoriasControllerApi(settings)
const apiProductos = new ProductosControllerApi(settings)
const apiAtributosProducto = new ProductoAtributosControllerApi(settings)
const apiMultimediaProducto = new ProductoMultimediaControllerApi(settings)
const apiGeneralProducto = new ProductoGeneralControllerApi(settings)
const apiSoap = new TwFunctionsControllerApi(settings)
const apiMarcas = new MarcaControllerApi(settings)

const prefix = 'productos'

export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`
export const GET_PRODUCT_DATA = `${prefix}/GET_PRODUCT_DATA`
export const REFRESH_SELECTED_EMPRESA = `${prefix}/REFRESH_SELECTED_EMPRESA`
export const CREATE_PRODUCTO = `${prefix}/CREATE_PRODUCTO`
export const UPDATE_PRODUCTO_DATA = `${prefix}/UPDATE_PRODUCTO_DATA`
export const INIT_REQUEST = `${prefix}/INIT_REQUEST`
export const REQUEST_COMPLETED = `${prefix}/REQUEST_COMPLETED`

export const initRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: INIT_REQUEST
    })
  }
}

export const finishRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_COMPLETED
    })
  }
}

export const getDatosNecesarios = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(initRequest())
      const empresaId = getState().layout.selectedEmpresaId
      const filter = {
        where: {
          ['empresaId']: { eq: `${empresaId}` }
        }
      }
      const { data: dataProductoGeneral } = await apiGeneralProducto.productoGeneralControllerFind()
      const { data: dataProductoMult } = await apiMultimediaProducto.productoMultimediaControllerFind()
      const { data: dataProductoAtributo } = await apiAtributosProducto.productoAtributosControllerFind()
      const { data: dataProducto } = await apiProductos.productosControllerFind(JSON.stringify(filter))
      const { data: dataCategorias } = await apiCategorias.categoriasControllerFind()
      const { data: dataAtributos } = await apiAtributos.atributosControllerFind()
      const { data: dataMarcas } = await apiMarcas.marcaControllerFind()
      dispatch({
        type: INIT_DATA_NECESARIA,
        productosG: dataProductoGeneral,
        productosM: dataProductoMult,
        productosA: dataProductoAtributo,
        productos: dataProducto,
        categorias: dataCategorias,
        atributos: dataAtributos,
        marcas: dataMarcas
      })

    } catch (err) {
      console.error(err.message)
    }
  }
}

export const InsertItem = (data) => {
  return async (dispatch) => {
    try {
      dispatch(initRequest())
      await apiSoap.twFunctionsControllerInsertItem(JSON.stringify(data))
      Swal.fire({
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      }).then(() => {
        Swal.fire({
          icon: 'success'
        })
        }
      )
      dispatch(finishRequest())
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        showCancelButton: false,
        icon: 'error',
        confirmButtonText: `Ok`,
        confirmButtonColor: '#7367f0'
      })
    }
  }
}