import { Fragment, useState, useEffect } from 'react'
import { columns } from './columns'
import { deleteCategoria, getData, getDataAll } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@src/components/modal-confirm'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'
// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col lg='1' className='d-flex align-items-center p-0 mr-1'>
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
          </div>
        </Col>
        <Col lg='3' className='d-flex'>
          <Can I="Categorias" a="PIM" field="Nuevo">
            <Button.Ripple color='primary' tag={Link} to='/categorias/new'>
              <FormattedMessage id="Nuevo" />
            </Button.Ripple>
          </Can>
        </Col>
      </Row>
    </div>
  )
}

const CategoriasList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.categorias)
  const storeLayout = useSelector(state => state.layout)
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPadre, setFilterPadre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [toDelete, setToDelete] = useState(0)
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: <FormattedMessage id='Select Plan' /> })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: <FormattedMessage id='Select Status' />, number: 0 })
  const [currentSearch, setCurrentSearch] = useState('')

  // ** Function to toggle modal
  const toggleModal = () => setModalOpen(!modalOpen)

  // ** Hooks
  const intl = useIntl()

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        grupoCategorias: filterPadre,
        q: searchTerm
      })
    )
  }, [searchTerm, filterPadre, currentPage, rowsPerPage, storeLayout.selectedEmpresaId])
  //Obtenemos la información para el buscador desplegable
  useEffect(() => {
    dispatch(
      getDataAll({})
    )
  }, [dispatch])

  if (!ability.can("Categorias", "PIM", "Ver")) {
    return null
  }

  function uniqIter(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1]
    })
  }

  function getPadreOptions() {
    const uniqueCategories = uniqIter(store.categorias.map(categoria => categoria.padre))
    const arrayCategories = [{ value: '', label: 'Todos' }]
    uniqueCategories.forEach(categoria => {
      arrayCategories.push({ value: categoria, label: `${categoria}` }) 
    })
    return arrayCategories
  }

  // ** Modal Message
  const getDeleteMessage = () => {
    const selectedCategoria = store.data.find(categoria => categoria.id === toDelete)
    return `¿Realmente desea eliminar el registro ${selectedCategoria?.nombre}?`
  }

  // ** Modal Title
  const getDeleteTitle = () => {
    return intl.formatMessage({ id: 'Borrar Categoria' })
  }

  const handleDeleteModal = (id) => {
    toggleModal()
    setToDelete(id)
  }

  const handleDelete = () => {
    toggleModal()
    dispatch(
      deleteCategoria(toDelete)
    )
  }

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        search: currentSearch.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: value,
        search: currentSearch.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        search: currentSearch.value,
        status: currentStatus.value,
        q: val
      })
    )
  }
  const handlePadreChange = padre => {
    setFilterPadre(padre.value)
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
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      search: currentSearch,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0
    })
    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>
            <FormattedMessage id="Buscar" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <FormGroup className='form-label-group'>
                <Select
                  className='react-select'
                  classNamePrefix='select'
                  id='Categorias'
                  name="Categorias"
                  placeholder={`${intl.formatMessage({ id: 'Seleccione una categoría' })}`}
                  value={getPadreOptions().find(e => e.value === filterPadre) || ""}
                  options={getPadreOptions()}
                  theme={selectThemeColors}
                  onChange={handlePadreChange}
                />
                <Label for='categorianame'>{`${intl.formatMessage({ id: 'Filtro' })}`}</Label>
              </FormGroup>
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <FormGroup className='form-label-group'>
                <Input
                  type='text'
                  id='categorianame'
                  placeholder={`${intl.formatMessage({ id: 'Nombre de la categoría' })}`}
                  defaultValue={currentSearch}
                  onChange={e => {
                    setCurrentSearch(e.target.value)
                    dispatch(
                      getData({
                        perPage: rowsPerPage,
                        search: e.target.value,
                        status: currentStatus.value,
                        q: searchTerm
                      })
                    )
                  }}
                />
                <Label for='categorianame'>{`${intl.formatMessage({ id: 'Categoría' })}`}</Label>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns(handleDeleteModal)}
          sortIcon={<ChevronDown />}
          className='react-dataTable'
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>
      <Modal open={modalOpen} toggleModal={toggleModal} submitAction={handleDelete} message={getDeleteMessage()} title={getDeleteTitle()} />
    </Fragment>
  )
}

export default CategoriasList
