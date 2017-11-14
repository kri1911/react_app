import { LOAD_DOCUMENT_ALL_SUCCESS, LOAD_DOCUMENT_SUCCESS, ADD_DOCUMENT, DELETE_DOCUMENT,  SET_MODIFY, UPDATE_DOCUMENT } from '../constans/Page';
import {  } from '../constans/Page';

const initialState = {
    message: '',
    mass: [],
    doc: {},
    modify: ''
}

export default function pagedocument(state = initialState, actions) {
    switch (actions.type){
        case LOAD_DOCUMENT_ALL_SUCCESS:
            return {...state, mass: actions.payload.mass, doc:'', modify:''}

        case LOAD_DOCUMENT_SUCCESS:
            return {...state, mass: [], doc: actions.payload}

        case ADD_DOCUMENT:
            return {...state, mass: actions.payload.mass}

        case DELETE_DOCUMENT:
            return {...state, mass: actions.payload.mass}

        case SET_MODIFY:
            return {...state, mass: [], modify: actions.payload.modify}

        case UPDATE_DOCUMENT:
            return {...state, mass: [], modify:'', doc: actions.payload}

        default:
            return state;
    }

}