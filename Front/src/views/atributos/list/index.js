// ** User List Component
import Table from './Table'
import BreadCrumbs from '@components/breadcrumbs'
import { getData, getDatosNecesarios } from '../store/action'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const AtributosList = () => {
  const store = useSelector(state => state.atributos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDatosNecesarios())
  }, [])
  const ability = useAbility(AbilityContext)
  if (!ability.can('Atributos', 'PIM', 'Ver')) {
    return null
  } 
  return (
    <div className='app-user-list'>
      <BreadCrumbs breadCrumbTitle='Atributos' breadCrumbParent='Atributos' breadCrumbActive='Lista' />
      <Table />
    </div>
  )
}

export default AtributosList
