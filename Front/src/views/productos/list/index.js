// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

// ** Table Columns
import { columns } from './columns'
import BreadCrumbs from '@components/breadcrumbs'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

// ** Store & Actions
import { getData } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'

export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

const CustomHeader = ({ handleFilter, searchterm, handlePerPage, rowsPerPage }) => {

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='12' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'><FormattedMessage id="Mostrar"></FormattedMessage></Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
          <Can I="Productos" a="PIM" field="Nuevo">
            <Button.Ripple tag={Link} to='/productos/new' color='primary'>
              <FormattedMessage id="Nuevo"></FormattedMessage>
            </Button.Ripple>
          </Can>
        </Col>
      </Row>
    </div >
  )
}

const ProductosList = () => {

  const intl = useIntl()

  const dispatch = useDispatch()
  const store = useSelector(state => state.productos)
  const storeLayout = useSelector(state => state.layout)
  // Ability
  const ability = useAbility(AbilityContext)

  const [currentSearch, setCurrentSearch] = useState('')
  const [searchterm, setsearchterm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchInputsFinalizado, setsearchInputsFinalizado] = useState('')

  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        
        q: searchterm
      })
    )
  }, [searchterm, searchInputsFinalizado, currentPage, rowsPerPage, storeLayout.selectedEmpresaId, store.selectedProducto]) // Agregar aquí si se necesita refetchear según cambie alguna variable más,

  // controllerName, moduleName, Action
  if (!ability.can("Productos", "PIM", "Ver")) {
    return null
  }

  const handleFilter = val => {
    setsearchterm(val)
  }

  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  const handlePadreChange = padre => {
    
    if (padre.value == "todo") {
      dispatch(
        getData({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchterm
        })
      )  
    } else {
      dispatch(
        getData({
          page: currentPage,
          perPage: rowsPerPage,
          searchInputsFinalizado:padre.value,
          search:true,
          q: searchterm
        })
      )
    }

    
  }

  const getFinalizadoOptions = () => {
    // // Si existe en el array que contiene los ya cargados no los pintamos
    const types = [
      {value:"todo", label:`${intl.formatMessage({ id: 'Todo' })}`}, 
      {value:"S", label:`${intl.formatMessage({ id: 'Finalizado' })}`}, 
      {value:"N", label:`${intl.formatMessage({ id: 'No finalizado' })}`}
    ]  

    return types.map(f => {
          return { value: f.value, label: f.label}
    })
    

  }
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <div className='app-user-list'>
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
      </div>
    )
  }

  const dataToRender = () => {
    const filters = {
      q: searchterm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    store.newId = null
    if (store.data?.length > 0) {
      return store.data
    } else if (store.data?.length === 0 && isFiltered) {
      return []
    } else {
      return store.data
    }
  }

  if (!storeLayout.selectedEmpresaId) return null

  return (
    <div className='invoice-list-wrapper'>
    <BreadCrumbs breadCrumbTitle='Productos' breadCrumbParent='Productos' breadCrumbActive='Lista' />
    <Card>
        <CardHeader>
          <CardTitle tag='h4'>
            <FormattedMessage id="Buscar" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='2'>
              <FormGroup className='form-label-group'>
              <Input
              type='text'
              id='productoNombre'
              placeholder={`${intl.formatMessage({ id: 'Nombre del Producto' })}`}
              defaultValue={currentSearch}
              onChange={e => {
                setsearchterm(e.target.value)
                dispatch(
                  getData({
                    perPage: rowsPerPage,
                    search: true,
                    searchInputsNombre : e.target.value,
                    q: searchterm
                  })
                )
              }}
            />
              </FormGroup>
            </Col>
            <Col className='my-md-0 my-1' md='2'>
              <FormGroup className='form-label-group'>
              <Input
              type='text'
              id='productosCategorias'
              placeholder={`${intl.formatMessage({ id: 'Categorias' })}`}
              defaultValue={currentSearch}
              onChange={e => {
                setsearchterm(e.target.value)
                dispatch(
                  getData({
                    perPage: rowsPerPage,
                    search: true,
                    searchInputsCategorias : e.target.value,
                    q: searchterm
                  })
                )
              }}
            />
              </FormGroup>
            </Col>
            <Col className='my-md-0 my-1' md='2'>
              <FormGroup className='form-label-group'>
              <Select
              className='react-select'
              classNamePrefix='select'
              id='Categorias'
              name="Categorias"
              options={getFinalizadoOptions()}
              theme={selectThemeColors}
              onChange={handlePadreChange}
            />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <div className='invoice-list-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                searchterm={searchterm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default ProductosList
