import {LOGIN} from '../action-name'

const initialState = {
    isLogin: false,
    token: ''
}


const reducer = (state = initialState, action) => {
    const newState = {...state}
    const payload = action.payload
    switch(action.type) {
        case LOGIN:
            newState.token = payload.token
            newState.isLogin = true
            return newState

        default:
            return {...state, ...payload}
    }
}

export default reducer