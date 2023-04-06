// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addEmpresa, updateEmpresa, getEmpresa, initEmpresa } from '../store/action'

// ** Third  Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

import Proptypes from 'prop-types'
// imports para Can
import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'
// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'

const EmpresaAccountTab = () => {
  const store = useSelector(state => state.empresas)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, control, formState: { errors } } = useForm({ })
  const [empresaData, setEmpresaData] = useState({})
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Empresas", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Empresas", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Empresas", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

    // ** Function to get Empresa on mount
    useEffect(() => {
      store.selectedEmpresa = {}
      if (id) {
        dispatch(getEmpresa(parseInt(id)))
      } else {
        dispatch(initEmpresa())
      }
    }, [dispatch, id])

  useEffect(() => {
    if (store.selectedEmpresa) {
      setEmpresaData(store.selectedEmpresa)
    } 
  }, [store.selectedEmpresa])
  
  // ** Function to handle form submit
  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      if (isNew) {
        const empresa = {
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          GLN: data.GLN
        }
        dispatch(addEmpresa(empresa))
      } else {
        const empresa = {
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          GLN: data.GLN
        }
        dispatch(updateEmpresa(id, empresa))
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Empresas" /></CardTitle>
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
                      defaultValue={empresaData && empresaData.codigo}
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
                      defaultValue={empresaData && empresaData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
            <FormGroup>
              <Label for='GLN'>
                <FormattedMessage id="GLN" />
              </Label>
              <Controller
                control={control}
                name='GLN'
                render={({ field, onChange }) => (
                  <Input
                    type='text'
                    id='GLN'
                    placeholder='GLN'
                    {...field}
                    required
                    className={classNames({ 'is-invalid': errors['Descripcion'] })}
                    onChange={(e) => onChange(e.target.value)}
                    defaultValue={empresaData && empresaData.GLN}
                  />
                )}
              />
            </FormGroup>
          </Col>
          </Row>
          <Row>
            <Col md='12' sm='12'>
              <FormGroup>
                <Label for='Descripcion'>
                  <FormattedMessage id="Descripción" />
                </Label>
                <Controller
                  control={control}
                  name='descripcion'
                  render={({ field, onChange }) => (
                    <Input
                      type='textarea'
                      id='Descripcion'
                      placeholder={`${intl.formatMessage({ id: 'Descripción' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Descripcion'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={empresaData && empresaData.descripcion}
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
              <Button color='secondary' outline tag={Link} to='/empresas/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

EmpresaAccountTab.propTypes = {
  selectedEmpresa: Proptypes.any
}

export default EmpresaAccountTab

