// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import { useForm, Controller } from 'react-hook-form'

// ** Store & Actions
import { getTraduccion, deleteTraduccion } from '../store/action'
import { store } from '@store/storeConfig/store'
import { TraduccionState, TraduccionItem } from '../store/reducer'
import { useSelector } from 'react-redux'

// ** Third Party Components
import { UncontrolledTooltip, CustomInput, Input } from 'reactstrap'
import { Edit2, FileText, Trash2, Edit, Icon } from 'react-feather'
import { FormattedMessage } from 'react-intl'

// ** Types
import { RootState } from 'src/types'

// ** Utils
import { slugify } from '@src/utility'
import { TraduccionesWithRelations, IdiomasWithRelations } from '@api/backend'
import { Can } from '@src/utility/context/Can'
export const columns = [
    {
        name: <FormattedMessage id='Clave' />,
        minWidth: '297px',
        selector: 'clave',
        sortable: true,
        className: 'text-success',
        cell: (row: any) => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <Link
                        to={`/traducciones/edit/${row.clave}`}
                        className='user-name text-truncate mb-0'>
                        <span className='font-weight-bold'>{row.clave}</span>
                    </Link>

                </div>
            </div>
        )
    }
]

const getLanguageColum: any = (idiomas: IdiomasWithRelations, allData: TraduccionItem[]) => {
    // ** Vars
    // const { register, errors, handleSubmit, control } = useForm({ defaultValues })

    return {
        name: idiomas.descripcion,
        minWidth: '120px',
        selector: idiomas.nombre,
        sortable: false,
        cell: (row: TraduccionItem) => {
            const lang = row.idiomas.find(lan => idiomas && idiomas.nombre && idiomas.nombre in lan)
            const text = lang && idiomas.nombre ? lang[idiomas.nombre].valor : ''
            return (<span>{text}</span>)
        }
    }

}

const columnsActions = [
    {
        name: <FormattedMessage id='Acciones' />,
        minWidth: '100px',
        cell: (row: TraduccionItem) => (
            <div className='column-action d-flex align-items-center'>
                <Can I="Traducciones" a="PIM" field="Actualizar">
                    <Link to={`/traducciones/edit/${encodeURIComponent(row.clave)}`} id={`edit-tooltip-${slugify(row.clave)}`}>
                        <Edit size={17} className='mx-1' />
                    </Link>
                    <UncontrolledTooltip placement='top' target={`edit-tooltip-${slugify(row.clave)}`}>
                        <FormattedMessage id='Editar' />
                    </UncontrolledTooltip>
                </Can>
            </div>
        )
    }
]

export const getColumns: any = () => {
    const store = useSelector((state: RootState): TraduccionState => state.traducciones)
    const languagesColumns = store.idiomas.map((language: IdiomasWithRelations) => getLanguageColum(language, store.allData))

    return [
        ...columns,
        ...languagesColumns,
        ...columnsActions
    ]
}
