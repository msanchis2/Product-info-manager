import { useState, useEffect, SyntheticEvent } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUsuario, updateUsuario, getUsuario } from '../store/action'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { CardTitle, Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Badge } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Proptypes, { InferProps } from 'prop-types'
import Avatar from '@components/avatar'
import { Lock, Edit, Trash2 } from 'react-feather'
// imports para Can
import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'

import Select from 'react-select'

import { getData, getRoles } from '../../permisos/store/action'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@src/utility/Utils'
import classNames from 'classnames'

const defaultValues = {
  empresaId: '',
  nombre: '',
  mail: '',
  activoSn: '',
  telefono: '',
  avatar: '',
  password: ''
}

const statusObj = {
  activo: 'light-success',
  inactivo: 'light-secondary',
  '': ''
}

const getStatusText = (user) => {
  if (user?.activoSn?.toLowerCase() == 's') {
    return 'activo'
  } else {
    return 'inactivo'
  }
}

const UsuarioAccountTab = () => {
  const store = useSelector(state => state)
  const storeLayout = useSelector(state => state.layout)

  const location = useLocation()
  const intl = useIntl()

  const { handleSubmit, setValue, control, formState: { errors } } = useForm({ defaultValues })
  const [usuarioData, setUsuarioData] = useState({})

  // ** State
  const [img, setImg] = useState(null)
  const [filterRol, setFilterRol] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const isNewRecord = !location.pathname.includes('edit')
  // ** Update Usuario on mount or change
  const selectedUsuario = store.usuarios.selectedUsuario
  const dispatch = useDispatch(),
    { id } = useParams()

    const isView = location.pathname.includes('view')
    const isNew = location.pathname.includes('new')
    const isEdit = location.pathname.includes('edit')
    const ability = useAbility(AbilityContext)
    
    useEffect(() => {
      if (isView && !ability.can("Usuarios", "PIM", "Ver")) {
        history.go(-1)
      }
      if (isNew && !ability.can("Usuarios", "PIM", "Nuevo")) {
        history.go(-1)
      }
      if (isEdit && !ability.can("Usuarios", "PIM", "Actualizar")) {
        history.go(-1)
      }
    }, [ability])

  useEffect(() => {
    if (id) {
      dispatch(getUsuario(parseInt(id)))
    } else {
      setUsuarioData({})
      setValue('activoSn', false)
      setValue('mail', "")
      setValue('nombre', "")
      setValue('telefono', "")
      setValue('empresaId', "")
      setValue('rolesId', "")
      setImg(null)
    }
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchTerm
      })
    )
    dispatch(
      getRoles()
    )
  }, [dispatch, id])

  useEffect(() => {
    if (selectedUsuario) {
      setUsuarioData(selectedUsuario)
      setValue('activoSn', selectedUsuario.activoSn.toLowerCase() === "s")
      setValue('mail', selectedUsuario.mail)
      setValue('nombre', selectedUsuario.nombre)
      setValue('telefono', selectedUsuario.telefono)
      setValue('empresaId', selectedUsuario.empresaId)
      setValue('rolesId', parseInt(selectedUsuario.rolesId))
      setFilterRol(parseInt(selectedUsuario.rolesId))

      if (selectedUsuario.avatar?.length) {
        return setImg(selectedUsuario.avatar)
      } else {
        return setImg(null)
      }
    } else {
      setUsuarioData({})
      setValue('activoSn', false)
      setValue('mail', "")
      setValue('nombre', "")
      setValue('telefono', "")
      setValue('empresaId', "")
      setValue('rolesId', "")
      setImg(null)
    }
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchTerm
      })
    )
    dispatch(
      getRoles()
    )
  }, [selectedUsuario])

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      if (isNewRecord) {
        const usuario = {
          empresaId: parseInt(storeLayout.selectedEmpresaId),
          nombre: data.nombre,
          mail: data.mail,
          activoSn: data.activoSn ? "S" : "N",
          telefono: data.telefono,
          avatar: img || "",
          password: data.password,
          rolesId: filterRol,
          role: filterRol == 0 ? 'api' : 'admin'
        }
        dispatch(
          addUsuario(usuario)
        )
      } else {
        const usuario = {
          empresaId: parseInt(storeLayout.selectedEmpresaId),
          nombre: data.nombre,
          mail: data.mail,
          activoSn: data.activoSn ? "S" : "N",
          telefono: data.telefono,
          avatar: img || "",
          password: data.password,
          rolesId: filterRol,
          role: filterRol == 0 ? 'api' : 'admin'
        }
        dispatch(
          updateUsuario(selectedUsuario.id, usuario)
        )
      }
      setTimeout(() => { history.go(-1) }, 1000)
    }
  }

  const renderUserAvatar = () => {
    if (img) {
      return <img
        className='user-avatar rounded mr-2 my-25 cursor-pointer'
        src={img}
        alt='user profile avatar'
        height='90px'
        width='90px'
      />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
          content={selectedUsuario?.nombre || 'John Doe'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    }
  }

  const handleRolChange = usuario => {
    setFilterRol(usuario.value)
  }

  function fileUploadInputChange(e) {
    const reader = new FileReader()
    reader.onload = function (e) {
      setImg(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  function getRolesOptions() {
    const arrayRoles = store.permisos?.roles.map(rol => {
      return { value: rol.id, label: `${rol.nombre}` }
    })
    return arrayRoles
  }

  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
          {renderUserAvatar()}
          <Media className='mt-50' body>
            <h4>{selectedUsuario?.nombre}</h4>
            <div className='d-flex flex-wrap mt-1 px-0'>
              <Badge className='text-capitalize' color={statusObj[getStatusText(usuarioData)]} >
                {getStatusText(usuarioData)}
              </Badge>
            </div>
            {!isView && <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0 mt-1' color='primary'>
              <span className='d-none d-sm-block'>
                <FormattedMessage id="Cambiar Imagen de Avatar" />
              </span>
              <span className='d-block d-sm-none'>
                <Edit size={14} />
              </span>
              <input type='file' hidden id='change-img' onChange={(e) => fileUploadInputChange(e)} accept='image/*' />
            </Button.Ripple>}
          </Media>
        </Media>
      </Col>
      <Col sm='12'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardTitle tag='h4'><FormattedMessage id="Usuarios" /></CardTitle>
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
                      defaultValue={usuarioData && usuarioData.nombre}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Mail'>
                  <FormattedMessage id="Correo" />
                </Label>
                <Controller
                  control={control}
                  name='mail'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Mail'
                      placeholder={`${intl.formatMessage({ id: 'Mail' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Mail'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={usuarioData && usuarioData.mail}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='Telefono'>
                  <FormattedMessage id="Teléfono" />
                </Label>
                <Controller
                  control={control}
                  name='telefono'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      id='Telefono'
                      placeholder={`${intl.formatMessage({ id: 'Teléfono' })}`}
                      {...field}
                      required
                      className={classNames({ 'is-invalid': errors['Telefono'] })}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={usuarioData && usuarioData.telefono}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='password'>
                  <FormattedMessage id="Nueva Contraseña" />
                </Label>
                <Controller
                  control={control}
                  name='password'
                  render={({ field, onChange }) => (
                    <Input
                      type='text'
                      {...field}
                      required={isNewRecord}
                      disabled={isView}
                      placeholder={`${intl.formatMessage({ id: 'Ingrese nueva contraseña si desea cambiarla' })}`}
                      defaultValue={''}
                      minLength={8}
                      className={classNames({ 'is-invalid': errors['password'] })}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <Label for='rolesId'>
                <FormattedMessage id="Rol" />
              </Label>
              <FormGroup>
                <Controller
                  control={control}
                  name='rolesId'
                  render={() => (
                    <Select
                      disabled={isView}
                      className='react-select'
                      classNamePrefix='select'
                      id='rolesId'
                      name="rolesId"
                      placeholder={`${intl.formatMessage({ id: 'Seleccione Rol' })}`}
                      value={getRolesOptions().find(e => e.value === filterRol) || ""}
                      defaultValue={getRolesOptions().find(e => e.value === usuarioData.rolesId) || ""}
                      options={getRolesOptions()}
                      theme={selectThemeColors}
                      onChange={handleRolChange}
                    />
                  )}>
                </Controller>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='activo'>
                  <FormattedMessage id="Activo" />
                </Label>
                <Controller
                  control={control}
                  name='activoSn'
                  value={usuarioData?.activoSn?.toLowerCase() === "s"}
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
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  <FormattedMessage id="Guardar" />
                </Button>
              }
              <Button color='secondary' outline tag={Link} to='/usuarios/'>
                <FormattedMessage id="Atras" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

UsuarioAccountTab.propTypes = {
  selectedUsuario: Proptypes.any
}

export default UsuarioAccountTab

