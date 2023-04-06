// ** React Imports
import { useState, useEffect, SyntheticEvent } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addTraduccion, updateTraduccion, getLanguagebyId } from '../store/action'

// ** Third Party Components
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { CardTitle, Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Badge } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

import Proptypes, { InferProps } from 'prop-types'

// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'
import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'

const defaultValues = {
  Name: '',
  Codigo: ''
}

const EmpresaAccountTab = (props) => {

  const { selectedEmpresa } = props
  const store = useSelector(state => state.traducciones)
  const [checkValue, setCheckValue] = useState({})
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, setValue, getValues, control, formState: { errors }, register } = useForm({ defaultValues })
  const [traduccionData, settraduccionData] = useState({})
  // ** Hook Traducciones
  const intl = useIntl()

  // ** States
  const [isNewRecord, setIsNewRecord] = useState(!id)
  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Traducciones", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Traducciones", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Traducciones", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

  // ** Function to handle form submit
  const onSubmit = (data) => {

    if (isObjEmpty(errors)) {
      if (isNewRecord) {
        const traduccion = {
          idioma: data.idioma,
          clave: data.clave,
          valor: data.valor
        }
        dispatch(
          addTraduccion(traduccion)
        )
      } else {
        const traduccion = {
          idioma: data.idioma,
          clave: data.clave,
          valor: data.valor
        }
        dispatch(
          updateTraduccion(id, traduccion)
        )
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Traducciones" /></CardTitle>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Idioma'>
                  <FormattedMessage id="Idioma" />
                </Label>
                <Controller
                  control={control}
                  name='idioma'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Idioma'
                      placeholder='Idioma'
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Idioma'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={traduccionData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Clave'>
                  <FormattedMessage id="Clave" />
                </Label>
                <Controller
                  control={control}
                  name='clave'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Clave'
                      placeholder='Clave'
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Clave'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={traduccionData && traduccionData.clave}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Valor'>
                  <FormattedMessage id="Valor" />
                </Label>
                <Controller
                  control={control}
                  name='valor'
                  render={({ field, onChange }) => (
                    <Input
                      type='input'
                      id='Valor'
                      placeholder='Valor'
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Valor'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={traduccionData && traduccionData.valor}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {!isView &&
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  <FormattedMessage id="Guardar" />
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/traducciones/'>
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

