// ** React Imports
import { Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Third Party Components
import { UncontrolledTooltip } from 'reactstrap'
import {
  Eye,
  Download,
  Edit,
  Check,
  X,
  Image
} from 'react-feather'
import { getUsableFilesUrl, existeImagen, devuelveBasePath } from '@src/utility/Utils'
// Import Can
import { Can } from '@src/utility/context/Can'
// Importo imagen no encontrada
import noEncuentraImg from '../../../assets/images/icons/file-icons/imagen-no-encontrada.png'
// Traducciones
import { FormattedMessage, useIntl } from 'react-intl'

// ** Table columns
export const columns = [
  {
    name: <Image size={14} />,
    minWidth: '50px',
    selector: 'invoiceStatus',
    sortable: true,
    cell: row => {
      const url = getUsableFilesUrl(row?.imagen)
      if (existeImagen(url)) {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <Avatar className='mr-50' img={url} width='32' height='32' />
          </div>
        )
      } else {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <Avatar className='mr-50' img={noEncuentraImg} width='32' height='32' />
          </div>
        )
      }
    }
  },
  {
    name: <FormattedMessage id="Nombre"></FormattedMessage>,
    minWidth: '150px',
    selector: 'nombre',
    sortable: true,
    cell: row => <span>{row?.nombre}</span>
  },
  {
    name: <FormattedMessage id="Categorias"></FormattedMessage>,
    minWidth: '150px',
    selector: 'client',
    sortable: true,
    cell: row => <span>{row?.categorias}</span>
  },
  {
    name: <FormattedMessage id="Finalizado"></FormattedMessage>,
    selector: 'total',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      const finalizado = row?.finalizado
      if (finalizado == "S") {
        return (
          <Check size={19} className='mx-1' style={{ color: "green" }} />
        )
      } else {
        return (
          <X size={19} className='mx-1' style={{ color: "red" }} />
        )
      }
    }
  },
  {
    name: <FormattedMessage id="Accion"></FormattedMessage>,
    minWidth: '90px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center' style={{marginLeft: '-20px'}}>

        <Link to={`/productos/view/${row.id}`} id={`view-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
          <FormattedMessage id='Detalles' />
        </UncontrolledTooltip>

        <Can I="Productos" a="PIM" field="Actualizar">
          <Link to={`/productos/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
            <Edit size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            <FormattedMessage id='Modificar' />
          </UncontrolledTooltip>
        </Can>

        <a href={`${devuelveBasePath()}/FICHA.pdf`} target='_blank' id={`ficha-tooltip-${row.id}`}>
          <Download size={17} className='mx-1' />
        </a>

      </div> 
    )
  }
]
