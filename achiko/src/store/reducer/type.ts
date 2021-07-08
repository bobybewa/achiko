import { SETUSERDATA, SETUSERBIRTH, SETUSERNAME} from './typeAction'

export function SET_USER_DATA(payload: any){
    return{type: SETUSERDATA, payload}
}

export function SET_USER_NAME(payload: any){
    return{type: SETUSERNAME, payload}
}

export function SET_USER_BIRTHDAY(payload: any){
    return{type: SETUSERBIRTH, payload}
}