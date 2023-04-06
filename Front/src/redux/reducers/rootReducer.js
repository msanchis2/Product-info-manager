// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import productos from '@src/views/productos/store/reducer'
import multimedia from '@src/views/multimedia/store/reducer'
import grupoatributos from '@src/views/grupoatributos/store/reducer'
import atributos from '@src/views/atributos/store/reducer'
import categorias from '@src/views/categorias/store/reducer'
import usuarios from '@src/views/usuarios/store/reducer'
import idiomas from '@src/views/idiomas/store/reducer'
import empresas from '@src/views/empresas/store/reducer'
import traducciones from '@src/views/traducciones/store/reducer'
import sincronizaciones from '@src/views/sincronizaciones/store/reducer'
import roles from '@src/views/roles/store/reducer'
import permisos from '@src/views/permisos/store/reducer'
import marcas from '@src/views/marcas/store/reducer'
import situaciones from '@src/views/situaciones/store/reducer'
import integracion from '@src/views/integracion/store/reducer'

const rootReducer = combineReducers({
  auth,
  productos,
  multimedia,
  navbar,
  layout,
  grupoatributos,
  atributos,
  categorias,
  usuarios,
  idiomas,
  empresas,
  traducciones,
  sincronizaciones,
  roles,
  permisos,
  situaciones,
  marcas,
  integracion
})

export default rootReducer
