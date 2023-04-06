import { TraduccionesWithRelations, IdiomasWithRelations } from '@src/@api'

export type TraduccionItem = {
    clave: string,
    idiomas: [{
        [key: string]: {
            idioma: string | undefined,
            valor: string | undefined,
            id: number | undefined
        }
    }]
}

export interface TraduccionState {
    idiomas: IdiomasWithRelations[],
    allData: TraduccionItem[],
    data: TraduccionItem[],
    total: number,
    params: Record<string, unknown>,
    selectedTraduccion: any | undefined
}
// ** Initial State
const initialState: TraduccionState = {
    idiomas: [],
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedTraduccion: undefined
}

const prefix = 'traducciones'

const traducciones = (state = initialState, action: any) => {

    switch (action.type) {
        case `${prefix}/GET_IDIOMAS`:
            return { ...state, idiomas: action.data }
        case `${prefix}/GET_ALL_DATA`:
            return { ...state, allData: action.data }
        case `${prefix}/GET_DATA`:
            return {
                ...state,
                data: action.data,
                total: action.totalPages || 1,
                params: action.params
            }
        case `${prefix}/GET_DATA_COUNT`:
            return {
                ...state,
                total: action.total
            }
        case `${prefix}/GET`:
            return { ...state, selectedTraduccion: action.data }
        case `${prefix}/ADD`:
            return { ...state }
        case `${prefix}/DELETE`:
            return { ...state }
        default:
            return { ...state }
    }
}
export default traducciones
