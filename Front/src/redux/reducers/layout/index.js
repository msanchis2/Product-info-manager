// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'
import { GET_EMPRESAS, HANDLE_CHANGE_SELECTED_EMPRESA } from '@store/actions/layout'
import { getUserData } from '@src/utility/Utils'

// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Initial State
const initialState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  empresas: [],
  selectedEmpresaId: getUserData()?.empresaId || 1
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_CONTENT_WIDTH':
      return { ...state, contentWidth: action.value }
    case 'HANDLE_MENU_COLLAPSED':
      window.localStorage.setItem('menuCollapsed', action.value)
      return { ...state, menuCollapsed: action.value }
    case 'HANDLE_MENU_HIDDEN':
      return { ...state, menuHidden: action.value }
    case 'HANDLE_RTL':
      return { ...state, isRTL: action.value }
    case HANDLE_CHANGE_SELECTED_EMPRESA:
      return {
        ...state,
        selectedEmpresaId: action.value
      }
    case GET_EMPRESAS:
      return {
        ...state,
        empresas: action.empresas
      }
    default:
      return state
  }
}

export default layoutReducer
