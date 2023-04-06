// ** Invoice Add Components
import EditCard from './EditCard'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDatosNecesarios, getProductById } from '../store/actions'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const ProductosEdit = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)
  const {id} = useParams()
  const ability = useAbility(AbilityContext)

  useEffect(() => {
    dispatch(getDatosNecesarios())
    dispatch(getProductById(id))
  }, [id, store.selectedEmpresaId])

  if (!id || !store.selectedEmpresaId) return null
  if ((!ability.can("Productos", "PIM", "Actualizar")) && (!ability.can("Productos", "PIM", "Ver"))) { 
    return null
  }

  return (
    <div className='invoice-add-wrapper'>
      <EditCard />
    </div>
  )
}

export default ProductosEdit
