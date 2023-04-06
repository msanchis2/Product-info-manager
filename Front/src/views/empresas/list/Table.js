import { Fragment, useState, useEffect } from 'react'
import { columns } from './columns'
import { deleteEmpresa, getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@src/components/modal-confirm'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
// import CustomHeader from '../../componentes-genericos/CustomHeader'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'

const CustomHeader = ({ handleFilter, searchterm, handlePerPage, rowsPerPage }) => {
  const intl = useIntl()
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
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
          <Can I="Empresas" a="PIM" field="Nuevo">
            <Button.Ripple tag={Link} to='/empresas/new' color='primary'>
              <FormattedMessage id="Nuevo"></FormattedMessage>
            </Button.Ripple>
          </Can>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'><FormattedMessage id="Buscar"></FormattedMessage></Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-10'
              style={{ width: "210px" }}
              type='text'
              searchterm={searchterm}
              onChange={e => handleFilter(e.target.value)}
              placeholder={`${intl.formatMessage({ id: 'Nombre' })}`}
            />
          </div>
        </Col>
      </Row>
    </div >
  )
}

const EmpresasList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.empresas)
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
        q: searchTerm
      })
    )
  }, [searchTerm, filterPadre, currentPage, rowsPerPage, storeLayout.selectedEmpresaId, storeLayout.empresas])

  // controllerName, moduleName, Action
  if (!ability.can("Empresas", "PIM", "Ver")) {
    return null
  }

  // ** Modal Message
  const getDeleteMessage = () => {
    const selectedEmpresa = store.data.find(empresa => empresa.id === toDelete)
    return `¿Realmente desea eliminar el registro ${selectedEmpresa?.nombre}?`
  }

  // ** Modal Title
  const getDeleteTitle = () => {
    return intl.formatMessage({ id: 'Borrar Empresa' })
  }

  const handleDeleteModal = (id) => {
    toggleModal()
    setToDelete(id)
  }

  const handleDelete = () => {
    toggleModal()
    dispatch(
      deleteEmpresa(toDelete)
    )
  }

  const handleFilter = val => {
    setSearchTerm(val)
  }

  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
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
              linkTo='/empresas/new'
            />
          }
        />
      </Card>
      <Modal open={modalOpen} toggleModal={toggleModal} submitAction={handleDelete} message={getDeleteMessage()} title={getDeleteTitle()} />
    </Fragment>
  )
}

export default EmpresasList
