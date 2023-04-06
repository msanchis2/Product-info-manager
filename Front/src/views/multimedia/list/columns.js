// ** React Imports
import { Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/storeConfig/store'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'

import { Slack, Settings, Database, Edit2, MoreVertical, Eye, Trash2, Edit, FileText, Film, Image, Check, X } from 'react-feather'

import { getUsableFilesUrl } from '@src/utility/Utils'

// Import Can
import { Can } from '@src/utility/context/Can'

// ** Table columns
export const columns = (handleDeleteModal, store) => {

  // ** Hooks
  return ([
    {
      name: <FormattedMessage id="Nombre"></FormattedMessage>,
      minWidth: '150px',
      selector: 'nombre',
      sortable: true,
      cell: row => <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.clave}</span>
        </div>
      </div>
    },
    {
      name: <FormattedMessage id="Tipo"></FormattedMessage>,
      minWidth: '150px',
      selector: 'nombre',
      sortable: true,
      cell: row => {
        const tipo = row?.tipo
        if (tipo === "Imagen") {
          return (
            <Image size={19} className='mx-1' />
          )

        }
        if (tipo === "Documento") {
          return (
            <FileText size={19} className='mx-1' />
          )
        }
        if (tipo === "Video") {
          return (
            <Film size={19} className='mx-1' />
          )
        }
      }
    },
    {
      name: <FormattedMessage id="Accion"></FormattedMessage>,
      minWidth: '80px',
      selector: '',
      sortable: true,
      cell: row => {
          return (
            <div className='column-action d-flex align-items-center'>
              <Link to={`/multimedia/view/${row.id}`} id={`view-tooltip-${row.id}`}>
                <Eye size={17} className='mx-1' />
              </Link>
              <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
                <FormattedMessage id='Detalles' />
              </UncontrolledTooltip>

              <Can I="Multimedia" a="PIM" field="Actualizar">
                <Link to={`/multimedia/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
                  <Edit size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
                  <FormattedMessage id='Modificar' />
                </UncontrolledTooltip>
              </Can>

              <Can I="Multimedia" a="PIM" field="Borrar">
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
    }
  ])
} 
