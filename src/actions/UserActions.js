import {
    LOG_IN_SUCCESS,
    LOG_IN_ERROR
} from '../constans/User';

export function logIn(data){
    return (dispatch) => {
        if(data){
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: 'Вы успешно вошли'
            });
        }else{
            dispatch({
                type: LOG_IN_ERROR,
                payload: 'Ошибка входа'
            });
        }
    }
}