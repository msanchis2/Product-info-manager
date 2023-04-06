/* eslint no-use-before-define: [0] */
// ** React Imports
import React, { Fragment, useState, useEffect, ChangeEvent } from 'react'

// ** Columns
import { columns, getColumns } from './columns'
import { PermisosWithRelations } from '@src/@api'

// ** Store & Actions
import { getAllData, getData, getRoles } from '../store/action'
import { PermisosState } from '../store/reducer'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

// ** Types
import { SearchFilter, RootState } from 'src/types'

// ** Permissions List
// import permissions from '@src/assets/data/acl/modules.json'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { LOADIPHLPAPI } from 'dns'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'


type CustomHeaderProps = {
    handlePerPage: (e: ChangeEvent<HTMLInputElement>) => void,
    rowsPerPage: number,
    handleFilter: (filter: string) => void,
    searchTerm: string
}
// EL HEADER NO SE UTILIZA
// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }: CustomHeaderProps) => {
    return (
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <Label for='rows-per-page'>
                            <FormattedMessage id="Mostrar" />
                        </Label>
                        <CustomInput
                            className='form-control mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{
                                width: '5rem',
                                padding: '0 0.8rem',
                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </CustomInput>
                        <Label for='rows-per-page'>
                            <FormattedMessage id="Entradas" />
                        </Label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                        <Label className='mb-0' for='search-role'>
                            <FormattedMessage id="Buscar" />:
                        </Label>
                        <Input
                            id='search-role'
                            className='ml-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e.target.value)}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const RolesPermissionsList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    // const selectRolesPermissions = (state: RootState): RolesPermissionsState => state.rolesPermission
    const store = useSelector((state: RootState): PermisosState => state.permisos)

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // Ability permisos
    const ability = useAbility(AbilityContext)

    // ** Get data on mount
    useEffect(() => {
        dispatch(getAllData())
        dispatch(
            getData({
                page: currentPage,
                perPage: rowsPerPage,
                q: searchTerm
            })
        )
        dispatch(getRoles())
    }, [dispatch])

    if (!ability.can("Permisos", "PIM", "Ver")) {
        return null
    }

    // ** Table data to render
    const dataToRender: any = () => {
        const filters: SearchFilter = {
            q: searchTerm
        }
        const isFiltered: boolean = Object.keys(filters).some(function (k: string) {
            return filters[k].length > 0
        })
        if (!store) return []
        const { data, allData, roles } = store
        // Esta cogiendo bien los roles
        // Se mete la columna del punto del menu, y  su permiso
        // Si NO tiene guiones es el punto de menu
        // Se inserta igual que la secuencia del punto del menu
        // moduleName-controllerName-actionName
        const myData = [
            { key: 'Productos' },
            { key: 'PIM-Productos-Nuevo' },
            { key: 'PIM-Productos-Actualizar' },
            { key: 'PIM-Productos-Borrar' },
            { key: 'PIM-Productos-Reset' },
            { key: 'Integracion' },
            { key: 'PIM-Integracion-Ver' },
            { key: 'PIM-Integracion-Nuevo' },
            { key: 'PIM-Integracion-Actualizar' },
            { key: 'Marcas' },
            { key: 'PIM-Marcas-Nuevo' },
            { key: 'PIM-Marcas-Ver' },
            { key: 'PIM-Marcas-Actualizar' },
            { key: 'PIM-Marcas-Borrar' },
            { key: 'Situaciones' },
            { key: 'PIM-Situaciones-Nuevo' },
            { key: 'PIM-Situaciones-Ver' },
            { key: 'PIM-Situaciones-Actualizar' },
            { key: 'PIM-Situaciones-Borrar' },
            { key: 'Multimedia' },
            { key: 'PIM-Multimedia-Nuevo' },
            { key: 'PIM-Multimedia-Ver' },
            { key: 'PIM-Multimedia-Actualizar' },
            { key: 'PIM-Multimedia-Borrar' },
            { key: 'Atributos' },
            { key: 'PIM-Atributos-Nuevo' },
            { key: 'PIM-Atributos-Ver' },
            { key: 'PIM-Atributos-Actualizar' },
            { key: 'PIM-Atributos-Borrar' },
            { key: 'Grupo Atributos' },
            { key: 'PIM-GrupoAtributos-Nuevo' },
            { key: 'PIM-GrupoAtributos-Ver' },
            { key: 'PIM-GrupoAtributos-Actualizar' },
            { key: 'PIM-GrupoAtributos-Borrar' },
            { key: 'Roles' },
            { key: 'PIM-Roles-Nuevo' },
            { key: 'PIM-Roles-Ver' },
            { key: 'PIM-Roles-Actualizar' },
            { key: 'PIM-Roles-Borrar' },
            { key: 'Permisos' },
            { key: 'PIM-Permisos-Ver' },
            { key: 'Categorias' },
            { key: 'PIM-Categorias-Nuevo' },
            { key: 'PIM-Categorias-Ver' },
            { key: 'PIM-Categorias-Actualizar' },
            { key: 'PIM-Categorias-Borrar' },
            { key: 'Idiomas' },
            { key: 'PIM-Idiomas-Nuevo' },
            { key: 'PIM-Idiomas-Ver' },
            { key: 'PIM-Idiomas-Actualizar' },
            { key: 'PIM-Idiomas-Borrar' },
            { key: 'Traducciones' },
            { key: 'PIM-Traducciones-Nuevo' },
            { key: 'PIM-Traducciones-Ver' },
            { key: 'PIM-Traducciones-Actualizar' },
            { key: 'PIM-Traducciones-Borrar' },
            { key: 'Usuarios' },
            { key: 'PIM-Usuarios-Nuevo' },
            { key: 'PIM-Usuarios-Ver' },
            { key: 'PIM-Usuarios-Actualizar' },
            { key: 'PIM-Usuarios-Borrar' },
            { key: 'Empresas' },
            { key: 'PIM-Empresas-Nuevo' },
            { key: 'PIM-Empresas-Ver' },
            { key: 'PIM-Empresas-Actualizar' },
            { key: 'PIM-Empresas-Borrar' },
            { key: 'Sincronizaciones' },
            { key: 'PIM-Sincronizaciones-Ver' },
            { key: 'Documentacion API' },
            { key: 'PIM-Documentacion API-Ver' }

        ]

        // const rolesId = roles.map(role => {
        //     return {[`role_${role.id}`]: `${role.id}`}
        // })
        if (data.length > 0) {
            return myData
            // const datos = {
            //     roles, myData
            // }
            // return datos
        } else if (data.length === 0 && isFiltered) {
            return []
        } else {
            return allData.slice(0, rowsPerPage)
        }
    }


    return (
        <Fragment>
            <Card>
                <DataTable
                    noHeader
                    //pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={getColumns()}
                    sortIcon={<ChevronDown />}
                    className='react-dataTable'
                    //paginationComponent={CustomPagination}
                    data={dataToRender()}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </Card>

        </Fragment>
    )
}

const conditionalRowStyles = [
    {
        when: (row: any) => row.key?.split('-').length < 2,
        style: {
            // backgroundColor: '#ffe4ca',
            backgroundColor: '#2a343f',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    {
        when: (row: any) => row.key?.split('-').length === 2,
        style: {
            backgroundColor: '#dcdddf',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }
]

export default RolesPermissionsList
