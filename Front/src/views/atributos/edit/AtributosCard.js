import { useState, useEffect, Fragment } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addAtributo, updateAtributo, delAtributoProducto, getAtributosProducto, addAtributoProducto, getDatosNecesarios, getAtributo } from '../store/action'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Card, CardBody, Row, Col, Form, Input, InputGroup, CustomInput, Button, CardTitle } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { displayErrorMsg, selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AtributosCard = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const intl = useIntl()
  const store = useSelector(state => state.atributos)
  const storeLayout = useSelector(state => state.layout)
  const [atributoData, setAtributoData] = useState({})
  const { selectedAtributo } = store
  const [CategoriasView, setCategoriasView] = useState(["none"])
  const [categorias, setCategorias] = useState([])
  const [TipoCampo, setTipoCampo] = useState(["none"])
  const { id } = useParams()
  const isView = location.pathname.includes('view')
  const isNew = location.pathname.includes('new')
  const isEdit = location.pathname.includes('edit')
  const ability = useAbility(AbilityContext)
  
  useEffect(() => {
    if (isView && !ability.can("Atributos", "PIM", "Ver")) {
      history.go(-1)
    }
    if (isNew && !ability.can("Atributos", "PIM", "Nuevo")) {
      history.go(-1)
    }
    if (isEdit && !ability.can("Atributos", "PIM", "Actualizar")) {
      history.go(-1)
    }
  }, [ability])

  useEffect(() => {
    store.selectedAtributo = {}
    dispatch(getDatosNecesarios())
    if (id) {
      dispatch(getAtributo(parseInt(id)))
    }
  }, [id])

  useEffect(() => {
    if (isNew) {
      const attObjeto = { nombre: '', tagAecoc: '', tagUOM: '', tipoCampo: 'T', unidadSN: 'N', unidad: '', posiblesValores: [], posiblesValoresAecoc: [], categorias: '', unidadAecoc: '' }
      setAtributoData(attObjeto)
    } else if (store.selectedAtributo) {
      const categorias = store.selectedAtributo.categorias || ""
      setAtributoData(selectedAtributo)
      setCategorias(categorias.split(","))
    }
  }, [store.selectedAtributo])

  useEffect(() => {
    const campo = document.querySelector("#campoOpcion")
    if (atributoData.tipoCampo == 'O') {
      campo.style.visibility = 'visible'
    } else {
      campo.style.visibility = 'hidden'
    }
  }, [atributoData.tipoCampo])

  useEffect(() => {
    if (atributoData.posiblesValores != null && atributoData.posiblesValores != undefined) {
      if (typeof atributoData.posiblesValores == 'string') { atributoData.posiblesValores = atributoData.posiblesValores.split(",") }
      if (typeof atributoData.posiblesValoresAecoc == 'string') { atributoData.posiblesValoresAecoc = atributoData.posiblesValoresAecoc.split(",") }
      const lista = document.querySelector("#listaValores")
      while (lista.hasChildNodes()) { 
        lista.removeChild(lista.lastChild) 
      }
      let li, text, aecocVal
      for (let i = 0; i < atributoData.posiblesValores.length; i++) {
        li = document.createElement("li")
        if (atributoData.posiblesValoresAecoc.length > i) {
          aecocVal = atributoData.posiblesValoresAecoc[i]
        } else {
          aecocVal = ""
        }
        text = document.createTextNode(atributoData.posiblesValores[i].concat(" (").concat(aecocVal).concat(")"))
        li.append(text)
        if (text != "" || text != null) { lista.appendChild(li) }
      }
    }
  }, [atributoData.posiblesValores, atributoData.posiblesValoresAecoc])

  //get select options

  function getGrupoAtributosOptions () {
    return store.gruposAtributos.map(grupo => {
      return { value: grupo.id, label: `${grupo.nombre} (${grupo.codigo})` }
    })
  }

  function getTipoCampoOptions () {
    return [{ value: 'T', label: 'Texto' }, { value: 'O', label: 'Opcion' }]
  }

  //Handle change

  const handleGruposAtributosChange = (data) => {
    atributoData.grupoAtributosId = data.value
    setAtributoData(prevState => {
      return {
        ...prevState,
        ["grupoAtributosId"]: data.value
      }
    })
  }

  const handleTipoCampoChange = (data) => {
    const campo = document.querySelector("#campoOpcion")
    if (data.value == 'O') {
      campo.style.visibility = 'visible'
      
    } 
    if (data.value == 'T') {
      campo.style.visibility = 'hidden'
    }
    setAtributoData(prevState => {
      return {
        ...prevState,
        ["tipoCampo"]: data.value
      }
    })
  }

  const handleTextChange = ({target}) => {
    setAtributoData(prevState => {
      return {
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleaddValor = () => {
    const lista = document.querySelector("#listaValores")
    const elem = document.createElement("li")
    const textVal = document.querySelector("#addValor").value
    const textValAecoc = document.querySelector("#addValorAecoc").value
    const text = document.createTextNode(textVal.concat(" (").concat(textValAecoc).concat(")"))
    elem.append(text)
    lista.appendChild(elem)
    atributoData.posiblesValores.push(textVal)
    atributoData.posiblesValoresAecoc.push(textValAecoc)
  }

  const handleCategoriaChange = ({ target }) => {
    const { checked, name } = target
    const catId = parseInt(name.split("-").pop())
    const catInfo = store.categoriasData.find(cat => cat.id === catId)
    if (checked) {
      setCategorias(categorias.concat(catInfo.codigo))
    } else {
      setCategorias(categorias.filter(cat => cat !== catInfo.codigo))
    }
  }

  const handleUnidadChange = ({target}) => {
    atributoData.unidad = target.value
    if (atributoData.unidad == "" || atributoData.unidad == null) {
      atributoData.unidadSN = 'N'
    } else {
      atributoData.unidadSN = 'S'
    }
  }

  const handleUnidadAecocChange = ({target}) => {
    atributoData.unidadAecoc = target.value
  }

  const addProductosAtributos = (atributo) => {
    categorias.forEach(categ => {
      const prod = store.productos.filter(el => el.categorias === categ)
      prod.forEach(p => {
        if (p != null && p != undefined) {
          const atributoProd = {
            productoId: p.id,
            atributoId: atributo.codigo,
            valor: "",
            nombre: atributo.nombre,
            unidad: "",
            ordenEnGrupo: ""
          }
          dispatch(addAtributoProducto(atributoProd))
        }
      })
  })
  }
  
  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (atributoData.grupoAtributosId == "") return displayErrorMsg('Seleccione grupo de atributos para continuar')

    const atributo = atributoData
    atributo.categorias = categorias.toString()
    atributo.posiblesValores = atributo.posiblesValores.toString()
    atributo.posiblesValoresAecoc = atributo.posiblesValoresAecoc.toString()
    
    if (isNew) {
      let mayor = 0
      store.atributos.forEach(att => {
        if (att.codigo > mayor) mayor = att.codigo
      })
      atributo.codigo = mayor + 1 
      dispatch(addAtributo(atributo))
      dispatch(addProductosAtributos(atributo))
    } else {
      dispatch(updateAtributo(atributoData.id, atributo))
      const attprod = dispatch(getAtributosProducto(atributoData.id))
      attprod.then(val => {
        if (val != undefined) {
          val.data.forEach(att => {
            dispatch(delAtributoProducto(att.id))
          })
        }
        addProductosAtributos(atributo)
      })  
    }
    setTimeout(() => { history.go(-1) }, 1000)
  }

  return (
    <Row>
      <Col sm='12'>
        <Form onSubmit={handleSubmit}>
          <CardTitle tag='h4'><FormattedMessage id="Atributos" /></CardTitle>
          <Row>
            <Col className='col-bill-to pt-1 ml-1 mb-1' lg='3'>
              <h6 className='invoice-to-title'><FormattedMessage id="Grupo de atributos"></FormattedMessage>:</h6>
              <div className='invoice-customer'>
                <Fragment>
                  <Select 
                    className='react-select'
                    classNamePrefix='select'
                    id='grupoAtributosId'
                    name="grupoAtributosId"
                    placeholder="Seleccione grupo de atributos"
                    value={getGrupoAtributosOptions().find(e => e.value === atributoData.grupoAtributosId) || ""}
                    options={getGrupoAtributosOptions()}
                    theme={selectThemeColors}
                    onChange={handleGruposAtributosChange}
                    maxMenuHeight="100px"
                  />
                </Fragment>
              </div>
            </Col>
            <Col className='col-bill-to pt-1' lg='2'>
              <h6 className='invoice-to-title'><FormattedMessage id="Tag AECOC"></FormattedMessage>:</h6>
              <div className='invoice-customer'>
                <Fragment>
                  <InputGroup className='input-group-merge invoice-edit-input-group'>
                  <Input
                    type='tagAecoc'
                    id="tagAecoc"
                    name="tagAecoc"
                    className='invoice-edit-input'
                    value={atributoData.tagAecoc}
                    placeholder='Tag Aecoc'
                    onChange={handleTextChange}
                  />
                </InputGroup>
                </Fragment>
              </div>
            </Col>
            <Col className='col-bill-to pt-1' lg='2'>
              <h6 className='invoice-to-title'><FormattedMessage id="Tag AECOC - UOM"></FormattedMessage>:</h6>
              <div className='invoice-customer'>
                <Fragment>
                  <InputGroup className='input-group-merge invoice-edit-input-group'>
                  <Input
                    type='tagUOM'
                    id="tagUOM"
                    name="tagUOM"
                    className='invoice-edit-input'
                    value={atributoData.tagUOM}
                    placeholder='Tag UOM'
                    onChange={handleTextChange}
                  />
                </InputGroup>
                </Fragment>
              </div>
            </Col>
            <Col className='col-bill-to pt-1' lg='3'>
              <h6 className='invoice-to-title'><FormattedMessage id="Nombre"></FormattedMessage>:</h6>
              <div className='invoice-customer'>
                <Fragment>
                  <InputGroup className='input-group-merge invoice-edit-input-group'>
                  <Input
                    type='text'
                    id="nombre"
                    name="nombre"
                    className='invoice-edit-input'
                    value={atributoData.nombre}
                    required={true}
                    placeholder={`${intl.formatMessage({ id: 'Nombre' })}`}
                    onChange={handleTextChange}
                  />
                  </InputGroup>
                </Fragment>
              </div>
            </Col>
          </Row>
            <Card className='invoice-preview-card mb-0 p-1 w-100'>
              <Row className='pl-2' onClick={() => (TipoCampo == "block" ? setTipoCampo("none") : setTipoCampo("block"))}>
                <a onClick={() => (TipoCampo == "block" ? setTipoCampo("none") : setTipoCampo("block"))}><h4 className="card-title"><FormattedMessage id="Tipo de campo"></FormattedMessage></h4></a>
                <a className='pl-1'  >
                  {(TipoCampo == "none") && <ChevronDown size={15} onClick={() => (TipoCampo == "block" ? setTipoCampo("none") : setTipoCampo("block"))} />
                  }
                  {(TipoCampo == "block") && <ChevronUp size={15} onClick={() => (TipoCampo == "block" ? setTipoCampo("none") : setTipoCampo("block"))} />
                  }
                </a>
              </Row>
              <CardBody className='invoice-padding' style={{ display: TipoCampo }}>

              <Row>
                <Col className='col-bill-to pb-1' lg='3'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Unidad de medida"></FormattedMessage>:</h6>
                  <Input
                    type='text'
                    className='custom-control-Primary'
                    id='unidadMedida'
                    name='unidadMedida'
                    label={`${intl.formatMessage({ id: 'Unidad de medida' })}`}
                    inline
                    onChange={handleUnidadChange}
                    defaultValue={atributoData.unidad}
                  />
                </Col>
                <Col className='col-bill-to pb-1' lg='3'>
                  <h6 className='invoice-to-title'><FormattedMessage id="Unidad de medida AECOC"></FormattedMessage>:</h6>
                  <Input
                    type='text'
                    className='custom-control-Primary'
                    id='unidadMedidaAecoc'
                    name='unidadMedidaAecoc'
                    label={`${intl.formatMessage({ id: 'Unidad de medida AECOC' })}`}
                    inline
                    onChange={handleUnidadAecocChange}
                    defaultValue={atributoData.unidadAecoc}
                  />
                </Col>
              </Row>
                <Row>
                  <Col className='col-bill-to pt-1' lg='3'>
                    <h6 className='invoice-to-title'><FormattedMessage id="Tipo"></FormattedMessage>:</h6>
                    <div className='invoice-customer'>
                      <Fragment>
                        <Select
                          className='react-select'
                          classNamePrefix='select'
                          id='tipoCampo'
                          name="tipoCampo"
                          options={getTipoCampoOptions()}
                          value={getTipoCampoOptions().find(e => e.value == atributoData.tipoCampo)}
                          theme={selectThemeColors}
                          onChange={handleTipoCampoChange}
                        />
                      </Fragment>
                    </div>
                  </Col>
        
                  <div id="campoOpcion" className="d-flex" style={{visibility: 'hidden', marginLeft: '20px', marginTop: '38px'}}>
                    <Input
                      type='text'
                      id="addValor"
                      name="addValor"
                      className='mr-2 invoice-edit-input input-unidades'
                      placeholder='Posibles valores'
                    />
                    <Input
                      type='text'
                      id="addValorAecoc"
                      name="addValorAecoc"
                      className='mr-2 invoice-edit-input input-unidades'
                      placeholder={`${intl.formatMessage({ id: 'Posibles valores AECOC' })}`}
                    />
                    <Input
                      type='button'
                      id="addValorButton"
                      name="addValorButton"
                      className='btn btn-primary'
                      value={`${intl.formatMessage({ id: 'Añadir' })}`}
                      onClick={handleaddValor}
                    />
                    <ul className="mt-6 ml-0" id="listaValores" style={{width: '300px'}}></ul>
                  </div>
                </Row>
                
              </CardBody>
            <hr className='invoice-spacing' />
    
            <Row className='pl-2' onClick={() => (CategoriasView == "block" ? setCategoriasView("none") : setCategoriasView("block"))}>

            <a onClick={() => (CategoriasView == "block" ? setCategoriasView("none") : setCategoriasView("block"))}><h4 className="card-title"><FormattedMessage id="Categorias"></FormattedMessage></h4></a>
            <a className='pl-1'  >
              {(CategoriasView == "none") && <ChevronDown size={15} onClick={() => (CategoriasView == "block" ? setCategoriasView("none") : setCategoriasView("block"))} />
              }
              {(CategoriasView == "block") && <ChevronUp size={15} onClick={() => (CategoriasView == "block" ? setCategoriasView("none") : setCategoriasView("block"))} />
              }
            </a>
          </Row>
          <CardBody className='invoice-padding' style={{ display: CategoriasView }}>
            <Row className='row-bill-to invoice-spacing align-middle flex'>
              {store.categoriasData.filter(cat => categorias.find(c => c === cat.codigo)).map(cat => {
                return (
                  <Col className='col-bill-to pb-1' lg='12' key={`categoria-${cat.id}`}>
                    <CustomInput
                      type='checkbox'
                      className='custom-control-Primary'
                      id={`categoria-${cat.id}`}
                      name={`categoria-${cat.id}`}
                      label={`${cat.nombre} (${cat.codigo})`}
                      checked={true}
                      inline
                      onChange={handleCategoriaChange}
                    />
                  </Col>
                )
              })}
              {store.categoriasData?.filter(el => el.empresaId == storeLayout.selectedEmpresaId).filter(cat => !categorias.find(c => c === cat.codigo)).map(cat => {
                return (
                  <Col className='col-bill-to pb-1' lg='12' key={`categoria-${cat.id}`}>
                    <CustomInput
                      type='checkbox'
                      className='custom-control-Primary'
                      id={`categoria-${cat.id}`}
                      name={`categoria-${cat.id}`}
                      label={`${cat.nombre} (${cat.codigo})`}
                      checked={false}
                      inline
                      onChange={handleCategoriaChange}
                    />
                  </Col>
                )
              })}
            </Row>
            </CardBody>
            <hr className='invoice-spacing' />
          </Card>

          <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
            {!isView &&
              <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
                <FormattedMessage id='Guardar' />
              </Button>
            }
            <Button color='secondary' outline tag={Link} to='/atributos/'>
              <FormattedMessage id='Atras'/>
            </Button>
          </Col>
        </Form>
      </Col>  
    </Row>
  )
}

export default AtributosCard

