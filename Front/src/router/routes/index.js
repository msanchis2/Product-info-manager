// ** Routes Imports
import AppRoutes from './Apps'
import Pages from './Pages'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/productos'

// ** Merge Routes
const Routes = [...AppRoutes, ...Pages]

export { DefaultRoute, TemplateTitle, Routes }
