// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Third Party Components
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
// Action Idiomas
import { getData, refreshByIdiomaSeleccionado } from '../../../../views/idiomas/store/action'

// ** Internationalization Context
import { IntlContext } from '@src/utility/context/Internationalization'
// Dispatch
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedIdiomaChange } from '@store/actions/layout'

const IntlDropdown = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.idiomas)
  // ** Context
  const intlContext = useContext(IntlContext)
  // States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Vars
  // const langObj = {
  //   en: 'English',
  //   // de: 'German',
  //   fr: 'French',
  //   pt: 'Portuguese',
  //   es: 'Español'
  // }
  // Muteado el useEffect, que por alguna razon no entra en el dispatch
  // No entra nunca en el useEffect, mutearlo para que entre, pero se queda en bucle infinito
  useEffect(() => {
    dispatch(getData({
      page: currentPage,
      perPage: rowsPerPage,
      q: searchTerm
    }
    ))
  }, [])
  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    localStorage.removeItem('idioma')
    localStorage.setItem('idioma', lang)
    // Por defecto en castellano, pero si se cambia
    // Le meto un action para que me guarde el selected
    // en el store, y posteriormente lo recojo fuera del handle por si existe
    e.preventDefault()
    dispatch(handleSelectedIdiomaChange(lang))
    dispatch(refreshByIdiomaSeleccionado(lang))
    intlContext.switchLanguage(lang)
  }
  if (!store.data.length > 1) return null
  let selectedIdioma
  // Controlo si existe o no un idioma seleccionado
  // Si no existe, se lo pongo yo
  // if (store.selectedIdiomaPIM?.nombre != undefined || store.selectedIdiomaPIM != undefined || store.selectedIdiomaPIM?.nombre) {
  if (store.selectedIdiomaPIM[0]?.nombre != undefined || store.selectedIdiomaPIM[0]?.nombre) {
    selectedIdioma = store.selectedIdiomaPIM
    localStorage.removeItem('idioma')
    localStorage.setItem('idioma', store.selectedIdiomaPIM[0].nombre)
  } else {
    localStorage.setItem('idioma', `es`)
    selectedIdioma = [
      {
        nombre: "es",
        descripcion: "Español",
        locale: "es"
      }
    ]
  }
  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          className='country-flag flag-icon'
          // countryCode={intlContext.locale === 'en' ? 'us' : intlContext.locale}
          countryCode={selectedIdioma[0].locale}
          svg
        />
        {/* <span className='selected-language'>{langObj[intlContext.locale]}</span> */}
        <span className='selected-language'>{selectedIdioma[0].descripcion}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        {store.data?.map(idioma => {
          return <DropdownItem key={`idioma-${idioma.id}`} href='/' tag='a' onClick={e => handleLangUpdate(e, idioma.nombre)}>
            <ReactCountryFlag className='country-flag' countryCode={idioma.locale} svg />
            <span className='ml-1'>{idioma.descripcion}</span>
          </DropdownItem>
        })} 
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
