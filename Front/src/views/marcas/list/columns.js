// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'
import { Slack, Settings, Database, Edit2, MoreVertical, Eye, Trash2, Edit } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import Avatar from '@components/avatar'
// Import Can
import { Can } from '@src/utility/context/Can'

export const columns = (handleDeleteModal) => {
  const renderClient = row => {
    // Controlo que avatar exista en la tabla de la base de datos
    // Pero existira si o si, ya que la imagen esta almacenada en la tabla de la base de datos
    // Y si no tiene, me montará un Avatar vacio
    if (row.logo?.length) {
      return <Avatar className='mr-1' img={row.logo} width='32' height='32' />
    } else {
      return <Avatar color={'light-primary'} className='mr-1' content={row.logo || 'L G'} initials />
    }
  }
  // ** Hooks
  return ([
    {
      name: <FormattedMessage id='Logo' />,
      minWidth: '300px',
      selector: 'logo',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
        </div>
      )
    },
    {
      name: <FormattedMessage id='Código' />,
      minWidth: '300px',
      selector: 'ID',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.codigo}</span>
          </div>
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
      name: <FormattedMessage id='Color' />,
      minWidth: '300px',
      selector: 'color',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold' style={{color: row.color }}>{row.color}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link to={`/marcas/view/${row.id}`} id={`view-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
            <FormattedMessage id='Detalles' />
          </UncontrolledTooltip>
          <Can I="Marcas" a="PIM" field="Actualizar">
            <Link to={`/marcas/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
              <Edit size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
              <FormattedMessage id='Modificar' />
            </UncontrolledTooltip>
          </Can>
          <Can I="Marcas" a="PIM" field="Borrar">
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
