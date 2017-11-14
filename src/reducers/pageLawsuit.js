import { LOAD_LAWSUIT_ALL_SUCCESS,
         SET_MODIFY,
         LOAD_LAWSUIT_SUCCESS,
         UPDATE_LAWSUIT,
         SET_UPDATED_DATA,
         SET_UPDATED_SHEDULE_DATA,
         INITIAL_SHEDULE,
         SET_UPDATED_DOCUMENT_DATA,
         INITIAL_DOCUMENT,
         ADD_LAWSUIT,
         DELETE_LAWSUIT,
         MAIN_SEARCH,
         ADD_SHEDULE
} from '../constans/Page';

const initialState = {
    message: '',
    mass: [],
    lawsuit: '',
    modify: false,
    updated_lawsuit_part: [],
    participants: [],
    set_participants:[],
    set_shedules:[],
    set_documents:[],
    search_participant_for_lawsuit: '',
    search_document_for_lawsuit: '',
    shedule: [],
    document: [],
    search_shedule_for_lawsuit: ''
}

export default function pagelawsuit(state = initialState, actions) {
    switch (actions.type){
        case LOAD_LAWSUIT_ALL_SUCCESS:
            return {...state, mass: actions.payload.mass, lawsuit: '' }

        case LOAD_LAWSUIT_SUCCESS:
            return {...state, mass: [], lawsuit: actions.payload, modify:false}

        case SET_MODIFY:
            return {...state, mass: [], modify: actions.payload.modify, participants: actions.payload.participants,search_participant_for_lawsuit: actions.payload.search_participant_for_lawsuit }

        case SET_UPDATED_DATA:
            return {...state, mass: [], set_participants: actions.payload.set_participants}

        case INITIAL_SHEDULE:
            return {...state,mass: [], shedule: actions.payload.shedule, search_shedule_for_lawsuit: actions.payload.search_shedule_for_lawsuit }

        case SET_UPDATED_SHEDULE_DATA:
            return {...state, mass: [], set_shedules: actions.payload.set_shedules}

        case INITIAL_DOCUMENT:
            return {...state,mass: [], document: actions.payload.document, search_document_for_lawsuit: actions.payload.search_document_for_lawsuit }

        case SET_UPDATED_DOCUMENT_DATA:
            return {...state, mass: [], set_documents: actions.payload.set_documents}

        case UPDATE_LAWSUIT:
            return {...state, mass: [], modify:false, set_participants:[], set_shedules:[], set_documents:[]}

        case ADD_LAWSUIT:
            return {...state, mass: actions.payload.mass}

        case DELETE_LAWSUIT:
            return {...state, mass: actions.payload.mass}

        case MAIN_SEARCH:
            return {...state, mass: actions.payload.mass}

        case ADD_SHEDULE:
            return {...state}

        default:
            return state;
    }

}