import { EmpresasControllerApi, settings } from '@api/backend'
const apiEmpresas = new EmpresasControllerApi(settings)

const prefix = 'layout'
export const HANDLE_CHANGE_SELECTED_EMPRESA = `${prefix}/HANDLE_CHANGE_SELECTED_EMPRESA`
export const GET_EMPRESAS = `${prefix}/GET_EMPRESAS`

export const getEmpresasList = () => {
  return async (dispatch) => {
    try {
      const { data } = await apiEmpresas.empresasControllerFind()

      dispatch({
        type: GET_EMPRESAS,
        empresas: data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: 'HANDLE_CONTENT_WIDTH', value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: 'HANDLE_MENU_COLLAPSED', value })

// ** Handles Menu Hidden State (Bool)
export const handleMenuHidden = value => dispatch => dispatch({ type: 'HANDLE_MENU_HIDDEN', value })

// ** Handles RTL (Bool)
export const handleRTL = value => dispatch => dispatch({ type: 'HANDLE_RTL', value })

// ** Handles RTL (Bool)
export const handleSelectedEmpresaChange = value => dispatch => dispatch({ type: HANDLE_CHANGE_SELECTED_EMPRESA, value })
// ** Handles Para Idiomas
export const handleSelectedIdiomaChange = value => dispatch => dispatch({ type: 'HANDLE_CHANGE_SELECTED_IDIOMA', value })
