// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addRol, updateRol, getRol, initRol } from '../store/action'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup, CustomInput } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

import Proptypes from 'prop-types'

// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'

const RolAccountTab = () => {

  const store = useSelector(state => state.roles)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()
  // state para activo
  const [activo, setActivo] = useState(true)
  const [nombre, setNombre] = useState('')
  // ** Vars
  const { handleSubmit, control, formState: { errors } } = useForm({ })
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  // ** Update Rol on mount or change
  // ** Function to get Rol on mount
  useEffect(() => {
    store.selectedRol = {}
    if (id) {
      dispatch(getRol(parseInt(id)))
    } else {
      dispatch(initRol())
    }
  }, [id])

  useEffect(() => {
    if (store.selectedRol) {
      setNombre(store.selectedRol.nombre)
      const activoString = store.selectedRol.activo
      setActivo(activoString == "1")
    } 
  }, [store.selectedRol])

  // ** Function to handle form submit
  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      const rol = {
        nombre,
        activo: activo ? "1" : "0"
      }
      if (isNew) {
        dispatch(addRol(rol))
      } else {
        dispatch(updateRol(id, rol))
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Roles" /></CardTitle>
          <Row>
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
                      onChange={(e) => setNombre(e.target.value)}
                      defaultValue={nombre || ""}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='activo'>
                  <FormattedMessage id="activo" />
                </Label>

                {activo && <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id="Activo_Check"
                  defaultChecked={true}
                  onClick={() => setActivo(!activo)}
                />}
                {!activo && <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id="Activo_Check"
                  defaultChecked={false}
                  onClick={() => setActivo(!activo)}
                />}
                
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {!isView &&
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
                  <FormattedMessage id="Guardar" />
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/roles/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

RolAccountTab.propTypes = {
  selectedRol: Proptypes.any
}

export default RolAccountTab

