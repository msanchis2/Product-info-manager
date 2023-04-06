// ** React Imports
import { Link } from 'react-router-dom'
// ** Third Party Components
import { UncontrolledTooltip } from 'reactstrap'
import { Eye, Trash2, Edit } from 'react-feather'
import { FormattedMessage } from 'react-intl'
// Import Can
import { Can } from '@src/utility/context/Can'

export const columns = (handleDeleteModal) => {
  // ** Hooks
  return ([
    {
      name: <FormattedMessage id='Nombre' />,
      minWidth: '400px',
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
      name: <FormattedMessage id='Grupo' />,
      minWidth: '400px',
      selector: 'grupo',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{row.nombreGrupo}</span>
          </div>
        </div>
      )
    },
    {
      name: <FormattedMessage id='Acciones' />,
      minWidth: '100px',
      cell: row => (
        <div className='column-action d-flex align-items-right'>
          <Link to={`/atributos/view/${row.id}`} id={`view-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-tooltip-${row.id}`}>
            <FormattedMessage id='Detalles' />
          </UncontrolledTooltip>
          <Can I="Atributos" a="PIM" field="Actualizar">
            <Link to={`/atributos/edit/${row.id}`} id={`edit-tooltip-${row.id}`}>
            <Edit size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            <FormattedMessage id='Modificar' />
          </UncontrolledTooltip>
          </Can>
          <Can I="Atributos" a="PIM" field="Borrar">
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
