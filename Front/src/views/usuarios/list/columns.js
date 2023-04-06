import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { store } from '@store/storeConfig/store'
import { getUsuario } from '../store/action'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'
import { Slack, Settings, Database, Edit2, MoreVertical, Eye, Trash2, Edit } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
// Import Can
import { Can } from '@src/utility/context/Can'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]
  // Controlo que avatar exista en la tabla de la base de datos
  // Pero existira si o si, ya que la imagen esta almacenada en la tabla de la base de datos
  // Y si no tiene, me montará un Avatar vacio
  if (row.avatar?.length) {
    return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={row.nombre || 'John Doe'} initials />
  }
}

const statusObj = {
  activo: 'light-success',
  inactivo: 'light-danger'
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
      name: <FormattedMessage id='Usuario' />,
      minWidth: '300px',
      selector: 'nombre',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
        </div>
      )
    },
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
      name: <FormattedMessage id='Correo' />,
      minWidth: '300px',
      selector: 'mail',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.mail}</span>
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
          {getStatusText(row)}
        </Badge>
      )
    },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link to={`/usuarios/view/${row.id}`} id={`view-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
            <FormattedMessage id='Detalles' />
          </UncontrolledTooltip>
          <Can I="Usuarios" a="PIM" field="Actualizar">
            <Link to={`/usuarios/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
              <Edit size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
              <FormattedMessage id='Modificar' />
            </UncontrolledTooltip>
          </Can>
          <Can I="Usuarios" a="PIM" field="Borrar">
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
