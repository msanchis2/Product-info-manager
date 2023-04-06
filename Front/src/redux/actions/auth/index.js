// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
// Importo parsePermisos para setear ability(Permisos con el CAN) al usuario
import { parsePermisos } from '@src/auth/utils'
// imports para Can/Ability
import { useAbility } from '@casl/react'
import { AbilityContext, Can } from '@src/utility/context/Can'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  // const ability = useAbility(AbilityContext)
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })
    // ** Add to user, accessToken & refreshToken to localStorage
    // Importante, se concatena el ability
    localStorage.setItem('userDataPim', JSON.stringify({ ...data, ability: parsePermisos(data.roles.permisos)}))
    // ability.update()
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
    sessionStorage.setItem('IA', 5)
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userDataPim')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
