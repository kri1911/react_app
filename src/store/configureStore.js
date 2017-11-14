import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
var thunk = require('redux-thunk').default;

export default function configureStore(initialState){
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
    
    if(module.hot){
        module.hot.accept('../reducers', () => {
            const nextreducer = require('../reducers');
            store.replaceReducer(nextreducer);
        });
    }
    return store;   
}