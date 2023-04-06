// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import UserDropdown from './UserDropdown'
import EmpresasDropdown from './EmpresasDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      <IntlDropdown />
      <EmpresasDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
