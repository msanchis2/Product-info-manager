// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap'
import { Slack, Settings, Database, Edit2, MoreVertical, Eye, Trash2, Edit, Check, X } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
// Import Can
import { Can } from '@src/utility/context/Can'

// const statusObj = {
//   active: 'light-success',
//   inactive: 'light-danger'
// }

const getStatusText = (row) => {
  if (row.activo === '1') {
    return 'activo'
  } else {
    return 'inactivo'
  }
}

export const columns = (handleDeleteModal, storePermisos) => {
  // ** Hooks
  return ([
    // {
    //   name: <FormattedMessage id='Id' />,
    //   minWidth: '300px',
    //   selector: 'id',
    //   sortable: true,
    //   cell: row => (
    //     <div className='d-flex justify-content-left align-items-center'>
    //       <div className='d-flex flex-column'>
    //         <span className='font-weight-bold'>{row.id}</span>
    //       </div>
    //     </div>
    //   )
    // },
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
      name: <FormattedMessage id='Activo' />,
      minWidth: '300px',
      selector: 'activo',
      sortable: true,
      cell: row => {
        if (row.activo === '1') {
          return (
            <Badge className='text-capitalize' color='light-success' pill>
              {getStatusText(row)}
            </Badge>
          )
        } else {
          return (
            <Badge className='text-capitalize' color='light-danger' pill>
              {getStatusText(row)}
            </Badge>
          )
        }
      }
    },

    // {
    //   name: 'Finalizado',
    //   selector: 'total',
    //   sortable: true,
    //   minWidth: '150px',
    //   cell: row => {
    //     const finalizado = row?.activo
    //     if (finalizado == "1") {
    //       return (
    //         <Check size={19} className='mx-1' style={{ color: "green" }} />
    //       )
    //     } else {
    //       return (
    //         <X size={19} className='mx-1' style={{ color: "red" }} />
    //       )
    //     }
    //   }
    // },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '100px',
      cell: row => {
        if (storePermisos?.roles?.find(rol => rol.id === row.id)?.permisos === undefined) {
          return (
            <div className='column-action d-flex align-items-center'>
              <Link to={`/roles/view/${row.id}`} id={`view-tooltip-${row.id}`}>
                <Eye size={17} className='mx-1' />
              </Link>
              <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
                <FormattedMessage id='Detalles' />
              </UncontrolledTooltip>
              <Can I="Roles" a="PIM" field="Actualizar">
                <Link to={`/roles/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
                  <Edit size={17} className='mx-1' />
                </Link>
                <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
                  <FormattedMessage id='Modificar' />
                </UncontrolledTooltip>
              </Can>
              <Can I="Roles" a="PIM" field="Borrar">
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
        return (
          <div className='column-action d-flex align-items-center'>
            <Link to={`/roles/view/${row.id}`} id={`view-tooltip-${row.id}`}>
              <Eye size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
              <FormattedMessage id='Detalles' />
            </UncontrolledTooltip>
            <Can I="Roles" a="PIM" field="Actualizar">
              <Link to={`/roles/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
                <Edit size={17} className='mx-1' />
              </Link>
              <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
                <FormattedMessage id='Modificar' />
              </UncontrolledTooltip>
            </Can>
          </div>
        )
      }
    }
  ])
}
