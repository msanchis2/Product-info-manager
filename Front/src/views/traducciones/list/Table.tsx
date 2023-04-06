/* eslint no-use-before-define: [0] */
// ** React Imports
import React, { Fragment, useState, useEffect, ChangeEvent } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Columns
import { columns, getColumns } from './columns'
import { Can } from '@src/utility/context/Can'
// ** Store & Actions
import { getAllData, getData, getIdiomas, googleTraslate } from '../store/action'
import { TraduccionState } from '../store/reducer'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
// ** Types
import { SearchFilter, RootState } from 'src/types'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'


type CustomHeaderProps = {
    toggleSidebar: () => void,
    handlePerPage: (e: ChangeEvent<HTMLInputElement>) => void,
    rowsPerPage: number,
    handleFilter: (filter: string) => void,
    searchTerm: string
}

// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }: CustomHeaderProps) => {

    return (
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
            <Row>
                <Col lg='1'className='d-flex align-items-center p-0'>
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
                            <option value='40'>10</option>
                            <option value='100'>25</option>
                            <option value='200'>50</option>
                        </CustomInput>
                    </div>
                </Col>

                <Col>
                    <Can I="Traducciones" a="PIM" field="Nuevo">
                        <Button color='primary' style={{ marginRight: "25px" }}>
                            <Link to="/traducciones/new" style={{ color: "white" }}><FormattedMessage id="Nueva" /></Link>
                        </Button>
                        <img style={{ width: "40px", margin: "10px" }} src='https://img.icons8.com/ios-glyphs/256/google-translate.png'/>
                        <Button color='secondary' onClick={googleTraslate}>
                            <FormattedMessage id="Traducir todo"></FormattedMessage>
                        </Button>
                    </Can>
                </Col>

                <Col className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'>
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

const TraduccionesList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    // const selectRolesPermissions = (state: RootState): RolesPermissionsState => state.rolesPermission
    const store = useSelector((state: RootState): TraduccionState => state.traducciones)

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(40)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // ** Function to toggle sidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
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
        dispatch(getIdiomas())
    }, [dispatch])


    // ** Function in get data on page change
    const handlePagination = (page: { selected: number }) => {
        dispatch(
            getData({
                page: page.selected + 1,
                perPage: rowsPerPage,
                q: searchTerm
            })
        )
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.currentTarget.value)
        dispatch(
            getData({
                page: currentPage,
                perPage: value,
                q: searchTerm
            })
        )
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = (val: string) => {
        setSearchTerm(val)
        dispatch(
            getData({
                page: currentPage,
                perPage: rowsPerPage,
                q: val
            })
        )
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(store.total / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page: { selected: number }) => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
                pageRangeDisplayed={10}
                marginPagesDisplayed={2}
            />
        )
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
        // borro la traduccion seleccionada, para que no se solapen
        store.selectedTraduccion = null
        const { data, allData, idiomas } = store

        if (data.length > 0) {
            return data
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
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={getColumns()}
                    sortIcon={<ChevronDown />}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            toggleSidebar={toggleSidebar}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />
            </Card>
            {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        </Fragment>
    )
}


export default TraduccionesList
