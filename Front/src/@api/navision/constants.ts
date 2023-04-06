//
//Por defecto usamos el entorno LOCAL Y (válido para DEV)
//
const REACT_APP_ODATA_TOKEN: any = process.env.REACT_APP_ODATA_TOKEN
let REACT_APP_ODATA_USERNAME: any = process.env.REACT_APP_ODATA_USERNAME_DEV
let REACT_APP_ODATA_PASSWORD: any = process.env.REACT_APP_ODATA_PASSWORD_DEV
let REACT_APP_ODATA_API_BASE_URL: any = process.env.REACT_APP_ODATA_API_BASE_URL_DEV
let REACT_APP_ODATA_COMPANY_ID: any = process.env.REACT_APP_ODATA_COMPANY_ID_DEV
//
//Si es PRO sobreescribo
//
if (process.env.REACT_APP_ENTORNO == "PRO") {
    // REACT_APP_ODATA_TOKEN = process.env.REACT_APP_ODATA_TOKEN_PRO
    REACT_APP_ODATA_USERNAME = process.env.REACT_APP_ODATA_USERNAME_PRO
    REACT_APP_ODATA_PASSWORD = process.env.REACT_APP_ODATA_PASSWORD_PRO
    REACT_APP_ODATA_API_BASE_URL = process.env.REACT_APP_ODATA_API_BASE_URL_PRO
    REACT_APP_ODATA_COMPANY_ID = process.env.REACT_APP_ODATA_COMPANY_ID_PRO
}

export const TOKEN = REACT_APP_ODATA_TOKEN || ''

/*eslint no-useless-escape: "off"*/
export const USERNAME = REACT_APP_ODATA_USERNAME || ''
export const PASSWORD = REACT_APP_ODATA_PASSWORD || ''

export const ODATA_API_BASE_URL = REACT_APP_ODATA_API_BASE_URL || ''
export const COMPANY_ID = REACT_APP_ODATA_COMPANY_ID || ''
export const COMPANY_RESOURCE = `companies(${COMPANY_ID})`
export const QUERY_ATTRIBUTES_RESOURCE = 'queryAttributes'
export const QUERY_ITEM_ATTRIBUTES_RESOURCE = 'queryItemAttributes'
export const QUERY_CATEGORY_ATTRIBUTES_RESOURCE = 'queryCategoryAttributes'
