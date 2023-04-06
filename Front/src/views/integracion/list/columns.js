// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, Button, UncontrolledTooltip, CustomInput, FormGroup } from 'reactstrap'
import { Eye, Trash2, Edit} from 'react-feather'
import { useState, useEffect, useSelector } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { insertarLinea, descargarCsv, actualizarLinea } from '../store/action'
// Import Can
import { Can } from '@src/utility/context/Can'
import Swal from 'sweetalert2'

export const columns = (store, handleDeleteModal) => {

  let tabla, fichero, fileReader, update
  const dispatch = useDispatch()
  const intl = useIntl()

  const handleFileRead = () => {
      let content = fileReader.result
      content = content.replaceAll("\r", "")
      let obj, camposFichero, valorCampo, valorClave, id

      const claves = store.data.find(el => el.tabla == tabla).cabecera.split(",")
      if (update) { claves.unshift("id") }
      const lineaFichero = content.split("\n")
      lineaFichero.shift()
      if (fichero.name.split('.')[1] == 'csv') {
        try {
          lineaFichero.forEach(el => {
            if (el.length > 0)  {
              obj = {}
              camposFichero = el.split(";")

              for (let i = 0; i < claves.length; i++) {
                if (camposFichero[i] != undefined) { 
                  valorCampo = (claves[i].includes("Id") || claves[i].includes("_id")) ? parseInt(camposFichero[i]) : camposFichero[i]     //Los ids se pasan a numerico
                  valorClave = claves[i] == 'GLN' ? claves[i] : claves[i][0].toLowerCase().concat(claves[i].substring(1, claves[i].length))  //Se quita la primea mayuscula
                  obj[valorClave] = valorCampo == null ? "" : valorCampo 
                } else {
                  obj = null
                  break
                }
              }

              if (update) { 
                id = camposFichero[0] 
                delete obj.id
              }

              if (obj != null) { 
                update ? dispatch(actualizarLinea(id, obj, tabla)) : dispatch(insertarLinea(obj, tabla)) 
              } else {
                Swal.fire({
                  title: `${intl.formatMessage({ id: 'El fichero está vacio' })}`,
                  icon: 'error'
                })
              }
          }
          })
          Swal.fire({
            title: `${intl.formatMessage({ id: 'Datos insertados' })}`,
            icon: 'success'
          })
        } catch (err) {
          console.error(err)
          Swal.fire({
            title: `${intl.formatMessage({ id: 'Error importando datos' })}`,
            text: `${intl.formatMessage({ id: 'Compruebe el formato del fichero' })}`,
            icon: 'error'
          })
        }
      } else {
        Swal.fire({
          title: `${intl.formatMessage({ id: 'Fichero no válido' })}`,
          text: `${intl.formatMessage({ id: 'Por favor, suba un fichero csv' })}`,
          icon: 'error'
        })
      }
  }

  const handleFileChosen = (file) => {
      fileReader = new FileReader()
      fileReader.onloadend = handleFileRead
      fileReader.readAsText(file)
  }

  const handleFileChange = ({target}, tablaSelect) => {
    const file = target.files[0]
    
    if (file.size > 17179869184) {
      Swal.fire({
        text: `${intl.formatMessage({ id: 'Fichero demasiado pesado' })}`,
        icon: 'warning'
      })
      return null
    }

    tabla = tablaSelect
    fichero = file

    Swal.fire({
      title: 'Subida de datos',
      text: `${intl.formatMessage({ id: `Se van a carga los datos del fichero en la base de datos` })}`,
      showCancelButton: true,
      confirmButtonText: 'Adelante',
      icon: 'warning',
      confirmButtonColor: '#7367f0',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) { handleFileChosen(file) }
    })
  }

  // ** Hooks
  return ([
    {
      name: <FormattedMessage id='Nombre' />,
      minWidth: '200px',
      selector: 'nombre',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.nombre}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Tabla' />,
      minWidth: '200px',
      selector: 'tabla',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.tabla}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Descripción' />,
      minWidth: '300px',
      selector: 'descripcion',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.descripcion}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Insertar' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <FormGroup>
            <div  style={{marginTop: '15px', marginLeft: '-10px', marginRight: '10px', width: '150px'}}>
              <CustomInput
                type="file"
                id={"fileBrowser".concat(row.id)}
                name={"fileBrowser".concat(row.id)}
                label={`${intl.formatMessage({ id: 'Seleccione fichero' })}`}
                onChange={(e) => { update = false; handleFileChange(e, row.tabla) }}
              />
            </div>
          </FormGroup>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Actualizar' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <FormGroup>
            <div  style={{marginTop: '15px', marginLeft: '-10px', marginRight: '10px', width: '150px'}}>
              <CustomInput
                type="file"
                id={"update".concat(row.id)}
                name={"update".concat(row.id)}
                label={`${intl.formatMessage({ id: 'Seleccione fichero' })}`}
                onChange={(e) => { update = true; handleFileChange(e, row.tabla) }}
              />
            </div>
          </FormGroup>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Descargar CSV' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <FormGroup>
            <div  style={{marginTop: '15px', marginRight: '10px', width: '150px'}}>
              <Button onClick={() => dispatch(descargarCsv(row.tabla, row.cabecera))}><FormattedMessage id='Descargar'/></Button>
            </div>
          </FormGroup>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '200px',
      cell: row => (
        <div className='column-action d-flex align-items-center' style={{marginLeft: '-10px'}}>

          <Link to={`/integracion/view/${row.id}`} id={`view-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
            <FormattedMessage id='Detalles' />
          </UncontrolledTooltip>

          <Can I="Integracion" a="PIM" field="Actualizar">
            <Link to={`/integracion/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
              <Edit size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
              <FormattedMessage id='Modificar' />
            </UncontrolledTooltip>
          </Can>

          <Can I="Multimedia" a="PIM" field="Actualizar">
                <Link to="#" id={`delete-tooltip-${row.id}`} onClick={() => handleDeleteModal(row.id)}>
                  <Trash2 size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.id}`}>
                  <FormattedMessage id='Borrar' />
                </UncontrolledTooltip>
              </Can>
        </div>
      )
    }
  ])
}
