import { Dispatch } from 'react'
import { IdiomasControllerApi, TraduccionesControllerApi, TraduccionesFilter1, IdiomasFilter1, NewTraducciones, TraduccionesWithRelations, settings } from '@api/backend'
import axios from 'axios'
import { displaySuccessMsg } from '@src/utility/Utils'
import Swal from 'sweetalert2'


const prefix = 'traducciones'

const api = new TraduccionesControllerApi(settings)

// ** Get Idiomas
export const getIdiomas = () => {
  const api = new IdiomasControllerApi(settings)

  return async (dispatch) => {
    const filter = { where: { ['activo_sn']: { eq: 'S' } } }
    await api.idiomasControllerFind(JSON.stringify(filter)).then(response => {
      dispatch({
        type: `${prefix}/GET_IDIOMAS`,
        data: response.data
      })
    })
  }
}

export const googleTraslate = async () => {
  try {
    const filter = { where: { ['valor']: { eq: '' } } }
    const { data: traducciones} = await api.traduccionesControllerFind(JSON.stringify(filter))
    traducciones.forEach(async el => {
      if ('es' != el.idiomaId) {
        fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_TRANSLATOR}&q=${el.clave}&source=es&target=${el.idiomaId}`, {
          method: 'GET'
        }).then(response => response.json())
        .then(async data => { 
          const resultado = data.data.translations[0].translatedText
          await api.traduccionesControllerUpdateById(el.id, { valor: resultado }) 
        })
      } else {
        await api.traduccionesControllerUpdateById(el.id, { valor: el.clave }) 
      }
    })
    Swal.fire({
      icon: 'success',
      title: 'Traducciones realizadas',
      text: 'Se realizan traducciones solo de las palabras que no estén traducidas ya'
    })
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      text: {err}
    })
  }
}
 
const getTranslationRecords = (data) => {
  const resultado = []
  data?.forEach(row => {
    const found = resultado.find((item) => item.clave === row.clave)
    if (found && {}.propertyIsEnumerable.call(found, `clave`)) {
      found.idiomas.push({ [`${row.idiomaId}`]: { idioma: row.idiomaId, valor: row.valor, id: row.id } })
      resultado.concat(found)
    } else {
      resultado.push({
        clave: row.clave || 'none',
        idiomas: [
          {
            [`${row?.idiomaId || ''}`]: {
              idioma: row?.idiomaId,
              valor: row.valor,
              id: row.id
            }
          }
        ]
      })
    }
  })
  return resultado
}


// ** Get all Data
export const getAllData = () => {
  return async (dispatch) => {
    await api.traduccionesControllerFind().then(async response => {
      const data = await getTranslationRecords(response.data)
      dispatch({
        type: `${prefix}/GET_ALL_DATA`,
        data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    const { page, perPage, q, sortBy } = params

    const filter = {
      offset: (page - 1) * perPage,
      limit: perPage,
      skip: ((page - 1) * perPage),
      order: sortBy || "clave ASC",
      where: {
        ['or']: [
          { ['clave']: { like: `%${q}%` } },
          { ['valor']: { like: `%${q}%` } }
        ]
      }
    }

    await api.traduccionesControllerFind(JSON.stringify(filter)).then(response => {
      const data = getTranslationRecords(response.data)
      dispatch({
        type: `${prefix}/GET_DATA`,
        data,
        totalPages: Math.ceil(data?.length / perPage) || 1,
        params
      })
    })

    await api.traduccionesControllerCount(JSON.stringify(filter.where)).then(response => {
      // Traducciones vienen de a 4 (pero cuentan como 1)
      const total = (response?.data?.count / 4) || 0

      dispatch({
        type: `${prefix}/GET_DATA_COUNT`,
        total: response.data.count || 0
      })
    })
  }
}

// ** Obtengo Traduccion
export const getTraduccion = (id) => {
  return async (dispatch) => {
    await api.traduccionesControllerFindById(id).then(response => {
      dispatch({
        type: `${prefix}/GET`,
        data: response.data
      })
    })
      .catch(err => console.error(err))
  }
}

// ** Obtengo Traduccion por clave
export const getTraduccionesPorClave = (clave = '') => {
  const filter = {
    where: {
      ['clave']: { eq: decodeURIComponent(clave) }
    }
  }

  return async (dispatch) => {
    await api.traduccionesControllerFind(JSON.stringify(filter)).then(response => {
      dispatch({
        type: `${prefix}/GET`,
        data: response.data
      })
    })
      .catch(err => console.error(err))
  }
}

// ** Añdir nueva Traduccion
export const addTraduccion = (traducciones) => {
  return async (dispatch, getState) => {
    const { clave } = traducciones
    delete traducciones.clave
    // Se hace el delete, para no añadir clave a la tabla(redundante)
    // antes clave, era clave:clave(ATENCION)
    try {
      Object.keys(traducciones).forEach(async (idioma) => {
        // Le meto vacio para que no sea null
        if (traducciones[idioma] == undefined) {
          traducciones[idioma] = ""
        }
        const newTraduccion = {
          idiomaId: idioma,
          clave,
          valor: traducciones[idioma]
        }
        await api.traduccionesControllerCreate(newTraduccion)
        dispatch({ type: `${prefix}/ADD` })
      })
      displaySuccessMsg('Traducciones', 'añadidas con éxito')
      getData(getState().traducciones.params)
      dispatch(getAllData())
    } catch (err) {
      console.error(err)
    }
  }
}

// ** Update Traduccion
export const updateTraduccion = (traducciones) => {
  return async (dispatch, getState) => {

    try {
      traducciones.forEach(async (newTraduccion) => {
        await api.traduccionesControllerUpdateById(newTraduccion.id, newTraduccion)
      })

      displaySuccessMsg('Traducciones', 'actualizadas correctamente')
      return dispatch(getAllData())
    } catch (err) {
      console.error(err)
    }
  }
}

// ** Delete Traduccion
export const deleteTraduccion = (id = 0) => {
  return (dispatch, getState) => {

    api
      .traduccionesControllerDeleteById(id)
      .then(response => {
        dispatch({
          type: `${prefix}/DELETE`
        })
      })
      .then(() => {
        dispatch(getData(getState().traducciones.params))
        dispatch(getAllData())
      })

  }
}

export const initTraduccion = () => {
  return async (dispatch) => {
    dispatch({
      type: `${prefix}/GET_TRADUCCION`,
      selectedCompany: null
    })
  }
}
