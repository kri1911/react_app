import {
    LOG_IN_SUCCESS,
    LOG_IN_ERROR
} from '../constans/User';

const initialState = {
    login: false,
    message: ''
}

export default function user(state = initialState, actions){
    switch(actions.type){
        case LOG_IN_SUCCESS:
            return{...state, login: true, message: actions.payload}
            
        case LOG_IN_ERROR :
            return {...state, login: false, message: actions.payload}
        
        default:
            return state
    }
}
