import { UsuariosControllerApi, settings} from '@api/backend'
import {displaySuccessMsg} from '@src/utility/Utils'

const prefix = 'usuarios'

export const GET_USUARIO = `${prefix}/GET_DATA_USUARIO`
export const GET_USUARIOS = `${prefix}/GET_DATA`
export const GET_USUARIOS_COUNT = `${prefix}/GET_DATA_COUNT`
export const ADD_USUARIO = `${prefix}/ADD`
export const DELETE_USUARIO = `${prefix}/DELETE`
export const UPDATE_USUARIO = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`

const apiUsuarios = new UsuariosControllerApi(settings)

// ** Get all Data
export const getData = params => {
  return async (dispatch, getState) => {
    try {

      const {page = 1, perPage = 10, sortBy = "", q = ""} = params
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
            {['codigo']: {like: `%${q}%`, options: 'i'}},
            {['mail']: {like: `%${q}%`, options: 'i'}}
          ]
        },
        include: [
          {
            relation: 'roles'
          }
        ]
      }

      const {data: dataUsuarios} = await apiUsuarios.usuariosControllerFind(JSON.stringify(filter))
      const {data: dataUsuariosCount} = await apiUsuarios.usuariosControllerCount(JSON.stringify(filter.where))

      dispatch({
        type: GET_USUARIOS,
        usuarios: dataUsuarios,
        total: dataUsuariosCount.count || 0
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addUsuario = (usuario) => {
  return async (dispatch) => {
    try {
      const {data} = await apiUsuarios.usuariosControllerCreate(usuario)
      displaySuccessMsg('Usuario creado')
      dispatch({
        type: ADD_USUARIO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateUsuario = (id, usuario) => {
  return async (dispatch) => {
    try {
      const {data} = await apiUsuarios.usuariosControllerUpdateById(id, usuario)
      displaySuccessMsg('Usuario actualizado')
      dispatch({
        type: UPDATE_USUARIO,
        data
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteUsuario = (usuarioId) => {
  return async (dispatch) => {
    try {
      await apiUsuarios.usuariosControllerDeleteById(usuarioId)
      displaySuccessMsg("Usuario eliminado")
      dispatch({
        type: DELETE_USUARIO,
        data: usuarioId
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getUsuario = (usuario) => {
  return async (dispatch) => {
    try {
      // const filter = {
      //   include: ['roles']
      // }
      const {data: dataUsuario} = await apiUsuarios.usuariosControllerFindById(usuario)
      dispatch({
        type: GET_USUARIO,
        selectedUsuario: dataUsuario
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const initUsuario = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_USUARIO,
      selectedCompany: null
    })
  }
}
