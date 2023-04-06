// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addIdioma, updateIdioma, getIdioma, initIdioma } from '../store/action'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Media, Row, Col, Button, Form, Input, Label, FormGroup, CustomInput } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'

const IdiomaAccountTab = (props) => {
  const store = useSelector(state => state.idiomas)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, setValue, control, formState: { errors } } = useForm({ })
  const [idiomaData, setIdiomaData] = useState({})
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  // ** Update Idioma on mount or change
  useEffect(() => {
    if (store.selectedIdioma) {
      setIdiomaData(store.selectedIdioma)
      if (store.selectedIdioma.id) {
        setValue('activoSn', store.selectedIdioma.activoSn.toLowerCase() === "s")
        setValue('Locale', store.selectedIdioma.locale)
      }
    } else {
      setIdiomaData({})
      setValue('activoSn', false)
      setValue('Locale', false)
    }
  }, [store.selectedIdioma])

  
  // ** Function to get Idioma on mount
  useEffect(() => {
    store.selectedIdioma = {}
    if (id) {
      dispatch(getIdioma(parseInt(id)))
    } else {
      dispatch(initIdioma())
    }
  }, [])

  // ** Function to handle form submit
  const onSubmit = (data) => {

    if (isObjEmpty(errors)) {
      if (isNew) {
        const idioma = {
          nombre: data.nombre,
          activoSn: data.activoSn ? "S" : "N",
          locale: data.locale
        }
        dispatch(
          addIdioma(idioma)
        )
      } else {
        const idioma = {
          nombre: data.nombre,
          activoSn: data.activoSn ? "S" : "N",
          locale: data.locale
        }
        dispatch(
          updateIdioma(id, idioma)
        )
      }
      history.go(-1)
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Idiomas" /></CardTitle>
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
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={idiomaData && idiomaData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Locale'>
                  <FormattedMessage id="Locale" />
                </Label>
                <Controller
                  control={control}
                  name='locale'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Locale'
                      placeholder={`${intl.formatMessage({ id: 'Local' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Locale'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={idiomaData && idiomaData.locale}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='active'>
                  <FormattedMessage id="Activo" />
                </Label>
                <Controller
                  control={control}
                  name='activoSn'
                  value={idiomaData?.activoSn?.toLowerCase() === "s"}
                  render={({ name, value, onChange }) => (
                    <CustomInput
                      className='custom-control-primary'
                      type='switch'
                      id='activoSn'
                      name={name}
                      disabled={isView}
                      onChange={(e) => onChange(e.target.checked)}
                      checked={value}
                    />
                  )
                  }
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {!isView &&
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
                  <FormattedMessage id="Guardar" />
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/idiomas/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default IdiomaAccountTab

