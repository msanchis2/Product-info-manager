import {Configuration, ConfigurationParameters} from "./axios"
import { devuelveBasePath } from '@src/utility/Utils'

const params : ConfigurationParameters = {
    basePath: devuelveBasePath()
}

export const settings = new Configuration(params)

export * from "./axios"
