// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'
import { Slack, Settings, Database, Edit2, MoreVertical, Eye, Trash2, Edit } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
// Import Can
import { Can } from '@src/utility/context/Can'

const statusObj = {
  active: 'light-success',
  inactive: 'light-danger'
}

const getStatusText = (row) => {
  if (row.activoSn?.toLowerCase() == 's') {
    return 'activo'
  } else {
    return 'inactivo'
  }
}
export const columns = (handleDeleteModal) => {
  // ** Hooks
  return ([    
    {
      name: <FormattedMessage id='Nombre' />,
      minWidth: '300px',
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
      name: <FormattedMessage id='Locale' />,
      minWidth: '300px',
      selector: 'locale',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.locale}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Activo' />,
      minWidth: '300px',
      selector: 'activo',
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[getStatusText(row)]} pill>
          { getStatusText(row) }
        </Badge>
      )
    },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link to={`/idiomas/view/${row.id}`} id={`view-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
            <FormattedMessage id='Detalles' />
          </UncontrolledTooltip>
          <Can I="Idiomas" a="PIM" field="Actualizar">
            <Link to={`/idiomas/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
            <Edit size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            <FormattedMessage id='Modificar' />
          </UncontrolledTooltip>
          </Can>
          <Can I="Idiomas" a="PIM" field="Borrar">
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
