// ** React Imports
import { useState, useEffect } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import '@styles/react/libs/react-select/_react-select.scss'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addMultimedia, updateMultimedia, getMultimedia, updateProductoMultimedia, initMultimedia } from '../store/actions'
import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'
// ** Third Party Components
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
// ** Utils
import Select from 'react-select'

const MultimediaTab = () => {
  const store = useSelector(state => state.multimedia)
  // ** Store Vars
  const dispatch = useDispatch()
  const location = useLocation()
  // ** Vars
  const [multimediaData, setmultimediaData] = useState({})
  // ** Hook Traducciones
  const intl = useIntl()
  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const { id } = useParams()
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Multimedia", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Multimedia", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Multimedia", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])
  
// ** Update Grupoatributo on mount or change
  // ** Function to get Grupoatributo on mount
  useEffect(() => {
    store.selectedMultimedia = ""
    if (id) {
      dispatch(getMultimedia(parseInt(id)))
    } else {
      dispatch(initMultimedia())
    }
  }, [id])

  useEffect(() => {
    if (store.selectedMultimedia) {
      setmultimediaData(store.selectedMultimedia)
    } 
  }, [store.selectedMultimedia])

  const getMultimediaOptions = () => {
    // // Si existe en el array que contiene los ya cargados no los pintamos
    const types = ['Documento', 'Imagen', 'Video']
    return types.map(mult => {
      return { value: mult, label: mult }
    })
  }

  // ** Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const multimedia = {
      clave: multimediaData.clave,
      tipo:  multimediaData.tipo
    }
    if (isNew) {
      dispatch(addMultimedia(multimedia)) 
    } else {
      dispatch(updateMultimedia(id, multimedia))
      const prodMultimedia = store.todaMultimedia.filter(mult => mult.nombre.toLowerCase() == multimedia.clave.toLowerCase())
      let nuevoMult
      prodMultimedia.forEach(mult => {
        nuevoMult = {
          tipo: multimediaData.tipo,
          tagAecoc: mult.tagAecoc || "",
          objetivo: mult.objetivo || "",
          formato: mult.formato || "",
          principalSN: mult.principalSN || "",
          publicoSN: mult.publicoSN || ""
        }
        dispatch(updateProductoMultimedia(mult.id, nuevoMult))
      })
    }
    setTimeout(() => { history.go(-1) }, 1000)
  }

  const handleClaveChange = (target) => {
    const nuevoMult = multimediaData
    nuevoMult.clave = target
    setmultimediaData(nuevoMult)
  }

  const handleTipoChange = (target) => {
    const nuevoMult = multimediaData
    nuevoMult.tipo = target
    setmultimediaData(nuevoMult)
  }
  
  return (
    <Row>
      <Col sm='12'>
        <Form>
          <CardTitle tag='h4'><FormattedMessage id="Multimedia" /></CardTitle>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Clave'>
                  <FormattedMessage id="Clave" />
                </Label>
                <Input
                  type='text'
                  id='Clave'
                  placeholder={`${intl.formatMessage({ id: 'Clave' })}`}
                  required
                  onChange={(e) => handleClaveChange(e.target.value)}
                  defaultValue={multimediaData && multimediaData.clave}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Tipo'>
                  <FormattedMessage id="Tipo" />
                </Label>
                <Select
                  classNamePrefix='select'
                  required
                  name='multimedia_Tipos'
                  options={getMultimediaOptions()}
                  onChange={(e) => handleTipoChange(e.value)}
                  placeholder={multimediaData.tipo || "Selecciona..."}
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              {isEdit &&
                <Can I="Multimedia" a="PIM" field="Actualizar">
                  <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={handleSubmit} color='primary'>
                    <FormattedMessage id="Guardar" />
                  </Button>
                </Can>
              }
              {isNew &&
                <Can I="Multimedia" a="PIM" field="Nuevo">
                  <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' onClick={handleSubmit} color='primary'>
                    <FormattedMessage id="Guardar" />
                  </Button>
                </Can>
              }
              <Button color='secondary' outline tag={Link} to='/multimedia/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default MultimediaTab

