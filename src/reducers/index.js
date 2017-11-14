import { combineReducers } from 'redux';
import user from './user';
import pagedocument from './pageDocument';
import pagelawsuit from './pageLawsuit';
import pageparticipant from './pageParticipant';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    user,
    pagedocument,
    pagelawsuit,
    pageparticipant
});