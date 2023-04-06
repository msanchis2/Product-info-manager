import Swal from "sweetalert2"
import Avatar from '@components/avatar'
import { Fragment } from 'react'
import { Check } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { toast, Slide } from 'react-toastify'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {

  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export function devuelveBasePath() {

  let REACT_APP_BACKEND_BASEPATH = process.env.REACT_APP_BACKEND_BASEPATH_LOCAL
  if (process.env.REACT_APP_ENTORNO == "DEV") {
    REACT_APP_BACKEND_BASEPATH = process.env.REACT_APP_BACKEND_BASEPATH_DEV
  }
  if (process.env.REACT_APP_ENTORNO == "PRO") {
    REACT_APP_BACKEND_BASEPATH = process.env.REACT_APP_BACKEND_BASEPATH_PRO
  }
  return REACT_APP_BACKEND_BASEPATH

}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: '2-digit', day: '2-digit', year: 'numeric' }) => {
  if (!value) return value
  // return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  // return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
}

// ** Returns YYYY-MM-DD date
export const formatDateToDatabase = (value) => {
  const date = new Date(value)

  const year = date.getFullYear()

  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : `0${month}`

  let day = date.getDate().toString()
  day = day.length > 1 ? day : `0${day}`

  return `${year}-${month}-${day}`
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userDataPim')
export const getUserData = () => JSON.parse(localStorage.getItem('userDataPim'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  return userRole === 'admin' ? '/productos' : '/login'
}

// ** React Select Theme Colors
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

// ** Capitalize First letter
export const capitalizeFirstLetter = (string) => (
  string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : ''
)

// ** Slugify
export const slugify = (...args) => {
  const value = args.join(' ')

  return value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator
}

// Price, Quantity & Ammount
export const getFormattedPrice = (price) => (
  // new Intl.NumberFormat(undefined, {
  //   style: 'currency',
  //   currency: 'EUR'
  // }).format(price)
  price ? price.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,') : ''
)

export const getFormattedQuantity = (quantity = 0) => (
  quantity ? quantity : ''
)
export const getFormattedAmmount = (price, quantity) => (
  (price && quantity) ? `${((price * quantity) / 100 * 100).toFixed(2)} €` : ''
)

export const automaticDownload = (filename, data) => {
  const hiddenElement = document.createElement('a')
  hiddenElement.href = data
  hiddenElement.target = '_blank'
  hiddenElement.download = filename
  hiddenElement.click()
  setTimeout(() => hiddenElement.remove(), 4000)
}

export function displaySuccessMsg (objeto, accion = "") {
  toast.success(
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Check size={12} />} />
          <h6 className='toast-title font-weight-bold'><FormattedMessage id={`${objeto} ${accion}`} /></h6>
        </div>
      </div>
    </Fragment>,
    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
  )
}

// export const displaySuccessMsg = (msg, displayTime) => {
//   if (displayTime) {
//     return Swal.fire({
//       position: 'center',
//       icon: 'success',
//       showCloseButton: false,
//       timer: displayTime,
//       title: msg
//     })
//   } else {
//     return Swal.fire({
//       position: 'center',
//       icon: 'success',
//       title: msg
//     })
//   }
// }

export const displayInfoMsg = (msg, displayTime) => {
  if (displayTime) {
    return Swal.fire({
      position: 'center',
      icon: 'info',
      showCloseButton: false,
      timer: displayTime,
      title: msg
    })
  } else {
    return Swal.fire({
      position: 'center',
      icon: 'info',
      title: msg
    })
  }
}

export const displayErrorMsg = (msg, displayTime) => {
  if (displayTime) {
    return Swal.fire({
      position: 'center',
      icon: 'error',
      showCloseButton: false,
      timer: displayTime,
      title: msg
    })
  } else {
    return Swal.fire({
      position: 'center',
      icon: 'error',
      title: msg
    })
  }
}

export const capitalize = (string) => {
  const loweredString = string.toLowerCase()
  return loweredString.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const testJSON = (text) => {
  if (typeof text !== "string") {
    return false
  }
  try {
    JSON.parse(text)
    return true
  } catch (error) {
    return false
  }
}

export function inRange(x, min, max) {
  const minVal = min ? min : 0
  const maxVal = max ? max : 99999
  return x >= minVal && x <= maxVal
}

export function getYoutubeId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return null
  }
}

export function getPimUrl(url) {
  return `http://51.75.242.235:8080/media/download/${url.replaceAll("/", "%252F")}`
}

export function getUsableFilesUrl(url) {
  return `${devuelveBasePath()}/${url}`
}

export function makeParrafos(str, divisor, className) {
  return str.split(divisor).map((it, i) => {
    if (it.length > 0) return <div className={className} key={`x${i}`}>{it}</div>
    else return null
  })
}

export function fetchAndDownload(url, filename) {
  return fetch(url, {
    method: 'GET'
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob])
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${filename}`
      )
      // Append to html link element page
      document.body.appendChild(link)
      // Start download
      link.click()
      // Clean up and remove the link
      link.parentNode.removeChild(link)
    })
}

export function cortarCerosExcedentes(str) {
  if (!str.includes(".")) return str

  return parseFloat(str) * 1
}

export function isMobileScreen() {
  return window.matchMedia("(min-width: 500px)").matches
}

export function emptyCache() {
  if ('caches' in window) {
    caches.keys().then((names) => {
      // Delete all the cache files
      names.forEach(name => {
        caches.delete(name)
      })
    })

    // Makes sure the page reloads. Changes are only visible after you refresh.
    window.location.reload(true)
  }
}

export function scrollToTopSmooth() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function getAccessToken() {
  return JSON.parse(localStorage.getItem('userDataPim'))?.accessToken
}

export function getUserForToken() {
  return JSON.parse(localStorage.getItem('userDataPim'))
}

export function getBackendUsableFilesUrl(url) {
  // pegar el REACT_APP_BACKEND_BASEPATH y quitar el "./public/"
  return `${devuelveBasePath()}/${url.slice(9, url.length)}`
}

export async function existeImagen(url, callback) {
  // if (typeof callback === 'function') {
  //   fetch(url).then(res => res.text()).then(text => callback(text))
  // } else {
  //   console.log("No es una funcion")
  // }

  const res = await fetch(url),
    ret = await res.text()
    // console.log(res)
    return res
  // return callback ? callback(ret) : ret // a Promise() actually.
  ////////////////////////
  // try {
  //   const response = await fetch(url, {
  //     method: 'HEAD',
  //     cache: 'no-cache'
  //   })
  //   response.then((res) => {
  //     if (res.status == 200) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  // } catch (error) {
  //   // console.log(error);
  //   return false
  // }
  ////////////////////////////////
  // El de abajo funcionaba
  ////////////////////////////////
  // const http = new XMLHttpRequest()
  // http.open('GET', url, false)
  // // console.log(url)
  // try {
  //   http.send()
  //   http.onload = function () {
  //     console.log(http.status)
  //     if (http.status === 200) {
  //       console.log(url)
  //       console.log(http.status)
  //       console.log("EXISTE")
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // } catch (error) {
  //   console.log(error.message)
  // }

}

