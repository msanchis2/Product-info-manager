import { TwFunctionsControllerApi, MarcaControllerApi, SituacionesControllerApi, UsuariosControllerApi, MultimediaControllerApi, ProductoMultimediaControllerApi, ProductoGeneralControllerApi, ProductoAtributosControllerApi, ProductosControllerApi, AtributosControllerApi, CategoriasControllerApi, EmpresasControllerApi, GruposAtributosControllerApi, FileUploadControllerApi, settings } from '@api/backend'
import { displayErrorMsg, displaySuccessMsg } from '@src/utility/Utils'
import Swal from 'sweetalert2'
import axios from 'axios'

const apiFileUpload = new FileUploadControllerApi(settings)
const apiAtributos = new AtributosControllerApi(settings)
const apiCategorias = new CategoriasControllerApi(settings)
const apiGruposAtributos = new GruposAtributosControllerApi(settings)
const apiUsuarios = new UsuariosControllerApi(settings)
const apiProductos = new ProductosControllerApi(settings)
const apiAtributosProducto = new ProductoAtributosControllerApi(settings)
const apiMultimediaProducto = new ProductoMultimediaControllerApi(settings)
const apiGeneralProducto = new ProductoGeneralControllerApi(settings)
const apiMultimedia = new MultimediaControllerApi(settings)
const apiEmpresas = new EmpresasControllerApi(settings)
const apiMarca = new MarcaControllerApi(settings)
const apiSituaciones = new SituacionesControllerApi(settings)
const apiSoap = new TwFunctionsControllerApi(settings)

const prefix = 'productos'

export const GET_DATA = `${prefix}/GET_DATA`
export const UPDATE_ATRIBUTO = `${prefix}/UPDATE`
export const INIT_DATA_NECESARIA = `${prefix}/INIT_DATA_NECESARIA`
export const GET_PRODUCT_DATA = `${prefix}/GET_PRODUCT_DATA`
export const REFRESH_SELECTED_EMPRESA = `${prefix}/REFRESH_SELECTED_EMPRESA`
export const REFRESH_MULTIMEDIA = `${prefix}/REFRESH_MULTIMEDIA`
export const CREATE_PRODUCTO = `${prefix}/CREATE_PRODUCTO`
export const UPDATE_PRODUCTO_DATA = `${prefix}/UPDATE_PRODUCTO_DATA`
export const ADD_PRODUCTO_MULTIMEDIA = `${prefix}/ADD_PRODUCTO_MULTIMEDIA`

export const generarDescripcionIA = async (nProdcuto, numPalabras, categoria = "producto", marca = "cualquiera", color = "varibale") => {
  const pruebas = sessionStorage.getItem('IA')
  if (pruebas == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Limite superado',
      text: 'Ya has superado el limite de prueba de llamadas a la IA',
      showCloseButton: true
    })
    return {choices: [{text: ""}]}
  } else {
    sessionStorage.setItem('IA', pruebas - 1)
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`
      },
      body: JSON.stringify({
        prompt: `Genera una descripcion del producto ${nProdcuto} que es un ${categoria} de marca ${marca} y es de color ${color}. La descripción tiene que tener como máximo ${numPalabras + 5} palabras y como mínimo ${numPalabras - 5}`,
        max_tokens: 270
      })
    })
    return response.json()
  }
  
}

export const resetAtributos = (id, categoria, atributos) => {
  return async () => {
    try {
      const filter =  { where: { ['productoId']: { eq: `${id}` } } }
      await apiAtributosProducto.productoAtributosControllerFind(JSON.stringify(filter)).then(async resp => {
        const dataProdAtt = resp.data
        let atributo, atributoCat
        dataProdAtt.forEach(async att => {
          atributo = atributos.find(el => el.codigo == att.atributoId)
          atributoCat = atributo == undefined ? "" : atributo.categorias
          if (!atributoCat.includes(categoria)) {
            await apiAtributosProducto.productoAtributosControllerDeleteById(att.id)
          }
        })
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const generarNuevaCategoria = (id, categoria) => {
  return async () => {
  try {
    console.log(id, categoria)
    const filter =  { where: { ['productoId']: { eq: `${id}` } } }
    await apiAtributosProducto.productoAtributosControllerFind(JSON.stringify(filter)).then(async resp => {
      const dataProdAtt = resp.data
      await apiAtributos.atributosControllerFind().then(respA => {
        const dataAtt = respA.data
        let attDeCategoria = dataAtt.filter(att => att.categorias != null)  //Filtra los atributos que no tienen categoria null
        attDeCategoria = attDeCategoria.filter(att => att.categorias.includes(categoria)) //Filtra los atributos que son de la categoria buscada
        let atributo, prodAtributo
        const atributosMantenidos = []

        dataProdAtt.forEach(async att => {
          //Recorre los atributos del producto, si es valido para la categoria lo mantiene, si no se lo carga
          atributo = attDeCategoria.find(el =>  el.nombre.toLowerCase().replaceAll(" ", "") == att.nombre.toLowerCase().replaceAll(" ", "")) 
          if (atributo == undefined) {
            await apiAtributosProducto.productoAtributosControllerDeleteById(att.id) 
          } else {
            atributosMantenidos.push(atributo)
          }
        })
        //Comprueba los atributos de la categoria que no se han mantenido y los crea
        attDeCategoria.forEach(async att => {
          atributo = atributosMantenidos.find(el => el.nombre.toLowerCase() == att.nombre.toLowerCase())
          if (atributo == undefined) {
            prodAtributo = {
              productoId: id,
              atributoId: att.codigo,
              valor: "",
              nombre: att.nombre,
              unidad: att.unidad || ""
            }
            await apiAtributosProducto.productoAtributosControllerCreate(prodAtributo)
          }
        })
          })
      })
  } catch (err) {
    console.error(err.message)
  }
  }
}

export async function generarEAN(categoria) {
  try {
    const { data } = await apiSoap.twFunctionsControllerNewEANCode(categoria)
    return data
  } catch (err) {
    console.error(err.message)
  }
}

export const handleImageUpload = (folder, filename, fileObject, prodId) => {
  return async () => {
  try {
    const fileextension = fileObject.name.split(".")[1]
    const nombreBonito = filename.replaceAll("_", " ").replaceAll("  ", " ")
    filename = filename.replaceAll("__", "_")
    const filter = JSON.stringify({
      where: {
        ['productoId']: { eq: `${prodId}` }
      }
    })
    const { data: dataProductoMultimedia } = await apiMultimediaProducto.productoMultimediaControllerFind(filter)
    const pMultimedia = dataProductoMultimedia.find(el => el.nombre.toLowerCase() == nombreBonito.toLowerCase())
    if (pMultimedia != undefined) {
      //Existe prodMultimedia -> update
      const item = pMultimedia
      const prodMultimediaObj = {
        nombre: nombreBonito,
        categoria: item.categoria || "",
        formato: item.formato || "",
        objetivo: item.objetivo || "",
        principalSN: item.principalSN || "",
        productoId: item.productoId,
        publicoSN: item.publicoSN || "",
        tagAecoc: item.tagAecoc || "",
        tipo: item.tipo || "",
        fichero: `multimedia/${folder}/${filename.concat(".").concat(fileextension)}`
      }
      await apiMultimediaProducto.productoMultimediaControllerUpdateById(item.id, prodMultimediaObj)
    } else {
      //No existe -> create
      const prodMultimediaObj = {
        nombre: nombreBonito,
        categoria: "",
        formato: "",
        objetivo: "",
        principalSN: "",
        productoId: prodId,
        publicoSN: "",
        tagAecoc: "",
        tipo: (fileextension == 'png' || fileextension == 'jpg' || fileextension == 'jpeg') ? 'Imagen' : 'Documento',
        fichero: `multimedia/${folder}/${filename.concat(".").concat(fileextension)}`
      }
      await apiMultimediaProducto.productoMultimediaControllerCreate(prodMultimediaObj)
    }
    const {data: dataImg} = await apiFileUpload.fileUploadControllerImageUpload(folder, filename, fileObject)
  } catch (err) {
    console.error(err.message)
  }
  }
}

export async function handleImageUploadPrincipal(folder, filename, fileObject, selectedProducto) {
  try {
    const { data: dataProducto } = await apiProductos.productosControllerFindById(selectedProducto.id)
    dataProducto.enviarAecoc = dataProducto.enviarAecoc == null ? "N" : dataProducto.enviarAecoc
    dataProducto.ordenAtributos = dataProducto.ordenAtributos == null ? "" : dataProducto.ordenAtributos
    delete dataProducto.fechaModificacion

    const finalProductoObj = {
      ...dataProducto,
      imagen: `multimedia/${folder}/1250x850_${filename}.png`
    }

    await apiProductos.productosControllerUpdateById(selectedProducto.id, finalProductoObj)
    await apiFileUpload.fileUploadControllerImageUpload(folder, filename, fileObject)
  } catch (err) {
    console.error(err.message)
  }
}


export const productoMultimedia = (multimedia) => {
  return async (dispatch, getState) => {
    try {
      const { data: multimediaNew } = await apiMultimediaProducto.productoMultimediaControllerCreate(JSON.stringify(multimedia))
      dispatch({
        type: ADD_PRODUCTO_MULTIMEDIA,
        multimediaNew
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getDatosNecesarios = () => {
  return async (dispatch, getState) => {
    try {
      const empresaId = getState().layout.selectedEmpresaId
      
      const filter = JSON.stringify({
        where: {
          ['empresaId']: { eq: `${empresaId}` }
        }
      })

      const { data: dataGruposAtributos } = await apiGruposAtributos.gruposAtributosControllerFind(filter)
      const { data: dataAtributos } = await apiAtributos.atributosControllerFind(filter)
      const { data: dataCategorias } = await apiCategorias.categoriasControllerFind(filter)
      const { data: dataEmpresas } = await apiEmpresas.empresasControllerFind(filter)
      const { data: dataSituaciones } = await apiSituaciones.situacionesControllerFind(filter)
      const { data: dataMarcas } = await apiMarca.marcaControllerFind(filter)
      const { data: dataMultimedias } = await apiMultimedia.multimediaControllerFind(filter)

      dispatch({
        type: INIT_DATA_NECESARIA,
        gruposAtributos: dataGruposAtributos,
        atributos: dataAtributos,
        categorias: dataCategorias,
        empresas: dataEmpresas,
        situaciones: dataSituaciones,
        marcas: dataMarcas,
        multimedias: dataMultimedias
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const createNewProducto = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const productoObj = {
        empresaId: getState().layout.selectedEmpresaId,
        nombre: formValues.nombre,
        imagen: `multimedia/${formValues.nombre}/1250x850_imagen_principal.png`,
        categorias: formValues.categorias
      }
      const { data: dataCreateProducto } = await apiProductos.productosControllerCreate(productoObj)
      await handleImageUploadPrincipal(formValues.nombre, "imagen_principal", formValues.imagenPrincipal, dataCreateProducto)
      await apiGeneralProducto.productoGeneralControllerCreate({ productoId: dataCreateProducto.id })

      const {data: atributos} = await apiAtributos.atributosControllerFind()
      const atributosCategoria = atributos.filter(el => el.categorias != null).filter(el => el.categorias.includes(formValues.categorias))
      let prodAtributo
      atributosCategoria.forEach(async el => {
        prodAtributo = {
          productoId: dataCreateProducto.id,
          atributoId: el.codigo,
          valor: "",
          nombre: el.nombre,
          unidad: el.unidad || ""
        }
        await apiAtributosProducto.productoAtributosControllerCreate(prodAtributo)
      })
      displaySuccessMsg(`Producto '${productoObj.nombre}' creado`)

      return dispatch({
        type: CREATE_PRODUCTO,
        id: dataCreateProducto.id
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const refreshBySelectedEmpresa = () => {
  return async (dispatch, getState) => {
    try {
      const empresaId = getState().layout.selectedEmpresaId
      const filter = JSON.stringify({
        where: {
          ['empresaId']: { eq: `${empresaId}` }
        }
      })
      const { data: dataUsuarios } = await apiUsuarios.usuariosControllerFind(filter)
      const { data: dataGruposAtributos } = await apiGruposAtributos.gruposAtributosControllerFind(filter)
      const { data: dataCategorias } = await apiCategorias.categoriasControllerFind(filter)

      dispatch({
        type: REFRESH_SELECTED_EMPRESA,
        gruposAtributos: dataGruposAtributos,
        categorias: dataCategorias,
        usuarios: dataUsuarios
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getProductById = productId => {
  return async (dispatch, getState) => {
    try {
      const empresaId = getState().layout.selectedEmpresaId
      const id = parseInt(productId)
      const { data: dataProducto } = await apiProductos.productosControllerFindById(id)

      if (empresaId !== dataProducto.empresaId) {
        return dispatch({
          type: GET_PRODUCT_DATA,
          selectedProducto: {}
        })
      }
      const filter = JSON.stringify({where: {['productoId']: { eq: `${id}` }}})
      const { data: dataProductoAtributos } = await apiAtributosProducto.productoAtributosControllerFind(filter)
      const { data: dataProductoMultimedia } = await apiMultimediaProducto.productoMultimediaControllerFind(filter)
      const { data: dataProductoGeneral } = await apiGeneralProducto.productoGeneralControllerFind(filter)

      //Combinamos todo para dejar en un solo objeto
      const fullObjData = {
        ...dataProducto,
        dataGeneral: dataProductoGeneral[0],
        dataAtributos: dataProductoAtributos || [],
        dataMultimedia:  dataProductoMultimedia || []
      }
      dispatch({
        type: GET_PRODUCT_DATA,
        selectedProducto: fullObjData
      })
    } catch (err) {
      console.error(err.message)
      Swal.fire({
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      setTimeout(() => { location.reload() }, 5000)
    }
  }
}

export const updateProductoGeneral = (productoId, data) => {
  return async (dispatch) => {
    try {
      const id = parseInt(productoId)
      const filter = JSON.stringify({
        where: {
          ['productoId']: { eq: `${id}` }
        }
      })
      const dataGeneral = {
        descripcion: data.descripcion,
        descripcionLarga: data.descripcionLarga,
        ean: data.ean,
        estadoReferencia: data.estadoReferencia,
        id: data.id,
        marca: data.marca,
        palabrasClave: data.palabrasClave,
        productoId: data.productoId,
        sku: data.sku,
        titulo: data.titulo,
        GLN: data.GLN || "",
        formatoRP: data.formatoRP,
        color: data.color,
        dimensiones: data.dimensiones || ""
      }
      const { data: dataProductoGeneral } = await apiGeneralProducto.productoGeneralControllerFind(filter)
      // Si no viene data es que es la primera vez entonces creamos
      if (dataProductoGeneral.length === 0) {
        await apiGeneralProducto.productoGeneralControllerCreate({ ...dataGeneral, productoId })
      } else { // Sino editamos mediante la id que viene en posición 0
        await apiGeneralProducto.productoGeneralControllerUpdateById(dataProductoGeneral[0].id, dataGeneral)
      }
      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateProductoAtributos = (productoId, atributos, atributosValues, unidad) => {
  return async (dispatch) => {
    try {
      atributos.forEach(async atributo => {
        //Dispatcheamos sólo si tiene valor
        if (atributosValues[atributo.nombre]) {
          if (atributo.productoId) {
            // Atributo existente -> editamos
            const finalAttObj = {
              productoId,
              atributoId: atributo.id,
              nombre: atributo.nombre,
              valor: atributosValues[atributo.nombre],
              ordenEnGrupo: atributo.ordenEnGrupo || "0",
              unidad: unidad[atributo.nombre]
            }
            await apiAtributosProducto.productoAtributosControllerUpdateById(atributo.id, finalAttObj)
          } else {
            // Nuevo atributo -> creamos
            const finalAttObj = {
              productoId,
              atributoId: atributo.id,
              nombre: atributo.nombre,
              valor: atributosValues[atributo.nombre]
            }
            await apiAtributosProducto.productoAtributosControllerCreate(finalAttObj)
          }
        }
      })

      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}


export const updateProductoMultimedias = (productoId, multimedias) => {
  return async (dispatch) => {
      multimedias.forEach(async multimedia => {
        const finalMultObj = {
          productoId,
          tipo: multimedia.tipo,
          nombre: multimedia.nombre,
          objetivo: multimedia.objetivo,
          formato: multimedia.formato,
          tagAecoc: multimedia.tagAecoc,
          principalSN: multimedia.principalSN,
          publicoSN: multimedia.publicoSN
        }
        if (multimedia.id) {
          // Multimedia existente -> editamos
          try {
            await apiMultimediaProducto.productoMultimediaControllerUpdateById(multimedia.id, finalMultObj)
          } catch (err) { console.error('error al editar', err) }
        } else {
          // Nuevo multimedia -> creamos
          try {
          await apiMultimediaProducto.productoMultimediaControllerCreate(finalMultObj)
          } catch (err) { console.error('error al crear', err) }
        }
      })

      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
  }
}

export const deleteProductoAtributoById = (attId) => {
  return async (dispatch) => {
    try {
      const id = parseInt(attId)
      await apiAtributosProducto.productoAtributosControllerDeleteById(id)
      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteProductoMultimediaById = (multClave, prodId) => {
  return async (dispatch) => {
    try {
      const filter = JSON.stringify({
        where: {
          ['productoId']: { eq: `${prodId}` }
        }
      })
      const {data: productosMultimedia} = await apiMultimediaProducto.productoMultimediaControllerFind(filter)
      const prodMultimedia = productosMultimedia.find(el => el.nombre.replaceAll("_", " ").toLowerCase() == multClave.toLowerCase())
      await apiMultimediaProducto.productoMultimediaControllerDeleteById(prodMultimedia.id)
      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getData = params => {
  return async (dispatch, getState) => {
    try {
      const empresaId = getState().layout.selectedEmpresaId
      const { page = 1, perPage = 10, sortBy = "", q = "", search, searchInputsNombre, searchInputsFamilia, searchInputsCategorias, searchInputsFinalizado } = params
      const filter = {
        offset: (page - 1) * perPage,
        limit: perPage,
        skip: ((page - 1) * perPage),
        order: sortBy || "nombre ASC",
        where: {
          ['empresaId']: { eq: `${empresaId}` },
          ['or']: [
            { ['nombre']: { like: `%${q}%`, options: 'i' } },
            { ['categorias']: { like: `%${q}%`, options: 'i' } }
          ]
        }
      }

      if (search == true) {

        filter.where = {
          ['empresaId']: { eq: `${empresaId}` },
          ['or']: [
            { ['nombre']: { like: `%${searchInputsNombre}%`, options: 'i' } },
            { ['categorias']: { like: `%${searchInputsCategorias}%`, options: 'i' } },
            { ['finalizado']: { like: `%${searchInputsFinalizado}%`, options: 'i' } }
          ]
        }
      }
      const { data } = await apiProductos.productosControllerFind(JSON.stringify(filter))
      const { data: allData } = await apiProductos.productosControllerFind()
      const { data: dataCount } = await apiProductos.productosControllerCount(JSON.stringify(filter.where))
      const { data: dataAtt } = await apiAtributos.atributosControllerFind()
      const { data: dataGeneral } = await apiGeneralProducto.productoGeneralControllerFind()
      const { data: dataCategorias } = await apiCategorias.categoriasControllerFind()
      // console.log(dataCount, data)
      dispatch({
        type: GET_DATA,
        allData,
        data,
        total: dataCount.count || 0,
        atributos: dataAtt,
        general: dataGeneral,
        categorias: dataCategorias,
        params
      })

    } catch (err) {
      console.error(err.message)
    }

  }
}

export const updateOrdenAtributo = (id, atributo) => {
  return async (dispatch) => {
    try {
      await apiAtributos.atributosControllerUpdateById(id, atributo)
      return dispatch({
        type: UPDATE_ATRIBUTO
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateFullProducto = (data) => {
  return async (dispatch) => {
    try {
      const { 
        productoId: id, 
        nombre: newNombre, 
        categorias: newCategorias, 
        valoresGenerales: generalValues, 
        atributosProducto: atributos, 
        multimedias: multimediaProducto, 
        atributosValues,
        Finalizado, 
        ordenAtributos, 
        unidad, 
        enviarAecoc } = data
      
      // const pesoNeto = atributos.find(el => el.nombre == "Peso neto")
      // const pesoBruto = atributos.find(el => el.nombre == "Peso bruto")
      // const volumen = atributos.find(el => el.nombre == "Volumen")
      // let attSincro = ""
      // attSincro = attSincro.concat(pesoNeto == undefined ? "0" : pesoNeto.valor).concat(":")
      // attSincro = attSincro.concat(pesoBruto == undefined ? "0" : pesoBruto.valor).concat(":")
      // attSincro = attSincro.concat(volumen == undefined ? "0" : volumen.valor)
      //await axios.post(`${devuelveBasePath()}/insertItem/${id}/${attSincro}`)

      // SECCION PRIMARIA TABLA PRODUCTOS
      const objPrimario = {
        nombre: newNombre,
        categorias: newCategorias,
        finalizado: Finalizado,
        enviarAecoc,
        ordenAtributos
      }
      await apiProductos.productosControllerUpdateById(id, objPrimario)
      // SECCION GENERAL
      await dispatch(updateProductoGeneral(id, generalValues))
      // SECCION ATRIBUTOS
      await dispatch(updateProductoAtributos(id, atributos, atributosValues, unidad))
      // SECCION MULTIMEDIA
      await dispatch(updateProductoMultimedias(id, multimediaProducto))
      displaySuccessMsg("Producto actualizado correctamente")
      return dispatch({
        type: UPDATE_PRODUCTO_DATA
      })
    } catch (err) {
      displayErrorMsg("Error actualizando el producto")
      console.error(err.message)
    }
  }
}
