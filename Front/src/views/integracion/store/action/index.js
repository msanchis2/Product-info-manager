import { AtributosControllerApi, MultimediaControllerApi, ProductoAtributosControllerApi, ProductoMultimediaControllerApi, ProductoGeneralControllerApi, ProductosControllerApi, 
  EmpresasControllerApi, RolesControllerApi, PermisosControllerApi, SituacionesControllerApi, MarcaControllerApi, CategoriasControllerApi, 
  GruposAtributosControllerApi, UsuariosControllerApi, TablasControllerApi, PlantillaControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'
import Swal from "sweetalert2"
const prefix = 'integraciones'

export const GET_INTEGRACIONES = `${prefix}/GET_DATA`
export const GET_INTEGRACION = `${prefix}/GET`
export const ADD_INTEGRACION = `${prefix}/ADD`
export const UPDATE_INTEGRACION = `${prefix}/UPDATE`
export const DELETE_INTEGRACION = `${prefix}/DELETE`

const apiIntegraciones = new PlantillaControllerApi(settings)
const apiTablas = new TablasControllerApi(settings)
const apiAtt = new AtributosControllerApi(settings)
const apiProd = new ProductosControllerApi(settings)
const apiPmul = new ProductoMultimediaControllerApi(settings)
const apiPatt = new ProductoAtributosControllerApi(settings)
const apiPgen = new ProductoGeneralControllerApi(settings)
const apiEmp = new EmpresasControllerApi(settings)
const apiRol = new RolesControllerApi(settings)
const apiPerm = new PermisosControllerApi(settings)
const apiSit = new SituacionesControllerApi(settings)
const apiMarca = new MarcaControllerApi(settings)
const apiCat = new CategoriasControllerApi(settings)
const apiUsu = new UsuariosControllerApi(settings)
const apiGAtt = new GruposAtributosControllerApi(settings)
const apiMult = new MultimediaControllerApi(settings)

// ** Get all Data

export const getData = params => {
  return async (dispatch) => {
    try {
      const {data: dataintegracions} = await apiIntegraciones.plantillaControllerFind()
      const {data: dataintegracionsCount} = await apiIntegraciones.plantillaControllerCount()
      const {data: productos} = await apiProd.productosControllerFind()
      const {data: productoGeneral} = await apiPgen.productoGeneralControllerFind()
      const {data: dataCategorias} = await apiCat.categoriasControllerFind()
      const {data: dataTablas} = await apiTablas.tablasControllerFind()
      dispatch({
        type: GET_INTEGRACIONES,
        integraciones: dataintegracions,
        allData: productos,
        categorias: dataCategorias,
        general: productoGeneral,
        tablas: dataTablas,
        total: dataintegracionsCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addIntegracion = (integracion) => {
  return async (dispatch) => {
    try {
      const {data} = await apiIntegraciones.plantillaControllerCreate(integracion)
      displaySuccessMsg('integracion creada')
      dispatch({
         type: ADD_INTEGRACION,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const insertarLinea = (objeto, tabla) => {
  return async (dispatch) => {
    try {
      switch (tabla) {
        case 'atributos': 
          objeto.codigo = parseInt(objeto.codigo)
          await apiAtt.atributosControllerCreate(objeto)
          break
        case 'multimedia': await apiMult.multimediaControllerCreate(objeto)
          break
        case 'categorias': await apiCat.categoriasControllerCreate(objeto)
          break
        case 'productos': await apiProd.productosControllerCreate(objeto)
          break
        case 'permisos': await apiPerm.permisosControllerCreate(objeto)
          break
        case 'empresas': await apiEmp.empresasControllerCreate(objeto)
          break
        case 'grupos_atributos': await apiGAtt.gruposAtributosControllerCreate(objeto)
          break
        case 'marca': await apiMarca.marcaControllerCreate(objeto)
          break
        case 'situaciones': await apiSit.situacionesControllerCreate(objeto)
          break
        case 'roles': await apiRol.rolesControllerCreate(objeto)
          break
        case 'usuarios': await apiUsu.usuariosControllerCreate(objeto)
          break
        case 'producto_multimedia': await apiPmul.productoMultimediaControllerCreate(objeto)
          break
        case 'producto_general': await apiPgen.productoGeneralControllerCreate(objeto)
          break
        case 'producto_atributos': await apiPatt.productoAtributosControllerCreate(objeto)
          break
        default:
          console.error('problema con el nombre de la tabla')
      }
    } catch (err) {
      console.error(err.message)
      Swal.fire({
        icon: 'Error',
        text: 'Error'
      })
    }
  }
}

export const actualizarLinea = (id, objeto, tabla) => {
  return async (dispatch) => {
    try {
      switch (tabla) {
        case 'atributos': 
          objeto.codigo = parseInt(objeto.codigo)
          await apiAtt.atributosControllerUpdateById(id, objeto)
          break
        case 'multimedia': await apiMult.multimediaControllerUpdateById(id, objeto)
          break
        case 'categorias': await apiCat.categoriasControllerUpdateById(id, objeto)
          break
        case 'productos': await apiProd.productosControllerUpdateById(id, objeto)
          break
        case 'permisos': await apiPerm.permisosControllerUpdateById(id, objeto)
          break
        case 'empresas': await apiEmp.empresasControllerUpdateById(id, objeto)
          break
        case 'grupos_atributos': await apiGAtt.gruposAtributosControllerUpdateById(id, objeto)
          break
        case 'marca': await apiMarca.marcaControllerUpdateById(id, objeto)
          break
        case 'situaciones': await apiSit.situacionesControllerUpdateById(id, objeto)
          break
        case 'roles': await apiRol.rolesControllerUpdateById(id, objeto)
          break
        case 'usuarios': await apiUsu.usuariosControllerUpdateById(id, objeto)
          break
        case 'producto_multimedia': await apiPmul.productoMultimediaControllerUpdateById(id, objeto)
          break
        case 'producto_general': await apiPgen.productoGeneralControllerUpdateById(id, objeto)
          break
        case 'producto_atributos': await apiPatt.productoAtributosControllerUpdateById(id, objeto)
          break
        default:
          console.error('problema con el nombre de la tabla')
      }
    } catch (err) {
      console.error(err.message)
      Swal.fire({
        icon: 'error',
        title: 'Eror'
      })
    }
  }
}

export const updateIntegracion = (id, integracion) => {
  return async (dispatch) => {
    try {
      const {data} = await apiIntegraciones.plantillaControllerUpdateById(id, integracion)
      displaySuccessMsg('integracion actualizada')
      dispatch({
         type: UPDATE_INTEGRACION,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteIntegracion = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await apiIntegraciones.plantillaControllerDeleteById(id)
      location.reload()
      dispatch({
         type: DELETE_INTEGRACION,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getIntegracion = (integracion) => {
  return async (dispatch) => {
    try {
      const {data: dataIntegracion} = await apiIntegraciones.plantillaControllerFindById(integracion)
      dispatch({
        type: GET_INTEGRACION,
        selectedIntegracion: dataIntegracion
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

const csvmaker = function (data, cabecera) {
  const cabeceraConComas = cabecera.replaceAll(',', ';')
  const csvRows = ['id;'.concat(cabeceraConComas)]
  let valuesStr = '', valueCampo, campo
  const campos = cabecera.split(",")

  Object.values(data).forEach(value => {
    valuesStr = value.id.toString()
    campos.forEach(el => {
      valueCampo = el === 'GLN' ? el : el[0].toLowerCase().concat(el.substring(1, el.length))
      campo = value[valueCampo]
      if (campo != null) {
        campo = campo.toString().replaceAll('\n', '').replaceAll(';', '')
      } else {
        campo = ''
      }
      valuesStr = valuesStr.concat(";").concat(campo)
    })
    csvRows.push(valuesStr)
  })
  return csvRows.join('\n')
}

const descargaFichero = function (data, tabla) {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  localStorage.setItem("csv", url)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', tabla.concat('_PIM.csv'))
  a.click()
}

export const descargarCsv = (tabla, cabecera) => {
  return async () => {
    Swal.fire({
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    try {
      switch (tabla) {
        case 'atributos': await apiAtt.atributosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'multimedia': await apiMult.multimediaControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'categorias': await apiCat.categoriasControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'productos': await apiProd.productosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'permisos': await apiPerm.permisosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'empresas': await apiEmp.empresasControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'grupos_atributos': await apiGAtt.gruposAtributosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'marca': await apiMarca.marcaControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'situaciones': await apiSit.situacionesControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'roles':await apiRol.rolesControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'usuarios': await apiUsu.usuariosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'producto_multimedia': await apiPmul.productoMultimediaControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'producto_general': await apiPgen.productoGeneralControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        case 'producto_atributos': await apiPatt.productoAtributosControllerFind().then((response) => { descargaFichero(csvmaker(response.data, cabecera), tabla) })
          break
        default:
          console.error('problema con el nombre de la tabla')
      }
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initintegracion = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_INTEGRACION,
      selectedCompany: null
    })
  }
}
