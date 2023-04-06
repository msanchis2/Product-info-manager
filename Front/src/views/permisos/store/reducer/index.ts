import {PermisosWithRelations, RolesWithRelations} from '@src/@api'

export interface PermisosState {
    roles: RolesWithRelations[],
    allData: PermisosWithRelations[],
    data: PermisosWithRelations[],
    total: number,
    params: Record<string, unknown>
}
// ** Initial State
const initialState: PermisosState = {
    roles: [],
    allData: [],
    data: [],
    total: 1,
    params: {}
}

const prefix = 'permisos'

const permisos = (state = initialState, action: any) => {

    switch (action.type) {
        case `${prefix}/GET_ROLES`:
            return {...state, roles: action.data}
        case `${prefix}/GET_ALL_DATA`:
            return {...state, allData: action.data}
        case `${prefix}/GET_DATA`:
            return {
                ...state,
                data: action.data,
                // total: action.totalPages,
                params: action.params
            }
        case `${prefix}/GET_DATA_COUNT`:
            return {
                ...state,
                total: action.totalPages
            }
        case `${prefix}/GET`:
            return {...state}
        case `${prefix}/ADD`:
            return {
                ...state,
                allData: [...state.allData, action.data],
                data: [...state.data, action.data]
            }
        case `${prefix}/DELETE`:
            return {
                ...state,
                allData: state.allData.filter(item => item.id !== action.data),
                data: state.data.filter(item => item.id !== action.data)
            }
        default:
            return {...state}
    }
}
export default permisos
