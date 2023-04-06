import axios from 'axios'
import {DefaultApi, Configuration} from '@api/navision/odata/axios'
import {TOKEN, ODATA_API_BASE_URL, COMPANY_RESOURCE} from '@api/navision/constants'

export const odataAxios = axios.create({
    headers: {
        authorization: `Basic ${TOKEN}`
    }
})

const configuration = new Configuration({
    basePath: `${ODATA_API_BASE_URL}${COMPANY_RESOURCE}`
})

export const apiNavision = new DefaultApi(configuration, '', odataAxios)
