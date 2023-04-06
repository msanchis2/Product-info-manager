// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: any): boolean => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num: number): string | number => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html: any): string => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = (date: Date): boolean => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value: string, formatting: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' }): string => {
    if (!value) return value
    // return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
    return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: string, toTimeForCurrentDay = true): string => {
    const date = new Date(value)
    let formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = { hour: 'numeric', minute: 'numeric' }
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = (): boolean => !!localStorage.getItem('userData')
export const getUserData = (): string => JSON.parse(localStorage.getItem('userData') || '')

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole: string): string => {
    if (userRole === 'admin') return '/'
    if (userRole === 'client') return '/access-control'
    return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme: any): void => ({
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
export const capitalizeFirstLetter = (text: string): string => (
    text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : ''
)

// ** Slugify
export const slugify = (...args: (string | number)[]): string => {
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}

// Price, Quantity & Ammount
export const getFormattedPrice = (price: number): string => (
    price ? `${price.toFixed(2)} €` : ''
)

export const getFormattedQuantity = (quantity = 0): string | number => (
    quantity ? quantity : ''
)
export const getFormattedAmmount = (price: number, quantity: number): string => (
    (price && quantity) ? `${((price * quantity) / 100 * 100).toFixed(2)} €` : ''
)

export const automaticDownload = (filename: string, data: any) => {
    const hiddenElement = document.createElement('a')
    hiddenElement.href = data
    hiddenElement.target = '_blank'
    hiddenElement.download = filename
    hiddenElement.click()
    setTimeout(() => hiddenElement.remove(), 4000)

}