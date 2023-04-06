// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import Select from 'react-select'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addIntegracion, updateIntegracion, getIntegracion, getData, initintegracion } from '../store/action'
// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { CardTitle, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'
// ** Utils
import { selectThemeColors, isObjEmpty } from '@src/utility/Utils'
import classNames from 'classnames'
import Swal from 'sweetalert2'


const integracionAccountTab = (props) => {
  // ** Store Vars
  const store = useSelector(state => state.integracion)
  const [integracionData, setIntegracionData] = useState({})
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  // ** Vars
  const { handleSubmit, control, formState: { errors } } = useForm({ })
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tabla, setTabla] = useState('')
  const [tablasArr, setTablasArr] = useState([])
  const [nombresDeTablas, setNombresDeTablas] = useState([])
  const [camposTabla, setCamposTabla] = useState('')
  const tablasIgnoradas = ['columnasbbdd', 'refreshtoken', 'idiomas', 'plantilla']
  const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
  let cont = 0
  let letra
  // ** Hook Traducciones
  const intl = useIntl()
  // ** Checkeamos si la ruta es de Vista para ocultar boton de guardar
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Integracion", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Integracion", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Integracion", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

    // ** Function to get integracion on mount
    useEffect(() => {
      store.selectedIntegracion = {}
      dispatch(getData())
      if (id) {
        dispatch(getIntegracion(parseInt(id)))
      } else {
        dispatch(initintegracion())
      }
    }, [id])

  useEffect(() => {
    if (store.selectedIntegracion != undefined && !isNew) {
      setIntegracionData(store.selectedIntegracion)
      setNuevoNombre(store.selectedIntegracion.nombre)
      setTabla(store.selectedIntegracion.tabla)
      setDescripcion(store.selectedIntegracion.descripcion)
    }
    if (store.tablas != undefined) {
      const tablasOrganizadas = []
      let camposOrdenados = []
      const nombresTablas = []
      let iteracion
      
      for (let i = 0; i < store.tablas.length; i++) {
        iteracion = store.tablas[i]
        if (!tablasIgnoradas.includes(iteracion.nombreTabla)) {
          if (tablasOrganizadas[iteracion.nombreTabla] == undefined) {
            tablasOrganizadas[iteracion.nombreTabla] = []
            nombresTablas.push(iteracion.nombreTabla)
          }
          tablasOrganizadas[iteracion.nombreTabla].push({campo: iteracion.campo, nullable: iteracion.nullable, tipo: iteracion.tipo})
        }
      }
      setTablasArr(tablasOrganizadas)
      setNombresDeTablas(nombresTablas)

      if (isNew && tabla != '') {
        camposOrdenados = tablasOrganizadas[tabla]
      } else if (!isNew && tabla != '' && store.selectedIntegracion.cabecera != undefined) {
        const ordenIntegracion = store.selectedIntegracion.cabecera.split(",")
        ordenIntegracion.forEach(el => {
          if (tablasOrganizadas[tabla] != undefined) {
            camposOrdenados.push(tablasOrganizadas[tabla].find(item => item.campo.toLowerCase() == el.toLowerCase())) 
          }
        })
      }
      setCamposTabla(camposOrdenados)
    }
  }, [store.tablas, store.selectedIntegracion])

  const getTablaOptions = () => {
      return nombresDeTablas.map(table => {
        return { value: table, label: table }
      })
  }

  const getLetrasOptions = (numLetras) => {
    const letras = abecedario.slice(0, numLetras)
    return letras.map(l => {
      return { value: l, label: l }
    })
  }

  function esObligatorio (nulable)  {
    return nulable == 'YES' ? '' : '2px solid #7367F0'
  }

  const handleTablaChange = (target) => {
    setTimeout(() => {
      const tablaSelec = tablasArr[target.value]
      setTabla(target.value)
      setCamposTabla(tablaSelec)
      cont = 0
    }, 100)
    
  }

  // ** Function to handle form submit
  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      if (tabla != "" && tabla != undefined) {
        //Recogemos datos de los selects
        const selects = document.querySelectorAll('.excel')
        const selectsArr = Array.from(selects)
        const nuevaCabecera = []
        let letraindex
        let repetido = false
        for (let i = 0; i < selectsArr.length; i++) {
          letraindex = abecedario.indexOf(selectsArr[i].lastChild.value)
          if (nuevaCabecera[letraindex] == undefined) { 
            nuevaCabecera[letraindex] = camposTabla[i].campo
          } else {
            repetido = true
            break
          }
        }
        const cabeceraStr = nuevaCabecera.toString()
        if (!repetido) {
          //Insertamos o actualizamos
          const integracion = {
            nombre: nuevoNombre,
            descripcion,
            cabecera: cabeceraStr,
            tabla,
            idEmpresa: 1
          }
          if (isNew) {
            dispatch(
              addIntegracion(integracion)
            )
          } else {
            dispatch(updateIntegracion(id, integracion))
          }
          setTimeout(() => { history.go(-1) }, 1000)
        } else {
          Swal.fire({
            title: `${intl.formatMessage({ id: 'Valor duplicado' })}`,
            text: `${intl.formatMessage({ id: 'Seleccione un campo una sola vez' })}`,
            icon: 'error'
          })
        }
      } else {
        Swal.fire({
          title: `${intl.formatMessage({ id: 'Campo vacio' })}`,
          text: `${intl.formatMessage({ id: 'Selecciona una tabla por favor' })}`,
          icon: 'error'
        })
      } 
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Integraciones" /></CardTitle>
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
                      placeholder= {`${intl.formatMessage({ id: 'Nombre' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Nombre'] })}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      defaultValue={integracionData && integracionData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Tabla'>
                  <FormattedMessage id="Tabla" />
                </Label>
                <Select
                  className='react-select'
                  classNamePrefix='select'
                  id='Tabla'
                  name="Tabla"
                  placeholder={`${intl.formatMessage({ id: 'Seleccione tabla' })}`}
                  defaultValue={getTablaOptions() && getTablaOptions().find(t => t.value === tabla)}
                  value={getTablaOptions() && getTablaOptions().find(t => t.value === tabla)}
                  options={getTablaOptions()}
                  theme={selectThemeColors}
                  onChange={handleTablaChange}
                  required
                />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
            <FormGroup>
              <Label for='Descripcion'>
                <FormattedMessage id="Descripción" />
              </Label>
              <Controller
                control={control}
                name='Descripcion'
                render={({ field, onChange }) => (
                  <Input
                    type='text'
                    id='Descripcion'
                    placeholder={`${intl.formatMessage({ id: 'Descripción' })}`}
                    {...field}
                    required
                    className={classNames({ 'is-invalid': errors['Descripcion'] })}
                    onChange={(e) => setDescripcion(e.target.value)}
                    defaultValue={integracionData && integracionData.descripcion}
                  />
                )}
              />
            </FormGroup>
          </Col>

          <Col md='4' sm='12'>
            <FormGroup>
              <Label for='Cabecera'>
                <FormattedMessage id="Cabecera" />
              </Label>
              {
                camposTabla && camposTabla.map(campo => {
                  if (campo == undefined) { return null }
                  letra = abecedario[cont]
                  cont++
                  return (
                    <Col md='12' sm='12'>
                      <div className='d-flex'>
                        <div className='mt-2 mr-2' style={{width: '200px'}}>
                          <Select
                            className='react-select, excel'
                            classNamePrefix='select'
                            id={'excel-'.concat(campo.campo)}
                            name={'excel-'.concat(campo.campo)}
                            placeholder={`${intl.formatMessage({ id: 'Seleccione campo' })}`}
                            defaultValue={getLetrasOptions(camposTabla.length).find(el => el.value == letra)}
                            options={getLetrasOptions(camposTabla.length)}
                            theme={selectThemeColors}
                            disabled
                          />
                        </div>
                        <div className='mt-2 mr-2' style={{width: '300px'}}>
                          <Input
                            type="text"
                            id={'excel-'.concat(campo.campo).concat('-').concat(tabla)}
                            name={'excel-'.concat(campo.campo).concat('-').concat(tabla)}
                            value={campo.campo}
                            disabled={true}
                            style={{border:  esObligatorio(campo.nullable) }}
                          />
                        </div>
                      </div>
                    </Col>
                  )
                })

              }
            </FormGroup>
          </Col>

            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
            {!isView &&
              <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
                <FormattedMessage id="Guardar" />
              </Button>
            }
            <Button color='secondary' outline tag={Link} to='/integracion/'>
              <FormattedMessage id="Atras" />
            </Button>
          </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default integracionAccountTab

