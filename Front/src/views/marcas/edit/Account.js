// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addmarca, updatemarca, getmarca, initmarca } from '../store/action'
// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup, CustomInput } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Proptypes from 'prop-types'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'
// ** Utils
import { isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'

const marcaAccountTab = (props) => {

  const store = useSelector(state => state.marcas)
  const storeLayout = useSelector(state => state.layout)
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { control, formState: { errors } } = useForm({})
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [color, setColor] = useState("#fffff")
  const [web, setWeb] = useState('')
  const [logo, setLogo] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  // ** Hook Traducciones
  const intl = useIntl()

  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Marcas", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Marcas", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Marcas", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

    // ** Function to get marca on mount
    useEffect(() => {
      store.selectedmarca = ""
      if (id) {
        dispatch(getmarca(parseInt(id)))
      } else {
        dispatch(initmarca())
      }
    }, [id])

    useEffect(() => {
      if (store.selectedmarca) {
        setNombre(store.selectedmarca.nombre || "")
        setCodigo(store.selectedmarca.codigo || "")
        setColor(store.selectedmarca.color || "#fffff")
        setWeb(store.selectedmarca.web || "")
        setLogo(store.selectedmarca.logo || "")
        setLogoUrl(store.selectedmarca.logo || "")
      } 
    }, [store.selectedmarca])
  
  // ** Function to handle form submit
  const handleSubmit = () => {
    if (isObjEmpty(errors)) {
      const marca = {
        empresaId: storeLayout.selectedEmpresaId,
        nombre,
        codigo,
        web,
        logo,
        color
      }
      if (isNew) {
        dispatch(addmarca(marca))
      } else {
        dispatch(updatemarca(id, marca))
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  function fileUploadInputChange({ target }) {
    setLogoUrl(URL.createObjectURL(target.files[0]))
    const reader = new FileReader()
    reader.onload = function (e) {
      setLogo(e.target.result)
    }
    reader.readAsDataURL(target.files[0])
  }

  return (
    <Row>
      <Col sm='12'>
        <Form>
          <CardTitle tag='h4'><FormattedMessage id="Marcas" /></CardTitle>
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
                      onChange={(e) => setNombre(e.target.value)}
                      defaultValue={nombre || ""}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Codigo'>
                  <FormattedMessage id="Código" />
                </Label>
                <Controller
                  control={control}
                  name='Nombre'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Codigo'
                      maxlength="3"
                      placeholder={`${intl.formatMessage({ id: 'Código' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Codigo'] })}
                      onChange={(e) => setCodigo(e.target.value)}
                      defaultValue={codigo || ""}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Web'>
                  <FormattedMessage id="Web" />
                </Label>
                <Controller
                  control={control}
                  name='Web'
                  render={({ field, onChange }) => (
                    <Input
                      type='link'
                      id='Web'
                      placeholder='Web'
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Web'] })}
                      onChange={(e) => setWeb(e.target.value)}
                      defaultValue={web || ""}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Color'>
                  <FormattedMessage id="Color" />
                </Label>
                <Controller
                  control={control}
                  name='Color'
                  render={({ field, onChange }) => (
                    <Input
                      type='color'
                      id={`${intl.formatMessage({ id: 'Color' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Color'] })}
                      onChange={(e) => setColor(e.target.value.toUpperCase())}
                      value={color || "ffffff"}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Logo'>
                  <FormattedMessage id="Logo" />
                </Label>
                <div className='d-flex'>
                <div>
                  <img
                    className='user-avatar rounded mr-2 my-25 cursor-pointer'
                    id='imagenLogo'
                    src={logoUrl}
                    alt='Logo'
                    height='70px'
                    width='70px'
                  />
                </div>
                <div>
                  <CustomInput
                    type="file"
                    id='Logo'
                    name='Logo'
                    label={"Seleccione Logo"}
                    onChange={fileUploadInputChange}
                  />
                </div>
                </div>
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
            {!isView &&
              <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={handleSubmit} color='primary'>
                <FormattedMessage id="Guardar" />
              </Button>
            }
            <Button color='secondary' outline tag={Link} to='/marcas/'>
              <FormattedMessage id="Atras" />
            </Button>
          </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

marcaAccountTab.propTypes = {
  selectedmarca: Proptypes.any
}

export default marcaAccountTab

