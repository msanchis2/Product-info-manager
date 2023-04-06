// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { deleteAtributo, getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { selectThemeColors } from '@src/utility/Utils'

// ** Modal Confirmacion
import Modal from '@src/components/modal-confirm'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
// Import Can
import { Can } from '@src/utility/context/Can'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
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
          <Can I="Atributos" a="PIM" field="Nuevo">
            <div className='d-flex align-items-center mb-1 mt-1'>
              <Button.Ripple color='primary' tag={Link} to='/atributos/new'>
                <FormattedMessage id="Nuevo" />
              </Button.Ripple>
            </div>
          </Can>
        </Col>
      </Row>
      </div>
  )
}

const AtributosList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.atributos)
  const storeLayout = useSelector(state => state.layout)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPadre, setFilterPadre] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [toDelete, setToDelete] = useState(0)

  // ** Function to toggle modal
  const toggleModal = () => setModalOpen(!modalOpen)

  // ** Hooks
  const intl = useIntl()

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        empresaId: storeLayout.selectedEmpresaId,
        page: currentPage,
        perPage: rowsPerPage,
        grupoAtributos: filterPadre,
        q: searchTerm
      })
    )
  }, [searchTerm, filterPadre, currentPage, rowsPerPage, storeLayout.selectedEmpresaId])


  function getPadreOptions() {
    const arrayGruposAtributos = store.gruposAtributos.map(grupo => {
      return { value: grupo.id, label: `${grupo.nombre} (${grupo.codigo})` }
    })
    arrayGruposAtributos.push({ value: null, label: 'Todos' })
    return arrayGruposAtributos
  }

  // ** Modal Message
  const getDeleteMessage = () => {
    const selectedAtributo = store.data.find(atributo => atributo.id === toDelete)
    return `¿Realmente desea eliminar el registro ${selectedAtributo?.nombre}?`
  }

  // ** Modal Title
  const getDeleteTitle = () => {
    return intl.formatMessage({ id: 'Borrar atributo' })
  }

  const handleDeleteModal = (id) => {
    toggleModal()
    setToDelete(id)
  }

  const handleDelete = () => {
    toggleModal()
    dispatch(
      deleteAtributo(toDelete)
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
      q: searchTerm
    }
    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0
    })
    const datos = []
    let linea, nombreGrupoAtributo
    store.data.forEach(el => {
      linea = el
      nombreGrupoAtributo = store.gruposAtributos.find(grupo => grupo.id == el.grupoAtributosId)
      if (nombreGrupoAtributo != undefined) {
        linea.nombreGrupo = nombreGrupoAtributo.nombre
      }
      datos.push(linea)
    })
    if (datos.length > 0) {
      return datos
    } else if (datos.length === 0 && isFiltered) {
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
                  id='grupoAtributos'
                  name="grupoAtributos"
                  placeholder={`${intl.formatMessage({ id: 'Seleccione grupo de atributos' })}`}
                  value={getPadreOptions().find(e => e.value === filterPadre) || ""}
                  defaultValue={getPadreOptions().find(e => e.label === "Todos")}
                  options={getPadreOptions()}
                  theme={selectThemeColors}
                  onChange={handlePadreChange}
                />
                <Label for='atributoname'>{`${intl.formatMessage({ id: 'Filtro' })}`}</Label>
              </FormGroup>
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <FormGroup className='form-label-group'>
                <Input
                  type='text'
                  id='atributoname'
                  placeholder={filterPadre != null ? `${intl.formatMessage({ id: 'Nombre' })}` : `${intl.formatMessage({ id: 'Seleccione grupo' })}`}
                  defaultValue={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  disabled={filterPadre == null}
                />
                <Label for='atributoname'>{`${intl.formatMessage({ id: 'Filtro' })}`}</Label>
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

export default AtributosList
