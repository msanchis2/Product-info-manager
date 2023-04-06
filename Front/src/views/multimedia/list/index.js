// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import BreadCrumbs from '@components/breadcrumbs'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'

// ** Store & Actions
import { getData, deleteMultimedia } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Modal from '@src/components/modal-confirm'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'

const CustomHeader = ({ handleFilter, searchterm, handlePerPage, rowsPerPage }) => {
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
          <Can I="Multimedia" a="PIM" field="Nuevo">
            <Button.Ripple tag={Link} to='/multimedia/new' color='primary'>
              <FormattedMessage id="Nuevo"></FormattedMessage>
            </Button.Ripple>
          </Can>

        </Col>

      </Row>
    </div>
  )
}
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
const MultimediaList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.multimedia)
  const storeLayout = useSelector(state => state.layout)
  // Ability
  const ability = useAbility(AbilityContext)

  const [searchterm, setsearchterm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [toDelete, setToDelete] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterPadre, setFilterPadre] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: <FormattedMessage id='Select Status' />, number: 0 })


  const toggleModal = () => setModalOpen(!modalOpen)
  const intl = useIntl()

  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        grupoMultimedia: filterPadre,
        q: searchterm
      })
    )
  }, [searchterm, currentPage, filterPadre, rowsPerPage, storeLayout.selectedEmpresaId]) // Agregar aquí si se necesita refetchear según cambie alguna variable más,
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchterm
      })
    )
  }, [])

  if (!ability.can("Multimedia", "PIM", "Ver")) {
    return null
  }

  const handleFilter = val => {
    setsearchterm(val)
  }
  const handleDelete = () => {
    toggleModal()
    dispatch(
      deleteMultimedia(toDelete)
    )
  }
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }
  const handleDeleteModal = (id) => {
    toggleModal()
    setToDelete(id)
  }
  function uniqIter(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1]
    })
  }
  function getPadreOptions() {
    //Obtenemos las categorías unícas para no repetir registros
    const uniqueCategories = uniqIter(store.categorias.map(categoria => categoria.padre))
    //devolvemos los datos filtrados
    const arrayCategories = uniqueCategories.map(categoria => {
      return { value: categoria, label: `${categoria}` }
    })
    arrayCategories.push({ value: null, label: 'Todos' })
    return arrayCategories
  }
  const getMultimediaOptions = () => {
    // // Si existe en el array que contiene los ya cargados no los pintamos
    const types = ['Selecciona...', 'Documento', 'Imagen', 'Video']

    return types.map(mult => {
      return { value: mult, label: mult }
    })


  }
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  const getDeleteTitle = () => {
    return intl.formatMessage({ id: 'Borrar Multimedia' })
  }
  const getDeleteMessage = () => {
    // const selectedMultimedia = store.allData.find(multimedia => multimedia.id === toDelete)
    const selectedMultimedia = store.selectedMultimedia
    return `¿Realmente desea eliminar el registro ${selectedMultimedia?.clave}?`
  }
  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

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

  const handlePadreChange = padre => {
    if (padre.value == "Selecciona...") {
      setFilterPadre("")

    } else {
      setFilterPadre(padre.value)

    }
  }
  const dataToRender = () => {
    const filters = {
      q: searchterm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data?.length > 0) {
      return store.data
    } else if (store.data?.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  if (!storeLayout.selectedEmpresaId) return null

  return (
    <div className='invoice-list-wrapper'>
    <BreadCrumbs breadCrumbTitle='Multimedia' breadCrumbParent='Multimedia' breadCrumbActive='Lista' />
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
                  placeholder={`${intl.formatMessage({ id: 'Seleccione un tipo de Documento' })}`}
                  options={getMultimediaOptions()}
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
                  placeholder={`${intl.formatMessage({ id: 'Nombre de multimedia' })}`}
                  defaultValue={currentSearch}
                  onChange={e => {
                    setCurrentSearch(e.target.value)
                    dispatch(
                      getData({
                        perPage: rowsPerPage,
                        search: e.target.value,
                        searchInputs: e.target.value,
                        q: searchterm
                      })
                    )
                  }}
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
            columns={columns(handleDeleteModal, store.todaMultimedia)}
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
      <Modal open={modalOpen} toggleModal={toggleModal} submitAction={handleDelete} message={getDeleteMessage()} title={getDeleteTitle()} />

    </div>
  )
}

export default MultimediaList
