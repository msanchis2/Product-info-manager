// ** React Imports
import { Fragment, useEffect } from 'react'
import {
  Card,
  CardBody,
  Row,
  Button
} from 'reactstrap'
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDatosNecesarios } from '../store/actions'
import BreadCrumbs from '@components/breadcrumbs'
import { devuelveBasePath } from '@src/utility/Utils'
import Swal from 'sweetalert2'
import { FormattedMessage, useIntl } from 'react-intl'
import axios from 'axios'

const Sincronizaciones = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const allProductos = useSelector(state => state.sincronizaciones)

  useEffect(() => {
    dispatch(getDatosNecesarios())
    const carg = document.querySelector('#cargado')
    const btns = document.querySelector('#botones')
    carg.style.visibility = 'visible'
    btns.style.visibility = 'hidden'
  }, [])

  const cargado = setInterval(() => {
    const carg = document.querySelector('#cargado')
    const btns = document.querySelector('#botones')
    if (allProductos.productos != undefined) {
      if (allProductos.productos.length > 0) {
        carg.style.visibility = 'hidden'
        btns.style.visibility = 'visible'
        clearInterval(cargado)
      }
    }
  }, 500)

  // function modificado24h(producto) {
  //   if (producto.fechaModificacion == null) {
  //     return false
  //   } else {
  //     const fecha = producto.fechaModificacion.split(':')[0]
  //     const mes = fecha.split('-')[1]
  //     const anyo = fecha.split('-')[0]
  //     const dia = fecha.split('-')[2].substring(0, 2)
  //     const nuevaFecha = new Date(anyo, (mes - 1), dia, 0, 0, 0, 0)
  //     const hoy = new Date()
  //     return (hoy - nuevaFecha) <= 86400000
  //   }
  // }

  // const getValorAtributo = (att) => {
  //   if (att == undefined) { return 0 }
  //   const valor = parseInt(att.valor)
  //   if (valor == undefined || isNaN(valor)) { return 0 }
  //   return valor
  // }

  // const getAtributosGrupo39 = (id) => {
  //   const atributosParaNav = []
  //   const atributos = allProductos.atributos.filter(el => el.grupoAtributosId == 39)
  //   const productoAtributos = allProductos.productosA.filter(el => el.productoId == id)
  //   let atributo, objAtributo
  //   atributos.forEach(att => {
  //     atributo = productoAtributos.find(el => att.nombre.toLowerCase() == el.nombre.toLowerCase())
  //     if (atributo != undefined) {
  //       objAtributo = {
  //         atributo: atributo.nombre,
  //         valor: atributo.valor
  //       }
  //       atributosParaNav.push(objAtributo)
  //     }
  //   })
  //   return atributosParaNav
  // } 

  // function sincronizar() {
  //   let dataP, prodGeneral, idP, pesoN, pesoB, vol, codMarca
  //   const dataJson = {items: []}
  //   allProductos.productos.forEach(el => {
  //     idP = el.id
  //     if (modificado24h(el)) {
  //       idP = el.id
  //       prodGeneral = allProductos.productosG.find(function(obj) { return obj.productoId == idP })
  //       pesoN = allProductos.productosA.find(function(obj) {
  //         return obj.productoId == idP && (obj.nombre == "Peso neto" || obj.nombre == "Peso neto(Kg)")
  //       })
  //       pesoB = allProductos.productosA.find(function(obj) {
  //         return obj.productoId == idP && (obj.nombre == "Peso bruto" || obj.nombre == "Peso bruto(Kg)")
  //       })
  //       vol = allProductos.productosA.find(function(obj) {
  //         return obj.productoId == idP && obj.nombre == "Volumen"
  //       })
  //       codMarca = allProductos.marcas.find(m => m.nombre == prodGeneral.marca)
  //       codMarca = codMarca != undefined ? codMarca.codigo : ''
  //       dataP = {
  //         no: prodGeneral.sku,
  //         description: prodGeneral.descripcion,
  //         situacionReferencia: prodGeneral.estadoReferencia, 
  //         ean: prodGeneral.ean, 
  //         marca: codMarca, 
  //         categoriaProducto: el.categorias,
  //         pesoNeto: getValorAtributo(pesoN), 
  //         pesoBruto: getValorAtributo(pesoB), 
  //         volumen: getValorAtributo(vol),
  //         atributos: getAtributosGrupo39(idP) 
  //       }
  //       dataJson.items.push(dataP)
  //     }
  //   })
  //   if (dataJson.items.length > 0) {
  //     dispatch(InsertItem(dataJson))
  //   }
  // }

  // function handleSincronizacion() {
  //   Swal.fire({
  //     title: `${intl.formatMessage({ id: `Sincronización` })}`,
  //     text: `${intl.formatMessage({ id: `Se van a sincronizar los datos con Navision` })}`,
  //     showCancelButton: true,
  //     confirmButtonText: `${intl.formatMessage({ id: `Sincronizar` })}`,
  //     icon: 'warning',
  //     confirmButtonColor: '#7367f0',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: `${intl.formatMessage({ id: `Cancelar` })}`
  //   }).then(result => {
  //     if (result.isConfirmed) { sincronizar() }
  //   })
  // }

  function formatFecha(fecha) {
    if (fecha == undefined || fecha == null || fecha == "") {
      return ""
    } else {
      return fecha.split('T')[0]
    }
  }

  async function downloadFile() {
    let prodGeneral, cat, multis, atris, itemKey, basicInfo, optionalInfo, fileInfo, atributos, atributosCab, linea
    let prodAecoc, valor, selectedAtt, posiblesValores, indexValor, mostrarAtributo, valoresAecoc, tagAecoc, formato
    const filename = 'aecoc.xml'
    const imagenes = []
    let text = '<?xml version="1.0" encoding="UTF-8"?>\n <aecocmediaMessage>\n'
    const productosAecoc = allProductos.productos.filter(p => p.enviarAecoc == "S")
    productosAecoc.forEach(el => {
      prodGeneral = allProductos.productosG.find(function(obj) { return obj.productoId == el.id })
      cat = allProductos.categorias.find(function(obj) { return obj.codigo == el.categorias })
      multis = allProductos.productosM.filter(m => m.productoId == el.id)
      atris = allProductos.productosA.filter(a => a.productoId == el.id)
      if (cat != undefined) {
        if (cat.tagAecoc != null && cat.tagAecoc != undefined && cat.codigoAECOC != undefined && cat.codigoAECOC != null) {
          prodAecoc = {
            ean: prodGeneral.ean || "",
            gln: prodGeneral.GLN || "8425352000003",
            marca: prodGeneral.marca || "",
            sku: prodGeneral.sku || "",
            descripcion: prodGeneral.descripcion || "",
            formato: prodGeneral.formato == 'P' ? 'PROMO' : 'REGULAR',
            clasificacion: cat.codigoAECOC || "",
            categoria: cat.tagAecoc || "",
            public: el.finalizado == 'S',
            fechaCreacion: formatFecha(el.fechaCreacion),
            fechaModificacion: formatFecha(el.fechaModificacion)
          }
          itemKey = `  <tradeItem>\n   <itemKey>\n    <GTIN>${prodAecoc.ean}</GTIN>\n    <TargetMarket>${724}</TargetMarket>\n    <GLN>${prodAecoc.gln}</GLN>\n   </itemKey>\n`
          basicInfo = `   <basicInfo>\n    <Brand>${prodAecoc.marca}</Brand>\n    <Classification>${prodAecoc.clasificacion}</Classification>\n    <Format>${prodAecoc.formato}</Format>\n    <Public>${prodAecoc.public}</Public>\n    <Created>${prodAecoc.fechaCreacion}</Created>\n    <Updated>${prodAecoc.fechaModificacion}</Updated>\n    <Description Language="ES">${prodAecoc.descripcion}</Description>\n   </basicInfo>\n`
          optionalInfo = `   <optionalInfo>\n    <Reference>${prodAecoc.sku}</Reference>\n   </optionalInfo>\n`
          fileInfo = ''
          multis.forEach(multi => {
            if (multi.tagAecoc != "" && multi.tagAecoc != null) {
              imagenes.push({fichero: multi.fichero, tagAecoc: multi.tagAecoc})
              formato = multi.formato == 'P' ? 'PROMO' : 'REGULAR'
              fileInfo = fileInfo.concat('   <fileInfo>\n')
              fileInfo = fileInfo.concat('     <FileName>').concat(multi.tagAecoc).concat('</FileName>\n')
              fileInfo = fileInfo.concat('     <Purpose>').concat('OnlineWebLeaflet').concat('</Purpose>\n')
              fileInfo = fileInfo.concat('     <MainFile>').concat(multi.principalSN == 'S').concat('</MainFile>\n')
              fileInfo = fileInfo.concat('     <Public>').concat(multi.publicoSN == 'S').concat('</Public>\n')
              fileInfo = fileInfo.concat('     <Format>').concat(formato).concat('</Format>\n')
              fileInfo = fileInfo.concat('     <Created>').concat(formatFecha(multi.fechaCreacion)).concat('</Created>\n')
              fileInfo = fileInfo.concat('     <Updated>').concat(formatFecha(multi.fechaModificacion)).concat('</Updated>\n')
              fileInfo = fileInfo.concat('     <Description Language="ES">').concat(prodAecoc.descripcion).concat('</Description>\n')
              fileInfo = fileInfo.concat('   </fileInfo>\n')
            }
          })
          atributosCab = `   <${prodAecoc.categoria}>\n`
          atributos = ""
          atris.forEach(att => {
            mostrarAtributo = true
            selectedAtt = allProductos.atributos.find(function(obj) { return obj.codigo == att.atributoId })
            if (selectedAtt != undefined) {
              tagAecoc = selectedAtt.tagAecoc.replaceAll(" ", "")
              if (tagAecoc != null && tagAecoc != undefined && tagAecoc != "") {
                //Si el campo es desplegable buscamos su valor aecoc
                if (selectedAtt.tipoCampo == "O") {
                  valoresAecoc = selectedAtt.posiblesValoresAecoc
                  if (selectedAtt.posiblesValores != "" && selectedAtt.posiblesValores != null && valoresAecoc != null && valoresAecoc != "") {
                    posiblesValores = selectedAtt.posiblesValores.split(',')
                    indexValor = posiblesValores.indexOf(att.valor)
                    valor = valoresAecoc.split(',')[indexValor]
                  } else {
                    mostrarAtributo = false
                  }
                } else {
                  valor = att.valor
                }
                if (valor == undefined || valor == "" || valor == null) { mostrarAtributo = false }
                if (mostrarAtributo) {
                  atributos = atributos.concat(`    <${tagAecoc}>${valor}</${tagAecoc}>\n`)
                  //Si tiene unidad agregamos la etiqueta de unidad
                  if (selectedAtt.unidadSN == "S" && selectedAtt.unidadAecoc != null && selectedAtt.unidadAecoc != undefined && selectedAtt.tagUOM != null && selectedAtt.tagUOM != undefined && selectedAtt.tagUOM != "") {
                    atributos = atributos.concat(`    <${selectedAtt.tagUOM}>${selectedAtt.unidadAecoc}</${selectedAtt.tagUOM}>\n`)
                  }
                }
              }
            }
          })
          if (atributos != "") { atributos = atributosCab.concat(atributos).concat(`   </${prodAecoc.categoria}>\n`) }
          

          linea = itemKey.concat(basicInfo).concat(optionalInfo).concat(fileInfo).concat(atributos).concat(`  </tradeItem>\n`)
          text = text.concat(linea)
        }
      }
    })

    text = text.concat(' </aecocmediaMessage>')
    
    //Descargar XML
    const file = 'data:text/xml;charset=utf-8,'.concat(encodeURIComponent(text))
    const element = document.createElement('a')
    element.setAttribute('href', file)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    //Enviar XML a AECOC
    try {
      await axios.post(`${devuelveBasePath()}/enviarAECOC`, {texto: text, gln: '8436545120002', imagenes: JSON.stringify(imagenes)})
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }

  return (
    <Fragment className='app-user-list'>
    <BreadCrumbs breadCrumbTitle='Sincronizaciones' breadCrumbParent='Sincronizaciones' breadCrumbActive='Lista' />
      <Card className='invoice-preview-card mb-0 p-1'>
        <CardBody className='invoice-padding pt-2'>
          <Row className='row-bill-to invoice-spacing' id='cargado'>
            <h4 className='text-center'><FormattedMessage id="Cargando datos">...</FormattedMessage></h4>
          </Row>
          <Row className='row-bill-to invoice-spacing' id='botones'>
            {/*<h4 className='text-center'><FormattedMessage id="Sincronización PIM - Navision"></FormattedMessage></h4>
            <Button className='my-1' color='primary' tag='button' onClick={handleSincronizacion} block>
              <FormattedMessage id="Sincronizar"></FormattedMessage>
            </Button>*/}
            <Button onClick={downloadFile} block className='my-1' color='primary' tag='button' id='aecoc'>
              <FormattedMessage id="Generar y enviar XML a AECOC"></FormattedMessage>
            </Button> 
          </Row>

        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Sincronizaciones
