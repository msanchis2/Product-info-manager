/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import { displaySuccessMsg, selectThemeColors, getUsableFilesUrl, devuelveBasePath } from '@src/utility/Utils'
import { Card, CardBody, Row, Col, Form, Input, InputGroup, CustomInput, Button } from 'reactstrap'
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { handleImageUploadPrincipal, handleImageUpload, getProductById, deleteProductoMultimediaById, updateFullProducto, generarNuevaCategoria, generarDescripcionIA } from '../store/actions'
import { Trash, FileText, AlertOctagon, ChevronDown, ChevronUp } from 'react-feather'
import Swal from 'sweetalert2'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from "draftjs-to-html"
// imports para Can
import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'
// ** Modal Confirmacion
import Modal from '@src/components/modal-confirm'
// Traducciones
import { FormattedMessage, useIntl } from 'react-intl'
//JSzip
import JSZip from "jszip"
import JSZipUtils from "jszip-utils"
import FileSaver from 'file-saver'

const EditCard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useAbility(AbilityContext)
  const intl = useIntl()
  //store
  const store = useSelector(state => state.productos)
  const selectedProducto = store.selectedProducto
  //Producto
  const [nombre, setNombre] = useState({})
  const [imagenPrincipalUrl, setImagenPrincipalUrl] = useState({})
  const [Finalizado, setFinalizado] = useState([])
  const [enviarAecoc, setEnviarAecoc] = useState([])
  //Producto general
  const [generalValues, setGeneralValues] = useState({})
  const [formatoRP, setFormatoRP] = useState("")
  const [GLN, setGLN] = useState("")
  const [marca, setMarca] = useState("")
  const [color, setColor] = useState("")
  const [situacion, setSituacion] = useState("")
  const [ean, setEan] = useState("")
  const [palabras, setPalabras] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [dimensiones, setDimensiones] = useState("")
  const [titulo, setTitulo] = useState("")
  //Views
  const [AtributosView, setAtributosView] = useState(["none"])
  const [MultimediaView, setMultimediaView] = useState(["none"])
  //Multimedias
  const [multimedias, setMultimedias] = useState([])
  const [todosMultimedia, setTodosMultimedia] = useState([])
  const [checkTodos, setCheckTodos] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [toDelete, setToDelete] = useState(0)
  const toggleModal = () => setModalOpen(!modalOpen)
  //Atributos
  const [atributos, setAtributos] = useState([])
  const [atributosValues, setAtributosValues] = useState({})
  const [ordenAtributos, setOrdenAtributos] = useState([])
  const [atributosPorGrupo, setAtributosPorGrupo] = useState([])
  const [unidad, setUnidad] = useState({})
  //Otros
  const [categorias, setCategorias] = useState('')
  const [categoriaOriginal, setCategoriaOriginal] = useState('')
  //Edit o view
  const isView = location.pathname.includes('view')

  const convertContent = (text) => {
    const contentBlock = htmlToDraft(text)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
  const [content, setContent] = useState(convertContent("<p>Escriba <strong>aquí</strong> <u>su</u> <em>descripción</em>.</p>"))

  //UseEffect general

  useEffect(() => {
    if (isView) {
      const inputs = document.getElementsByTagName('input')
      const selects = document.getElementsByTagName('select')
      const buttons = Array.from(document.getElementsByTagName('button')).filter(el => el.id != 'download' && el.id != "atras")
      const allinputs = [...inputs, ...selects, ...buttons]
      allinputs.forEach(el => {
        el.setAttribute('disabled', true)
      })
    } else {
      if (!ability.can("Productos", "PIM", "Actualizar")) {
        history.go(-1)
      }
    }
  }, [isView, ordenAtributos, multimedias])

  useEffect(() => {
    if (generalValues.formatoRP != null) setFormatoRP(generalValues.formatoRP)
    if (generalValues.GLN != null) setGLN(generalValues.GLN || '')
    if (generalValues.marca != null) setMarca(generalValues.marca)
    if (generalValues.estadoReferencia != null) setSituacion(generalValues.estadoReferencia)
    if (generalValues.ean != null) setEan(generalValues.ean)
    if (generalValues.palabrasClave != null) setPalabras(generalValues.palabrasClave)
    if (generalValues.descripcion != null) setDescripcion(generalValues.descripcion)
    if (generalValues.dimensiones != null) setDimensiones(generalValues.dimensiones)
    if (generalValues.titulo != null) setTitulo(generalValues.titulo)
    if (generalValues.color != null) setColor(generalValues.color)
  }, [generalValues])

  // Cargado de datos 

  useEffect(() => {
    if (Object.keys(selectedProducto).length > 0) {
      if (selectedProducto.dataGeneral != undefined && selectedProducto.dataGeneral != null) { 
        setGeneralValues(selectedProducto.dataGeneral) 
        setContent(convertContent(selectedProducto.dataGeneral?.descripcionLarga || "<p>Escriba <strong>aquí</strong> <u>su</u> <em>descripción</em>.</p>"))
        const existingAttsValuesObj = {}
        const existingAttsUnidadObj = {}
        selectedProducto?.dataAtributos?.forEach(att => {
          existingAttsValuesObj[att.nombre] = att.valor || ""
          existingAttsUnidadObj[att.nombre] = att.unidad || ""
        })
        setAtributosValues(existingAttsValuesObj)
        setUnidad(existingAttsUnidadObj)
      }
      setAtributos(selectedProducto.dataAtributos)
      setFinalizado(selectedProducto.finalizado)
      setEnviarAecoc(selectedProducto.enviarAecoc || "N")
      setOrdenAtributos(selectedProducto.ordenAtributos || "")
      setNombre(selectedProducto.nombre)
      setImagenPrincipalUrl(getUsableFilesUrl(store.selectedProducto.imagen)) 
    }
  }, [selectedProducto])

  //UseEffect Categorias

  useEffect(() => {
    setCategorias(selectedProducto.categorias)
    setCategoriaOriginal(selectedProducto.categorias)
  }, [selectedProducto.categorias])

  //useEffect Multimedia

  useEffect(() => {
    setMultimedias(selectedProducto.dataMultimedia)
  }, [selectedProducto.dataMultimedia])

  useEffect(() => {
    setTodosMultimedia(store.multimedias)
  }, [store.multimedias])

  const checkMuestraFicherosMultimedia = () => {
    setCheckTodos(!checkTodos)
  }

  const handleFiltroTipo = (target) => {
    if (target.value == "") {
      setTodosMultimedia(store.multimedias)
    } else {
      const filtrados = store.multimedias.filter(el => el.tipo == target.value)
      setTodosMultimedia(filtrados)
    }
  }

  //useEffect Atributos

  const getNombreGrupoAtt = (idG) => {
    const grupos = store.gruposAtributos || []
    const nombre = grupos.find(el => el.id == idG)
    return nombre == undefined ?  "" : nombre.nombre 
  }

  const ordenar = (attGrupo) => {
    if (ordenAtributos.includes(',')) {
      const orden = ordenAtributos.split(',')
      const attGrupoOrdenado = []
      const claves = Object.keys(attGrupo)
      orden.forEach(el => {
        attGrupoOrdenado.push(attGrupo[el])
        if (claves.indexOf(el) != -1) { claves.splice(claves.indexOf(el), 1) } 
      })
      if (claves.length > 0) {
        claves.forEach(el => {
          attGrupoOrdenado.push(attGrupo[el])
        })
      }
      return attGrupoOrdenado 
    } else return attGrupo
  }

  const atributoEnEmpresa = (idGrupo) => {
    const item = store.gruposAtributos.find(el => el.id == idGrupo)
    return item != undefined
  }

  useEffect(() => {
    const atributosData = []
    let atributo, grupoOrdenado, ordenA, ordenB
    const attGrupo = []
    const attGrupoOrdenado = []

    for (let i = 0; i < atributos.length; i++) {
      atributo = store.atributos.find(el => el.codigo == atributos[i].atributoId)
      if (atributo != undefined && atributoEnEmpresa(atributo.grupoAtributosId)) {
        atributo.nombreGrupo = getNombreGrupoAtt(atributo.grupoAtributosId)
        atributo.ordenEnGrupo = atributos[i].ordenEnGrupo || 0
        atributosData.push(Object.assign({}, atributos[i], atributo))
      }
    }
    
    atributosData.forEach(att => {
      if (attGrupo[att.grupoAtributosId] == undefined) { attGrupo[att.grupoAtributosId] = [] }
      attGrupo[att.grupoAtributosId].push(att)
    })
    
    attGrupo.forEach(grupo => {
      grupoOrdenado = grupo.sort(function (a, b) {
        ordenA = a.ordenEnGrupo
        ordenB = b.ordenEnGrupo
        if (ordenA == undefined || ordenA == "" || ordenA == null) { ordenA = 0 }
        if (ordenB == undefined || ordenB == "" || ordenB == null) { ordenB = 0 }
        return parseInt(ordenA) - parseInt(ordenB)
      })
      attGrupoOrdenado[attGrupo.indexOf(grupo)] = grupoOrdenado
    })

    setAtributosPorGrupo(ordenar(attGrupoOrdenado))
  }, [atributos])


  // Options para alimentar selects

  function getOrdenOptions(idGrupo) {
    const options = []
    let cont = 1
    for (let i = 0; i < atributosPorGrupo.length; i++) {
      if (atributosPorGrupo[i] != undefined) {
        options.push({ label: cont, value: { pos: cont, grupo: idGrupo } })
        cont++
      }
    }
    return options
  }

  function getAtributosOptions(valores, campo) {
    if (valores != undefined && valores != null && valores != "") {
      const opciones = []
      valores.split(',').forEach(el => {
        opciones.push({ value: { val: el, name: campo }, label: el })
      })
      return opciones
    } else { return [] }
  }

  const getMultimediaOptionsFilter = () => {
    const types = ['Documento', 'Imagen', 'Video']
    const options = [{value: '', label: 'Selecciona...'}]
    types.map(mult => {
      options.push({ value: mult, label: mult }) 
    })
    return options
  }

  const getCategoriaOptions = () => {
    if (store.categorias != undefined) {
      return store.categorias.map(cat => {
        return { value: `${cat.codigo}`, label: `${cat.nombre}` }
      })
    }
  }

  const getGLNOptions = () => {
   const empresas = store.empresas
   const options = []
   if (empresas != null && empresas != undefined) {
    empresas.forEach(el => {
      options.push({label: el.codigo.concat(" ").concat(el.GLN), value: el.GLN})
    })
  }
   return options
  }

  const getFormatoOptions = () => {
    return [
      {label: 'Regular', value: 'R'},
      {label: 'Promocion', value: 'P'}
    ]
  }

  const getSituacionOptions = () => {
    const options = []
    if (store.situaciones == undefined) { return options }
    store.situaciones.forEach(el => {
      options.push({label: el.nombre, value: el.nombre})
    })
    return options
  }

  const getMarcaOptions = () => {
    const options = []
    if (store.marcas == undefined) { return options }
      store.marcas.forEach(el => {
        options.push({label: el.nombre, value: el.nombre})
      })
    return options
  }

  //Generar nuevo ean desde NAV
  const generarEan = () => {
    Swal.fire({
      text: 'Te damos la posibilidad de crear un proceso para generar EANS automaticos'
    })
    // if (categorias != '') {
    //   const nuevoEan = generarEAN(categorias)
    //   nuevoEan.then(res => { setEan(res.toString()) })
    // } else {
    //   Swal.fire({
    //     title: `${intl.formatMessage({ id: `Categoría no encontrada` })}`,
    //     text: `${intl.formatMessage({ id: `Seleccione categoría para continuar` })}`,
    //     icon: 'error'
    //   })
    // }
  }

  //Descargar zip de multimedias
  const descargar_multimedia = () => {
    const botonDescarga = document.querySelector('#download')
    botonDescarga.setAttribute('disabled', true)
    botonDescarga.removeChild(botonDescarga.firstChild)
    botonDescarga.appendChild(document.createTextNode('Descargando'))
    const zip = new JSZip()
    let nombrefichero, url, numFicheros = 0
    const enlaces = []
    multimedias.forEach(element => {
      if (element.tipo != "video" && element.fichero != "") {
        url = 'https://pim.dynamizatic.es:7002/'
        enlaces.push(url.concat('', element.fichero))
      }
    })
    const numEnlaces = enlaces.length
    enlaces.forEach(element => JSZipUtils.getBinaryContent(element, function (err, data) {
      if (err) {
        // Recojo el nombre de la foto, para mostrar por el swal cual es la que falla
        const nombreFoto = selectedProducto.nombre.concat('-').concat(element.split('/').slice(-1).pop()) 
        Swal.fire({
          title: `${intl.formatMessage({ id: `Error en la descarga de` })}`,
          text: `${nombreFoto}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
      nombrefichero = selectedProducto.nombre.concat('-').concat(element.split('/').slice(-1).pop()) 
      if (!err) {
        zip.file(nombrefichero, data, { binary: true })
      }
      numFicheros++
      if (numFicheros == numEnlaces) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          FileSaver.saveAs(content, 'multimedia.zip')
          botonDescarga.removeAttribute('disabled')
          botonDescarga.removeChild(botonDescarga.firstChild)
          botonDescarga.appendChild(document.createTextNode('Descargar multimedia'))
        })
      }
    })
    )
  }

  //Handle formularios

  const handleImagenPrincipalChange = async ({ target }) => {
    //La autoguarda en el servidor ya que va distinta a los campos y no necesita actualizar valor en tabla salvo en la creación
    setImagenPrincipalUrl(URL.createObjectURL(target.files[0]))
    await handleImageUploadPrincipal(selectedProducto.nombre, "imagen_principal", target.files[0], selectedProducto) 
    return displaySuccessMsg("Imagen principal correctamente actualizada, refresque página para ver los cambios")
  }

  const handleSkuChange = ({ target }) => {
    setGeneralValues(prevState => {
      return {
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleAtributosChange = ({ target }) => {
    setAtributosValues(prevState => {
      return {
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleUnidadChange = ({ target }) => {
    setUnidad(prevState => {
      return {
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleAtributosChangeDesplegable = (target) => {
    atributosValues[target.value.name] = target.value.val
  }

  const handleGLNChange = (target) => {
    setGLN(target.value)
    generalValues.GLN = target.value.toString()
  }

  const handleEanChange = ({target}) => { setEan(target.value) }
  const handleFormatoChange = (target) => { setFormatoRP(target.value) }
  const handleDimensionesChange = ({target}) => { setDimensiones(target.value) }
  const handleMarcaChange = (target) => { setMarca(target.value) }
  const handleSituacionChange = (target) => { setSituacion(target.value) }
  const handlePalabrasChange = ({target}) => { setPalabras(target.value) }
  const handleColorChange = ({target}) => { setColor(target.value) }
  const handleDescripcionChange = ({target}) => { setDescripcion(target.value) }
  const handleTituloChange = ({ target }) => { setTitulo(target.value) }

  const handleMultimediaChange = ({ target }) => {
    dispatch(handleImageUpload(selectedProducto.nombre, target.id, target.files[0], selectedProducto.id))
    const nuevaUrl = getUsableFilesUrl(URL.createObjectURL(target.files[0]))
    document.getElementById('img-'.concat(target.id)).src = nuevaUrl.replace("http://pim.dynamizatic.es:7005/", "")
    setMultimedias(multimedias.map(m => (m.clave === target.name.replaceAll("_", " ") ? { ...m, fichero: target.type === "text" ? target.value : target.files[0] } : m)))
  }

  const handleMultimediaDelete = (multimedia) => {
    toggleModal()
    setToDelete(multimedia.clave)
  }

  const multimediaDelete = () => {
    if (toDelete) {
      const imagen = document.getElementById(toDelete)
      if (imagen != undefined) { 
        imagen.parentNode.removeChild(imagen)
        // imagen.classList.remove("d-flex")
        // imagen.style.display = 'none' 
      }
      dispatch(deleteProductoMultimediaById(toDelete, selectedProducto.id))
      // Elimino del  array el multimedia  seleccionado
      for (let i = 0; i < multimedias.length; i++) {
        if (multimedias[i].clave === toDelete) {
          multimedias.splice(i, 1)
        }
      }
      setMultimedias(multimedias.filter(m => m.clave !== toDelete))
      Swal.fire({
        title: `${intl.formatMessage({ id: `Multimedia eliminado correctamente` })}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      setModalOpen(false)
    } else {
      setMultimedias(multimedias.filter(m => m.clave !== toDelete))
    }
  }

  const handleOrdenAtributoChange = (attId, {target}) => {
    const value = target.value
    const newAtributos = atributos
    if (value > 0) {
      const index = newAtributos.map((e) => { return e.atributoId }).indexOf(attId)
      newAtributos[index].ordenEnGrupo =  value
    }
    setAtributos(newAtributos)
  }

  const handleCambioOrden = (target) => {
    const posicion = target.value.pos
    const grupo = target.value.grupo
    const nuevoOrden = ordenAtributos.split(',')
    const aux = nuevoOrden[posicion - 1]
    const posicionAnterior = nuevoOrden.indexOf(grupo.toString())
    nuevoOrden[posicion - 1] = grupo.toString()
    nuevoOrden[posicionAnterior] = aux
    setOrdenAtributos(nuevoOrden.toString(','))
  }

  const handleFormatoMultimediaChange = (valor, id) => {
    id = id.replaceAll("_", " ")
    if (multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()) != undefined) {
      multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()).formato = valor
    } 
  }

  const handleTagChange = (target) => {
    const id = target.target.id.split("-")[1].replaceAll("_", " ")
    if (multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()) != undefined) {
      multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()).tagAecoc = target.target.value
    } 
  }

  const handlePrincipalChange = ({ target }) => {
    const id = target.id.split("-")[1].replaceAll("_", " ")
    const val = target.checked ? 'S' : 'N'
    if (multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()) != undefined) {
      multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()).principalSN = val
    } 
  }
  const handlePublicoChange = ({ target }) => {
    const id = target.id.split("-")[1].replaceAll("_", " ")
    const val = target.checked ? 'S' : 'N'
    if (multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase() != undefined)) {
      multimedias.find(el => el.nombre.toLowerCase() == id.toLowerCase()).publicoSN = val
    }
  }

  const handleLupa = ({ target }) =>  {
    const id = target.id.split("-")[1]
    const detalle = 'detalle-'.concat(id)
    const bloqueDetalle = document.getElementById(detalle)
    const estado = bloqueDetalle.style.display
    estado == 'none' ? bloqueDetalle.style.display = 'flex' : bloqueDetalle.style.display = 'none'
  }

  //Mostrar segun vista o editar
  const mostrarEnVer = () => {
    return isView ? 'none' : 'flex'
  }

  //Atributos
  function getOrderValor(idGrupo) {
    if (ordenAtributos != undefined) {
      const orden = ordenAtributos.split(',')
      return orden.indexOf(idGrupo.toString()) + 1
    }
  }

  //Multimedias

  const mostrarLupa = (m) => {
    const bbddMultimedia = selectedProducto.dataMultimedia.find(multimedia => multimedia.nombre.toLowerCase() === m.clave.toLowerCase())
    if (!bbddMultimedia || bbddMultimedia.fichero == null || bbddMultimedia.fichero == "" || bbddMultimedia.fichero == undefined) { 
      return 'none'
    }
    return 'block'
  }

  const renderMultimediaExistente = (url, tipo, nombre) => {
    if (tipo.toLowerCase() == "imagen") {
      if (!url) { return <img src={`${devuelveBasePath()}/multimedia/no-image.jpg`} id={`img-${nombre}`} width='100px' className='mr-1'/> }
      return (
        <a href={url} target='_blank'>
          <img src={url} id={`img-${nombre}`} style={{ maxHeight: "100px", maxWidth: "100%" }} className='img-fluid product-img rounded justify-content-center'/>
        </a>
      )
    } else {
      if (!url) { return <AlertOctagon size={85} /> }
      return (
        <div className='text-md text-truncate align-self-center' style={{ height: "100px" }}>
          <span className="d-flex">
            <a href={url} target="_blank"> 
              <FileText size={85}/> 
            </a> 
          </span>
        </div>
      )
    }
  }

  const getIdMultimedia = (m) => {
    return m.clave != undefined ? m.clave.replaceAll(" ", "_") : m.nombre.replaceAll(" ", "_")
  }

  const mostrarTexto = (tipoCampo) => {
    return tipoCampo == 'O' ? 'none' : 'flex'
  }

  const mostrarDesplegable = (tipoCampo) => {
    return tipoCampo == 'O' ? 'flex' : 'none'
  }

  const mostrarUnidades = (unidadSN) => {
    return unidadSN == 'S' ? 'flex' : 'none'
  }

  const longitudCampo = (unidadSN) => {
    return unidadSN == 'S' ? '300px' : '430px'
  }

  const marcado = (value) => {
    return value == "S"
  }

  const timer = () => {
    Swal.fire({
      timer: 10000,
      timerProgressBar: true,
      text: 'Las descripciones por IA son generadas en base a los datos introducidos.\n Es posible que no sean exactas o concretas si no se disponen de los datos necesarios',
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  const generarDescripcion = () => {
    timer()
    const categoriaN = store.categorias.find(el => el.codigo == categorias)  
    const peticion = generarDescripcionIA(generalValues?.sku, 20, categoriaN.nombre, generalValues.marca, generalValues?.color)
    peticion.then(response => {
      const nuevaDescripcion = response.choices[0].text
      setDescripcion(nuevaDescripcion.replaceAll('\n', ''))
    })
  }

  const generarDescripcionLarga = () => {
    timer()
    const categoriaN = store.categorias.find(el => el.codigo == categorias)  
    const peticion = generarDescripcionIA(generalValues?.sku, 80, categoriaN.nombre, generalValues.marca, generalValues?.color)
    peticion.then(response => {
      const nuevaDescripcion = response.choices[0].text
      setContent(convertContent(nuevaDescripcion.replaceAll('\n', '')))
    })
  }

  //Submit form
  function handleSubmit(ev) {
    ev.preventDefault()
    let contentTextEditorHtml = draftToHtml(convertToRaw(content.getCurrentContent()))
    contentTextEditorHtml = contentTextEditorHtml.replaceAll("&nbsp", "")
    const productoId = selectedProducto.id
    const valoresGenerales = { 
      sku: generalValues.sku || "",
      GLN: generalValues.GLN,
      ean,
      titulo,
      color,
      marca,
      dimensiones,
      descripcion,
      estadoReferencia: situacion,
      palabrasClave: palabras,
      formatoRP,
      descripcionLarga: contentTextEditorHtml 
    }
    if (categorias != categoriaOriginal) { 
      dispatch(generarNuevaCategoria(productoId, categorias)) 
      setOrdenAtributos("")
    }
    dispatch(getProductById(productoId))

    const atributosProducto = []
    atributos.forEach(el => {
      if (el.ordenEnGrupo == null || el.ordenEnGrupo == undefined) { el.ordenEnGrupo = "" }
      el.ordenEnGrupo = el.ordenEnGrupo.toString()
      atributosProducto.push(el)
    })

    dispatch(updateFullProducto({ productoId, nombre, categorias, valoresGenerales, atributosProducto, atributosValues, multimedias, Finalizado, ordenAtributos, unidad, enviarAecoc }))
    history.go(-1)
  }

  if (Object.keys(selectedProducto).length === 0) return null
  return (
    <Fragment>
      <Form>
        <div className='d-flex'>
          <div>
            <Button color='secondary' className='mb-1 mr-1' outline tag={Link} to='/' style={{width: '100px'}}>
              <FormattedMessage id="Atras"></FormattedMessage>
            </Button>
          </div>
          <Can I="Productos" a="PIM" field="Actualizar">
            <div className='d-flex' style={{display: mostrarEnVer()}}>
              <Button type="submit" className='mb-1' color='primary' tag='button' onClick={handleSubmit} style={{display: mostrarEnVer()}}>
                <FormattedMessage id="Guardar cambios"></FormattedMessage>
              </Button>
            </div>
          </Can>
        </div>
        <Card className='invoice-preview-card mb-0 p-1'>
          <div id='cardProducto'>
            <CardBody className='invoice-padding pt-2'>
              <Row className='row-bill-to invoice-spacing align-items-center'>
                <Col className='col-bill-to pl-2' lg='2'>
                    <img style={{ maxWidth: "150px", maxHeight: "150px" }} className='img-fluid product-img rounded' src={imagenPrincipalUrl}/>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='3'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Nombre"></FormattedMessage>:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="nombre"
                          name="nombre"
                          className='invoice-edit-input'
                          value={nombre || ""}
                          required={true}
                          placeholder={`${intl.formatMessage({ id: 'Nombre de producto' })}`}
                          onChange={(e) => { setNombre(e.target.value) }}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='2'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Imagen Principal"></FormattedMessage>:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <CustomInput
                          type="file"
                          id="imagenPrincipal"
                          name="imagenPrincipal"
                          label={`${intl.formatMessage({ id: 'Selecciona imagen' })}`}
                          onChange={handleImagenPrincipalChange}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='3'>
                <h6 className='invoice-to-title'><FormattedMessage id="Categoría"></FormattedMessage>:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <Select
                        className='react-select'
                        classNamePrefix='select'
                        id='categoria'
                        name="categoria"
                        placeholder={`${intl.formatMessage({ id: 'Seleccione categoría' })}`}
                        defaultValue={getCategoriaOptions() && getCategoriaOptions().find(cat => cat.value === selectedProducto.categorias)}
                        value={getCategoriaOptions() && getCategoriaOptions().find(cat => cat.value === categorias)}
                        options={getCategoriaOptions()}
                        theme={selectThemeColors}
                        onChange={(e) => setCategorias(e.value)}
                        maxMenuHeight={170}
                      />
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pt-1 pl-1' lg='2'>
                  <CustomInput
                    type='checkbox'
                    className='custom-control-Primary mb-1'
                    id="Finalizado_Check"
                    checked={marcado(Finalizado)}
                    label={`${intl.formatMessage({ id: 'Finalizado Producto' })}`}
                    inline
                    onClick={() => (Finalizado == "N" ? setFinalizado("S") : setFinalizado("N"))}
                  />
                  <CustomInput
                    type='checkbox'
                    className='custom-control-Primary'
                    id="aecoc_Check"
                    checked={marcado(enviarAecoc)}
                    label={`${intl.formatMessage({ id: 'Enviar AECOC' })}`}
                    inline
                    onClick={() => (enviarAecoc == "N" ? setEnviarAecoc("S") : setEnviarAecoc("N"))}
                  />
                </Col>
              </Row>
            </CardBody>
            <CardBody className='invoice-padding'>
              <Row className='row-bill-to invoice-spacing align-middle flex'>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'>SKU:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="sku"
                          name="sku"
                          className='invoice-edit-input'
                          value={generalValues?.sku || ""}
                          placeholder='SKU'
                          onChange={handleSkuChange}
                          required
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='3'>
                  <h6 className='invoice-to-title'>EAN:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="ean"
                          name="ean"
                          className='invoice-edit-input'
                          value={ean}
                          placeholder='EAN'
                          onChange={(e) => handleEanChange(e)}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0' lg='1'>
                  <Button block color='secondary' tag='button' onClick={generarEan} style={{marginTop: '37px'}}>
                    <FormattedMessage id="Crear"></FormattedMessage>
                  </Button>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Marca"></FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group'>
                        <div style={{width: '600px'}}>
                          <Select
                            id="marca"
                            name="marca"
                            className='invoice-edit-input'
                            options={getMarcaOptions()}
                            value={getMarcaOptions() && getMarcaOptions().find(m => m.label == marca)}
                            onChange={handleMarcaChange}
                          />
                        </div>
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Estado Referencia">:</FormattedMessage> </h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group'>
                        <div style={{width: '600px'}}>
                          <Select
                            id="estadoReferencia"
                            name="estadoReferencia"
                            className='invoice-edit-input'
                            options={getSituacionOptions()}
                            value={getSituacionOptions().find(m => m.label == situacion)}
                            onChange={handleSituacionChange}
                          />
                        </div>
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Título">:</FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="titulo"
                          name="titulo"
                          className='invoice-edit-input'
                          value={titulo}
                          placeholder={`${intl.formatMessage({ id: 'Título' })}`}
                          onChange={handleTituloChange}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='3'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Descripción">:</FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="descripcion"
                          name="descripcion"
                          className='invoice-edit-input'
                          value={descripcion}
                          placeholder={`${intl.formatMessage({ id: 'Descripción corta' })}`}
                          onChange={(e) => handleDescripcionChange(e)}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0' lg='1'>
                  <Button
                    type='button'
                    block 
                    color='secondary'
                    onClick={() => { generarDescripcion() }} 
                    style={{marginTop: '37px'}}
                  >IA</Button>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Palabras clave">:</FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="palabrasClave"
                          name="palabrasClave"
                          className='invoice-edit-input'
                          value={palabras}
                          placeholder={`${intl.formatMessage({ id: 'Separadas por ;' })}`}
                          onChange={(e) => handlePalabrasChange(e)}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Dimensiones">:</FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <Input
                          type='text'
                          id="dimensiones"
                          name="dimensiones"
                          className='invoice-edit-input'
                          value={dimensiones}
                          placeholder={'660 x 370 x 213 mm'}
                          onChange={(e) => handleDimensionesChange(e)}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Color">:</FormattedMessage></h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <InputGroup className='input-group-merge invoice-edit-input-group'>
                        <Input
                          type='text'
                          id="color"
                          name="color"
                          className='invoice-edit-input'
                          value={color}
                          placeholder={'Inox'}
                          onChange={(e) => handleColorChange(e)}
                        />
                      </InputGroup>
                    </Fragment>
                  </div>
                </Col>

                <Col className='col-bill-to pl-0 pt-1' lg='4'>
                <h6 className='invoice-to-title'>GLN:</h6>
                <div className='invoice-customer'>
                  <Fragment>
                    <InputGroup className='input-group-merge invoice-edit-input-group'>
                      <div style={{width: '600px'}}>
                        <Select
                          id="GLN"
                          name="GLN"
                          className='invoice-edit-input'
                          options={getGLNOptions()}
                          value={getGLNOptions().find(gln => gln.value == GLN)}
                          onChange={handleGLNChange}
                        />
                      </div>
                    </InputGroup>
                  </Fragment>
                </div>
              </Col>
              <Col className='col-bill-to pl-0 pt-1' lg='4'>
                <h6 className='invoice-to-title'><FormattedMessage id="Formato">:</FormattedMessage></h6>
                <div className='invoice-customer'>
                  <Fragment>
                    <InputGroup className='input-group-merge invoice-edit-input-group'>
                      <div style={{width: '600px'}}>
                        <Select
                          id="formato"
                          name="formato"
                          className='invoice-edit-input'
                          options={getFormatoOptions()}
                          value={getFormatoOptions().find(f => f.value == formatoRP)}
                          onChange={handleFormatoChange}
                        />
                      </div>
                    </InputGroup>
                  </Fragment>
                </div>
              </Col>
                <Col className='col-bill-to pl-0 pt-1' lg='12'>
                  <div className='d-flex mt-1 mb-1'>
                    <h6 className='invoice-to-title'><FormattedMessage id="Descripción Larga"></FormattedMessage>:</h6>
                    <Button
                      type='button'
                      block 
                      color='secondary'
                      onClick={() => { generarDescripcionLarga() }} 
                      style={{marginLeft: '20px', width: '100px'}}
                    >IA</Button>
                  </div>
                  <Editor editorState={content} onEditorStateChange={data => setContent(data)} />
                </Col>
              </Row>
            </CardBody>
            <hr className='invoice-spacing' />
            <Row className='pl-2' onClick={() => (AtributosView == "block" ? setAtributosView("none") : setAtributosView("block"))}>
              <a onClick={() => (AtributosView == "block" ? setAtributosView("none") : setAtributosView("block"))}><h4 className="card-title"><FormattedMessage id="Atributos"></FormattedMessage></h4></a>
              <a className='pl-1'>
                {(AtributosView == "none") && <ChevronDown size={15} onClick={() => (AtributosView == "block" ? setAtributosView("none") : setAtributosView("block"))} />}
                {(AtributosView == "block") && <ChevronUp size={15} onClick={() => (AtributosView == "block" ? setAtributosView("none") : setAtributosView("block"))} />}
              </a>
            </Row>
            <CardBody className='invoice-padding' style={{ display: AtributosView }}>
              <Row className='row-bill-to invoice-spacing align-middle flex'>
                {(atributosPorGrupo != undefined && atributosPorGrupo.length > 0) && atributosPorGrupo.filter(attG => attG != undefined).map(attG => {
                  const idGrupo = attG[0].grupoAtributosId
                  const nGrupo = attG[0].nombreGrupo
                  return (
                    <Row className='pl-5 mb-1 pb-3 w-100' style={{ borderBottom: '1px solid gray' }}>
                      <Row className='mt-3 d-flex w-100'>
                        <h6 className='mt-1 ml-1'>{nGrupo}</h6>
                        <div style={{ width: '180px', display: mostrarEnVer() }}>
                          <Select
                            className='react-select ml-1 selectOrden'
                            classNamePrefix='select'
                            id={idGrupo}
                            name={idGrupo}
                            options={getOrdenOptions(idGrupo)}
                            value={getOrdenOptions(idGrupo).find(e => e.value.pos === getOrderValor(idGrupo))}
                            onChange={handleCambioOrden}
                          />
                        </div>
                      </Row>
                      <hr className='invoice-spacing' />
                      {attG.map(att => {
                        return (
                          <Col className='col-bill-to pl-0 pt-1' lg='4' key={`atributo-${att?.id}-${att?.nombre.split(" ").join("")}`}>
                            <div className='d-flex'>
                              <div style={{ width: '130px', paddingBottom: '5px' }}>
                                <Input
                                  type='number'
                                  id={`orden_${att.codigo}`}
                                  className='invoice-edit-input'
                                  defaultValue={att.ordenEnGrupo || ""}
                                  placeholder={`${intl.formatMessage({ id: 'Nº orden' })}`}
                                  onChange={(e) => { handleOrdenAtributoChange(att.codigo, e) }}
                                />
                              </div>
                              <h6 className='invoice-to-title text-capitalize' style={{ marginLeft: '10px', marginTop: '10px' }}>{att?.nombre}:</h6>
                            </div>
                            <div className='invoice-customer'>
                              <Fragment>
                                <InputGroup>
                                  <div style={{ width: longitudCampo(att?.unidadSN), display: mostrarTexto(att?.tipoCampo) }}>
                                    <Input
                                      type='text'
                                      id={att?.nombre}
                                      name={att?.nombre}
                                      className='invoice-edit-input'
                                      value={atributosValues[att?.nombre] || ""}
                                      placeholder={`${intl.formatMessage({ id: 'Ingrese valor' })}`}
                                      onChange={handleAtributosChange}
                                    />
                                  </div>
                                  <div style={{ display: mostrarDesplegable(att?.tipoCampo) }}>
                                    <div style={{ width: longitudCampo(att?.unidadSN) }}>
                                      <Select
                                        className='react-select'
                                        classNamePrefix='select'
                                        id={att?.nombre}
                                        name={att?.nombre}
                                        options={getAtributosOptions(att?.posiblesValores, att?.nombre)}
                                        placeholder={att?.valor}
                                        theme={selectThemeColors}
                                        onChange={handleAtributosChangeDesplegable}
                                      />
                                    </div>
                                  </div>
                                  <div style={{ width: '100px', display: mostrarUnidades(att?.unidadSN), marginLeft: '5px' }}>
                                    <Input
                                      type='text'
                                      id={'unidad_'.concat(att?.id)}
                                      name={'unidad_'.concat(att?.id)}
                                      className='invoice-edit-input'
                                      placeholder={`${intl.formatMessage({ id: 'Unidad' })}`}
                                      defaultValue={att?.unidad}
                                      onChange={handleUnidadChange}
                                      disabled
                                    />
                                  </div>
                                </InputGroup>
                              </Fragment>
                            </div>
                          </Col>
                        )
                      })}
                    </Row>)

                })
                }
              </Row>
            </CardBody>
            <hr className='invoice-spacing' />
            <Row className='pl-2' onClick={() => (MultimediaView == "block" ? setMultimediaView("none") : setMultimediaView("block"))}>
              <a onClick={() => (MultimediaView == "block" ? setMultimediaView("none") : setMultimediaView("block"))}><h4 className="card-title">
                <FormattedMessage id="Multimedia"></FormattedMessage></h4></a>
              <a className='pl-1'>
                {(MultimediaView == "none") && <ChevronDown size={15} onClick={() => (MultimediaView == "block" ? setMultimediaView("none") : setMultimediaView("block"))} />}
                {(MultimediaView == "block") && <ChevronUp size={15} onClick={() => (MultimediaView == "block" ? setMultimediaView("none") : setMultimediaView("block"))} />}
              </a>
            </Row>
            <CardBody className='invoice-padding' style={{ display: MultimediaView }}>
              <Row className='row-bill-to invoice-spacing align-middle mb-2' style={{ display: mostrarEnVer() }}>
                <Col lg='2'>
                  <CustomInput
                    type='checkbox'
                    id='view_Multiemedia'
                    className='custom-control-Primary mt-1'
                    label='Mostrar todos'
                    onChange={checkMuestraFicherosMultimedia}
                    defaultChecked={false}
                  />
                </Col>
                <Col lg='4'>
                  <Select
                    className='react-select mb-2'
                    classNamePrefix='select'
                    id='tipo'
                    placeholder={`${intl.formatMessage({ id: 'Seleccione tipo de documento' })}`}
                    options={getMultimediaOptionsFilter()}
                    theme={selectThemeColors}
                    onChange={(e) => handleFiltroTipo(e)}
                    maxMenuHeight="90px"
                  />
                </Col>
                <Col lg='4'>
                  <Button onClick={descargar_multimedia} id='download' className='w-100' color='secondary' tag='button'>
                    <FormattedMessage id="Descargar multimedia"></FormattedMessage>
                  </Button>
                </Col>
              </Row>
              <Row className='row-bill-to invoice-spacing align-middle flex mt-3'>
                {(todosMultimedia != null || todosMultimedia != undefined || !todosMultimedia.length) && todosMultimedia?.map(multimedia => {
                  const datosMultimedia = selectedProducto.dataMultimedia.find(m => m.nombre.toLowerCase() == multimedia.clave.toLowerCase())
                  const url = datosMultimedia ? getUsableFilesUrl(datosMultimedia.fichero) : false
                  let multProd = multimedias.find(m => m.nombre.toLowerCase() == multimedia.clave.toLowerCase())
                  if (checkTodos) { multProd = {objetivo: "", formato: "", principalSN: false, publicoSN: false} }
                  if (multProd != undefined) {
                  return (
                    <Col className='col-bill-to p-1 d-flex flex-column align-content-around Elemento_Multimedia' lg='4' id={multimedia.clave} key={`multimedia-${getIdMultimedia(multimedia)}`}>
                      <div className='d-flex flex-row justify-content-center'>
                        <div className="pb-1 d-flex justify-content-center">
                          {renderMultimediaExistente(url, multimedia.tipo, multimedia.clave)}
                        </div>
                        <div className='invoice-customer w-20 ' style={{ width: "65%" }}>
                          <div className='d-flex'>
                            <h6 className='invoice-to-title text-capitalize '>{multimedia.clave}</h6>
                            <a><h6 className='ml-1 lupa' id={`lupa-${getIdMultimedia(multimedia)}`} onClick={handleLupa} style={{display: mostrarLupa(multimedia)}}>🔎</h6></a>
                          </div>
                          <Fragment>
                            {((multimedia.tipo.toLowerCase() == "documento") || (multimedia.tipo.toLowerCase() == "imagen")) ? <InputGroup className='input-group-merge w-14 invoice-edit-input-group disabled '>
                              <CustomInput
                                type="file"
                                id={getIdMultimedia(multimedia)}
                                name={getIdMultimedia(multimedia)}
                                label={`${intl.formatMessage({ id: 'Selecciona' })}`}
                                style={{ width: "100" }}
                                onChange={handleMultimediaChange}
                              />
                              <Button className="mx-1 bg-danger border-danger -z-50" onClick={() => handleMultimediaDelete(multimedia)}><Trash size={15} /></Button>
                            </InputGroup> : <InputGroup className='invoice-edit-input-group disabled'>
                              <Input
                                type='text'
                                id={getIdMultimedia(multimedia)}
                                name={getIdMultimedia(multimedia)}
                                className='invoice-edit-input'
                                value={multimedia.fichero || ""}
                                placeholder={`${intl.formatMessage({ id: 'Ingrese URL' })}`}
                                style={{ width: "100" }}
                                onChange={handleMultimediaChange}
                              />
                              <Button className="mx-1 bg-danger border-danger -z-50" onClick={() => handleMultimediaDelete(multimedia)}><Trash size={15} /></Button>
                              </InputGroup>}
                              <InputGroup className='mb-2' style={{display: 'none'}} id={'detalle-'.concat(getIdMultimedia(multimedia))}>
                                <Col md='10'>
                                  <h6 className='invoice-to-title mt-1'><FormattedMessage id="Formato"></FormattedMessage>:</h6>
                                  <Select
                                    className='react-select mb-1'
                                    classNamePrefix='select'
                                    id={"formato-".concat(getIdMultimedia(multimedia))}
                                    name={"formato-".concat(getIdMultimedia(multimedia))}
                                    placeholder={`${intl.formatMessage({ id: 'Seleccione formato' })}`}
                                    defaultValue={getFormatoOptions().find(el => el.value === multProd.formato)}
                                    options={getFormatoOptions()}
                                    theme={selectThemeColors}
                                    onChange={(e) => { handleFormatoMultimediaChange(e.value, getIdMultimedia(multimedia)) }}
                                  />
                                  <h6 className='invoice-to-title mt-1'><FormattedMessage id="Tag AECOC"></FormattedMessage>:</h6>
                                  <Input
                                    type='text'
                                    id={"tag-".concat(getIdMultimedia(multimedia))}
                                    name={"tag-".concat(getIdMultimedia(multimedia))}
                                    className='invoice-edit-input'
                                    defaultValue={multProd.tagAecoc || ""}
                                    placeholder='Tag AECOC'
                                    onChange={handleTagChange}
                                  />
                                  <Row>
                                    <CustomInput
                                      type='checkbox'
                                      className='custom-control-Primary mt-1 ml-1 mr-1'
                                      id={"principal-".concat(getIdMultimedia(multimedia))}
                                      name={"principal-".concat(getIdMultimedia(multimedia))}
                                      label='Principal'
                                      defaultChecked={multProd.principalSN == 'S'}
                                      inline
                                      onChange={handlePrincipalChange}
                                    />
                                    <CustomInput
                                      type='checkbox'
                                      className='custom-control-Primary mt-1 m-1 mr-1'
                                      id={"publico-".concat(getIdMultimedia(multimedia))}
                                      name={"publico-".concat(getIdMultimedia(multimedia))}
                                      label='Publico'
                                      defaultChecked={multProd.publicoSN == 'S'}
                                      inline
                                      onChange={handlePublicoChange}
                                    />
                                  </Row>
                              </Col>
                            </InputGroup>
                          </Fragment>
                        </div>
                      </div>
                    </Col>
                  )
                }
                })}
              </Row>
            </CardBody>
            <hr className='invoice-spacing' />
          </div>
        </Card>
      </Form>
      <Modal 
        open={modalOpen} 
        toggleModal={toggleModal} 
        submitAction={multimediaDelete} 
        message={intl.formatMessage({ id: `Se eliminará definitivamente el multimedia` })} 
        title={intl.formatMessage({ id: `¿Estás seguro?` })} 
      />
    </Fragment>
  )
}

export default EditCard
