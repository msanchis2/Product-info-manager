// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addGrupoatributo, updateGrupoatributo, getGrupoatributo, initGrupoatributo } from '../store/action'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'
// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'

const GrupoatributoAccountTab = () => {

  const store = useSelector(state => state.grupoatributos)
  const storeLayout = useSelector(state => state.layout)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, control, formState: { errors } } = useForm({})
  const [grupoatributoData, setGrupoatributoData] = useState({})
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("GrupoAtributos", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("GrupoAtributos", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("GrupoAtributos", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])
  // ** Update Grupoatributo on mount or change
  // ** Function to get Grupoatributo on mount
  useEffect(() => {
    store.selectedGrupoatributo = ""
    if (id) {
      dispatch(getGrupoatributo(parseInt(id)))
    } else {
      dispatch(initGrupoatributo())
    }
  }, [id])

  useEffect(() => {
    if (store.selectedGrupoatributo) {
      setGrupoatributoData(store.selectedGrupoatributo)
    } 
  }, [store.selectedGrupoatributo])


  // ** Function to handle form submit
  const onSubmit = (data) => {

    if (isObjEmpty(errors)) {
      if (isNew) {
        const grupoatributo = {
          empresaId: storeLayout.selectedEmpresaId,
          codigo: data.codigo,
          nombre: data.nombre
        }
        dispatch(
          addGrupoatributo(grupoatributo)
        )
      } else {
        const grupoatributo = {
          empresaId: storeLayout.selectedEmpresaId,
          codigo: data.codigo,
          nombre: data.nombre
        }
        dispatch(
          updateGrupoatributo(id, grupoatributo)
        )
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Grupos de Atributos" /></CardTitle>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Codigo'>
                  <FormattedMessage id="Código" />
                </Label>
                <Controller
                  control={control}
                  name='codigo'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Codigo'
                      placeholder={`${intl.formatMessage({ id: 'Código' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Codigo'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={grupoatributoData && grupoatributoData.codigo}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Nombre'>
                  <FormattedMessage id="Nombre" />
                </Label>
                <Controller
                  control={control}
                  name='nombre'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Nombre'
                      placeholder={`${intl.formatMessage({ id: 'Nombre' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Nombre'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={grupoatributoData && grupoatributoData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {!isView &&
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
                  <FormattedMessage id="Guardar" />
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/grupo-atributos/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default GrupoatributoAccountTab

