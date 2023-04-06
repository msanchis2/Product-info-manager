// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addSituacion, updateSituacion, getSituacion, initSituacion } from '../store/action'

// ** Third Party Components
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

const SituacionAccountTab = (props) => {

  const store = useSelector(state => state.situaciones)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, control, formState: { errors } } = useForm({})
  const [situacionData, setSituacionData] = useState({})
  const [nuevoNombre, setNuevoNombre] = useState('')
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)

  useEffect(() => {
    if (isView && !ability.can("Situaciones", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Situaciones", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Situaciones", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

    // ** Function to get Categoria on mount
    useEffect(() => {
      store.selectedSituacion = {}
      if (id) {
        dispatch(getSituacion(parseInt(id)))
      } else {
        dispatch(initSituacion())
      }
    }, [id])

    useEffect(() => {
      if (store.selectedSituacion) {
        setSituacionData(store.selectedSituacion)
      } 
    }, [store.selectedSituacion])

  // ** Function to handle form submit
  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      const situacionObj = { nombre: nuevoNombre }
      if (isNew) {
        dispatch(addSituacion(situacionObj))
      } else {
        dispatch(updateSituacion(id, situacionObj))
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Situaciones" /></CardTitle>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Nombre'>
                  <FormattedMessage id="Nombre" />
                </Label>
                <Controller
                  control={control}
                  name='Nombre'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Nombre'
                      placeholder={`${intl.formatMessage({ id: 'Nombre' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Nombre'] })}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      defaultValue={situacionData && situacionData.nombre}
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
            <Button color='secondary' outline tag={Link} to='/situaciones/'>
              <FormattedMessage id="Atras" />
            </Button>
          </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

SituacionAccountTab.propTypes = {
  selectedSituacion: Proptypes.any
}

export default SituacionAccountTab

