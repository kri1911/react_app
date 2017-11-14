import {LOAD_PARTICIPANT_SUCCESS, LOAD_PARTICIPANT_ALL_SUCCESS, SET_MODIFY, UPDATE_PARTICIPANT, ADD_PARTICIPANT, DELETE_PARTICIPANT} from '../constans/Page';

const initialState = {
    message: '',
    mass: [],
    partic: {},
    modify: ''
}

export default function pagedocument(state = initialState, actions) {
    switch (actions.type){
        case LOAD_PARTICIPANT_ALL_SUCCESS:
            return {...state, mass: actions.payload.mass, partic:'', modify:''}

        case LOAD_PARTICIPANT_SUCCESS:
            return {...state, mass: [], partic: actions.payload}

        case SET_MODIFY:
            return {...state, mass: [], modify: actions.payload.modify}

        case UPDATE_PARTICIPANT:
            return {...state, mass: [], modify:'', partic: actions.payload}

        case ADD_PARTICIPANT:
            return {...state, mass: actions.payload.mass}

        case DELETE_PARTICIPANT:
            return {...state, mass: actions.payload.mass}

        default:
            return state;
    }

}