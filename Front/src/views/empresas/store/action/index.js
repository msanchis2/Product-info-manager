import { EmpresasControllerApi, settings} from '@api/backend'
import { displaySuccessMsg } from '@src/utility/Utils'

const prefix = 'empresas'

export const GET_EMPRESA = `${prefix}/GET_DATA_EMPRESA`
export const GET_EMPRESAS = `${prefix}/GET_DATA`
export const GET_EMPRESAS_ALL = `${prefix}/GET_DATA_ALL`
export const GET_EMPRESAS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_EMPRESA = `${prefix}/ADD`
export const DELETE_EMPRESA = `${prefix}/DELETE`
export const UPDATE_EMPRESA = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiEmpresas = new EmpresasControllerApi(settings)

// ** Get all Data

export const getData = params => {
  return async (dispatch, getState) => {
    try {

      const {page = 1, perPage = 10, sortBy = "", q = "" } = params
      const empresaId = getState().layout.selectedEmpresaId
    
      const filter =  {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {
          ['empresaId']: {eq: `${empresaId}`},
          ['or'] : [
            {['nombre']: {like: `%${q}%`, options: 'i'}},
            {['codigo']: {like: `%${q}%`, options: 'i'}}
          ]
        }
      }
      const {data: dataEmpresas} = await apiEmpresas.empresasControllerFind(JSON.stringify(filter))
      const {data: dataEmpresasCount} = await apiEmpresas.empresasControllerCount(JSON.stringify(filter.where))

      dispatch({
        type: GET_EMPRESAS,
        empresas: dataEmpresas,
        total: dataEmpresasCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addEmpresa = (empresa) => {
  return async (dispatch) => {
    try {
      const {data} = await apiEmpresas.empresasControllerCreate(empresa)
      displaySuccessMsg('Empresa creada')
      dispatch({
         type: ADD_EMPRESA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateEmpresa = (id, empresa) => {
  return async (dispatch) => {
    try {
      const {data} = await apiEmpresas.empresasControllerUpdateById(id, empresa)
      displaySuccessMsg('Empresa actualizada')
      dispatch({
         type: UPDATE_EMPRESA,
         data
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteEmpresa = (empresaId) => {
  return async (dispatch) => {
    try {
      const {data} = await apiEmpresas.empresasControllerDeleteById(empresaId)
      displaySuccessMsg('Empresa borrada')
       dispatch({
         type: DELETE_EMPRESA,
         data: empresaId
       })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getEmpresa = (empresa) => {
  return async (dispatch) => {
    try {
      const {data: dataEmpresa} = await apiEmpresas.empresasControllerFindById(empresa)
      dispatch({
        type: GET_EMPRESA,
        selectedEmpresa: dataEmpresa
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initEmpresa = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_EMPRESA,
      selectedCompany: null
    })
  }
}
