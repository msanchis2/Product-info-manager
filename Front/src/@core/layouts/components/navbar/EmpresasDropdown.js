// ** React Imports
import { useContext, useEffect } from 'react'

// ** Third Party Components
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

// ** Internationalization Context
import { IntlContext } from '@src/utility/context/Internationalization'
import { useDispatch, useSelector } from 'react-redux'
import { Briefcase } from 'react-feather'
import { getData, refreshBySelectedEmpresa } from '@src/views/productos/store/actions'
import { getEmpresasList, handleSelectedEmpresaChange } from '@store/actions/layout'

const EmpresasDropdown = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)

  useEffect(() => {
    dispatch(getEmpresasList())
  }, [])

  const handleEmpresaChange = (empresaId, e) => {
    e.preventDefault()
    dispatch(handleSelectedEmpresaChange(empresaId))
    dispatch(refreshBySelectedEmpresa(empresaId))
  }

  const selectedEmpresaObj = store.empresas?.find(e => e.id === store.selectedEmpresaId)

  if (!store.empresas.length > 1) return null

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <Briefcase size={18} />
        <span className='selected-language'> {selectedEmpresaObj?.nombre || "Seleccione empresa"}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        {store.empresas?.map(empresa => {
          return <DropdownItem key={`empresa-${empresa.id}`} href='/' tag='a' onClick={(e) => handleEmpresaChange(empresa.id, e)}>
            <span className=''>{empresa.nombre}</span>
          </DropdownItem>
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default EmpresasDropdown
