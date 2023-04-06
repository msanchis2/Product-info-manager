// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
//import { useNavigate } from '@reach/router'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addCategoria, updateCategoria, getCategoria, initCategoria } from '../store/action'
import Select from 'react-select'
// ** Third Party Components
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'
const CategoriaAccountTab = () => {

  //const { selectedCategoria } = props
  const store = useSelector(state => state.categorias)
  const storeLayout = useSelector(state => state.layout)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()
  // ** Vars
  const [categoriaData, setCategoriaData] = useState({nombre: '', padre: '', codigo: '', codigoAECOC: '', tagAecoc: ''})
  const [padresOptions, setPadresOptions] = useState([])
  const [padre, setPadre] = useState('')
  // ** Hook Traducciones
  const intl = useIntl()

  // ** States
  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Categorias", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Categorias", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Categorias", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index
  }

    // ** Function to get Categoria on mount
    useEffect(() => {
      store.selectedCategoria = {}
      if (id) {
        dispatch(getCategoria(parseInt(id)))
      } else {
        dispatch(initCategoria())
      }
    }, [id])

    useEffect(() => {
      if (store.selectedCategoria) {
        setCategoriaData(store.selectedCategoria)
        setPadre(store.selectedCategoria.padre || '')
      } 
    }, [store.selectedCategoria])

  useEffect(() => {
    const categories = []
    const arrayCategories = [{value: '', label: '-- Sin padre --'}]
    store.categorias.forEach(el => { categories.push(el.codigo) })
    const uniqueCategories = categories.filter(onlyUnique)
    uniqueCategories.forEach(categoria => {
      arrayCategories.push({ value: categoria, label: categoria }) 
    })
    setPadresOptions(arrayCategories)
  }, [store.categorias])

  const handlePadreChange = (e) => {
    categoriaData.padre = e.value
    setPadre(e.value)
  }

  // ** Function to handle form submit
  const handleSubmit = (ev) => {
    ev.preventDefault()
    categoriaData.empresaId = storeLayout.selectedEmpresaId
    if (categoriaData.tagAecoc == null) { categoriaData.tagAecoc = '' }
    if (categoriaData.codigoAECOC == null) { categoriaData.codigoAECOC = '' }
    if (isNew) {
      dispatch(addCategoria(categoriaData))
    } else {
      dispatch(updateCategoria(id, categoriaData))
    }
    setTimeout(() => { history.go(-1) }, 1000)
  }

  return (
    <Row>
      <Col sm='12'>
        <Form>
          <CardTitle tag='h4'><FormattedMessage id="Categorias" /></CardTitle>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Codigo'>
                  <FormattedMessage id="Código" />
                </Label>
                    <Input
                      type='text'
                      id='Codigo'
                      placeholder={`${intl.formatMessage({ id: 'Código' })}`}
                      required
                      onChange={(e) => { categoriaData.codigo = e.target.value }}
                      defaultValue={categoriaData && categoriaData.codigo}
                    />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Codigo'>
                  <FormattedMessage id="Tag Aecoc" />
                </Label>
                  <Input
                    type='text'
                    id='tagAecoc'
                    placeholder='Tag Aecoc'
                    onChange={(e) => { categoriaData.tagAecoc = e.target.value }}
                    defaultValue={categoriaData && categoriaData.tagAecoc}
                  />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='CodigoAECOC'>
                  <FormattedMessage id="Código AECOC" />
                </Label>
                  <Input
                    type='text'
                    id='CodigoAECOC'
                    placeholder={`${intl.formatMessage({ id: 'Código AECOC' })}`}
                    onChange={(e) => { categoriaData.codigoAECOC = e.target.value }}
                    defaultValue={categoriaData && categoriaData.codigoAECOC}
                  />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Nombre'>
                  <FormattedMessage id="Nombre" />
                </Label>
                  <Input
                    type='text'
                    id='Nombre'
                    placeholder={`${intl.formatMessage({ id: 'Nombre' })}`}
                    required
                    onChange={(e) => { categoriaData.nombre = e.target.value }}
                    defaultValue={categoriaData && categoriaData.nombre}
                  />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Padre'>
                  <FormattedMessage id="Padre" />
                </Label>
                <Select
                  options={padresOptions}
                  placeholder="Selecciona padre"
                  onChange={(e) => { handlePadreChange(e) } }
                  value={padresOptions.find(el => el.value == padre)}
                  id='categoriasPadre'
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {!isView &&
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={handleSubmit} color='primary'>
                  <FormattedMessage id="Guardar"/>
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/categorias/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default CategoriaAccountTab

