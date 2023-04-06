// ** Invoice Add Components
import AddCard from './AddCard'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDatosNecesarios } from '../store/actions'
import { useEffect } from 'react'

const ProductosNew = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDatosNecesarios())
  }, [])

  return (
    <div className='invoice-add-wrapper'>
      <AddCard />
    </div>
  )
}

export default ProductosNew
