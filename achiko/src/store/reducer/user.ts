const initialState:any  = {
    name: '',
    birthday: '',
    userAccount:{},
}

export default function reducer(state = initialState, {type, payload}:{type:string, payload:any}):void {
    // return state
    switch (type) {
        case 'SET_USER_DATA':
            return {...state, userAccount: payload}
        case 'SET_USER_NAME':
            return {...state, name: payload}
        case 'SET_USER_BIRTHDAY':
            return {...state, birthday: payload}
        default:
            return state
    }
}