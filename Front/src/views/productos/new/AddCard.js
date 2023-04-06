// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { selectThemeColors, devuelveBasePath } from '@src/utility/Utils'
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  CustomInput,
  Button
} from 'reactstrap'
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNewProducto} from '../store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'


const AddCard = () => {
  const [values, setValues] = useState({})
  const intl = useIntl()
  const [imagenPrincipalUrl, setImagenPrincipalUrl] = useState(`${devuelveBasePath()}/multimedia/no-image.jpg`)
  const store = useSelector(state => state.productos)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (store?.newId) history.push(`/productos/edit/${store.newId}`)
  }, [store?.newId])

  const handleFilesChange = ({target}) => {
    setImagenPrincipalUrl(URL.createObjectURL(target.files[0]))
    // Si no seleccionan limpiamos
    if (!target.files.length) return setValues(prevState => {
      return {
        ...prevState,
        [target.name]: null
      }
    })
    // Sino lo guardamos
    setValues(prevState => {
      return {
        ...prevState,
        [target.name]: target.files[0]
      }
    })
  }

  const handleTextChange = ({target}) => {
    // Sino lo guardamos
    setValues(prevState => {
      return {
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleCategoriaChange = (target) => {
    // Sino lo guardamos
    setValues(prevState => {
      return {
        ...prevState,
        ['categorias']: target.value
      }
    })
  }

  const getCategoriaOptions = () => {
    if (store.categorias != undefined) {
      return store.categorias.map(cat => {
        return { value: `${cat.codigo}`, label: `${cat.nombre}` }
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createNewProducto({...values}))
  }
  
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
      <Button type="submit" className='mr-1 mb-1' color='primary' tag='button'>Crear</Button>
        <Card className='invoice-preview-card mb-0 p-1'>
          <CardBody className='invoice-padding pt-2'>
            <Row className='row-bill-to invoice-spacing align-items-center'>
              <Col className='col-bill-to pl-2' lg='3'>
                <img style={{ maxWidth: "150px", maxHeight: "150px"}} className='img-fluid product-img rounded' src={imagenPrincipalUrl}/>
              </Col>
              <Col className='col-bill-to pl-0' lg='3'>
                <h6 className='invoice-to-title'>Nombre:</h6>
                <div className='invoice-customer'>
                  <Fragment>
                    <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                    <Input
                      type='text'
                      id="nombre"
                      name="nombre"
                      className='invoice-edit-input'
                      value={values.nombre || ""}
                      required={true}
                      placeholder='Ingrese nombre de producto'
                      onChange={handleTextChange}
                    />
                  </InputGroup>
                  </Fragment>
                </div>
              </Col>
              <Col className='col-bill-to pl-0' lg='3'>
                <h6 className='invoice-to-title'><FormattedMessage id="Categoría"></FormattedMessage>:</h6>
                  <div className='invoice-customer'>
                    <Fragment>
                      <Select
                        className='react-select'
                        classNamePrefix='select'
                        id='categorias'
                        name="categorias"
                        placeholder={`${intl.formatMessage({ id: 'Seleccione categoría' })}`}
                        value={getCategoriaOptions() && getCategoriaOptions().find(cat => cat.value === values.categorias)}
                        options={getCategoriaOptions()}
                        theme={selectThemeColors}
                        onChange={handleCategoriaChange}
                        maxMenuHeight={170}
                      />
                    </Fragment>
                  </div>
                </Col>
              <Col className='col-bill-to pl-0' lg='2'>
                <h6 className='invoice-to-title'>Imagen Principal:</h6>
                <div className='invoice-customer'>
                  <Fragment>
                    <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                    <CustomInput
                      type="file"
                      id="imagenPrincipal"
                      name="imagenPrincipal"
                      label={'Seleccione una imagen'}
                      required={true}
                      onChange={handleFilesChange}
                      />
                  </InputGroup>
                  </Fragment>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </Fragment>
  )
}

export default AddCard
