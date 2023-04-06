// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'
import { Button, Row, Col } from 'reactstrap'
import { Can } from '@src/utility/context/Can'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { FormattedMessage, useIntl} from 'react-intl'
import { generarNuevaCategoria, generarEAN, updateProductoGeneral } from '../../productos/store/actions'
import { getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

// ** Styles
import '@styles/react/apps/app-users.scss'
const integracionList = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const store = useSelector(state => state.integracion)
  const [categoria, setCategoria] = useState('')

  const getCategoriaOptions = () => {
    if (store.categorias != undefined) {
      return store.categorias.map(cat => {
        return { value: `${cat.codigo}`, label: `${cat.codigo}` }
      })
    }
  }

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const reset = () => {
    Swal.fire({
      title: `${intl.formatMessage({ id: `Procesando atributos` })}`,
      icon: 'info'
    })
    store.allData.filter(p => p.categorias == categoria).forEach(producto => {
      dispatch(generarNuevaCategoria(producto.id, categoria))
    })
    Swal.fire({
      title: `${intl.formatMessage({ id: `Proceso terminado` })}`,
      icon: 'success'
    })
  }

  const nuevosEan = () => {
    const productosSinEan = store.general.filter(el => el.ean == "" || el.ean == null || el.ean == undefined)
    let nuevoPGeneral, producto, nuevoEan
    productosSinEan.forEach(el => {
      producto = store.allData.find(prod => prod.id === el.productoId)
      if (producto != undefined) {
        nuevoPGeneral = {
          descripcion:  el.descripcion || "",
          descripcionLarga:  el.descripcionLarga || "",
          estadoReferencia: el.estadoReferencia || "",
          marca: el.palabrasClave || "",
          palabrasClave: el.palabrasClave || "",
          productoId: el.productoId,
          sku: el.sku || "",
          GLN: el.GLN || "",
          titulo: el.titulo || "",
          formatoRP: el.formatoRP || "",
          dimensiones: el.dimensiones || ""
        }
        nuevoEan = generarEAN(producto.categorias || "")
        nuevoEan.then(resp => {
          nuevoPGeneral.ean = resp.toString()
          dispatch(updateProductoGeneral(el.id, nuevoPGeneral))
        })
      }
    })
  }

  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Integracion' breadCrumbParent='Integracion' breadCrumbActive='Lista' />

        <Can I="Productos" a="PIM" field="Reset">
        <div class="card" style={{padding: '20px'}}>
          <Row className='mb-2 invoice-list-table-header'>
            <div style={{width: '200px'}}>
              <Select
                className='react-select ml-1'
                classNamePrefix='select'
                id='categoria'
                name="categoria"
                onChange = {(e) => setCategoria(e.value)}
                options={getCategoriaOptions()}
                theme={selectThemeColors}
              />
            </div>
            <Button.Ripple tag={Link} onClick={reset} color='secondary' className='ml-1' style={{width: '200px', height: '40px'}}>
              <FormattedMessage id="Resetear Atributos"></FormattedMessage>
            </Button.Ripple>
            <p className="ml-1 mt-1">Reasigna a todos los productos de la categoria seleccionada sus atributos correspondientes</p>
          </Row>

          <Row>
            <Button.Ripple tag={Link} onClick={nuevosEan} color='secondary' style={{width: '400px'}} className="mb-1 ml-1">
              <FormattedMessage id="Generar codigos EAN"></FormattedMessage>
            </Button.Ripple>
            <p className="ml-1 mt-1">Genera automaticamente un EAN para todo los productos que no tengan uno, en función de su categoría</p>
          </Row>
        </div>
        </Can>
      <Table />
    </div>
  )
}

export default integracionList