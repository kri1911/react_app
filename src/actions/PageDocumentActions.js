import { LOAD_DOCUMENT_SUCCESS, LOAD_DOCUMENT_ALL_SUCCESS, ADD_DOCUMENT, DELETE_DOCUMENT, SET_MODIFY, UPDATE_DOCUMENT} from '../constans/Page';
import Backendless from 'backendless';
let APP_ID = "65C4EB6E-067E-1E36-FF02-606F133B7F00",
    API_KEY = "45E56205-830A-5E27-FF61-10A4D45F9600";

Backendless.initApp(APP_ID, API_KEY);

function getData(mass, TYPE, queryBuilder, dispatch){

    queryBuilder.setSortBy(['created DESC']);

    Backendless.Data.of('documents').find(queryBuilder).then(function (result) {
        for (let key in result) {
            mass.push(result[key]);
        }
        dispatch({
            type: TYPE,
            payload: {mass}
        })
    });
}

export function load_all() {

    return (dispatch) => {
        var mass = [];
        var queryBuilder = Backendless.DataQueryBuilder.create();
            queryBuilder.setRelated(["lawsuit_id"]);
            getData(mass, LOAD_DOCUMENT_ALL_SUCCESS, queryBuilder, dispatch);
    }
}

export function load_document(target) {
    return (dispatch) => {
        Backendless.Data.of('documents').findById({
            objectId: "" + target + "",
            loadRelations: "lawsuit_id"
        }).then(function (result) {
            console.log(result);
            dispatch({
                type: LOAD_DOCUMENT_SUCCESS,
                payload: result
            })
        })
    }
}

export  function add_document(data) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("documents").save(data)
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated(["lawsuit_id"]);
                getData(mass, ADD_DOCUMENT, queryBuilder, dispatch);
            })
    }
}

export function update_document(data) {
    return (dispatch) => {
        Backendless.Data.of("documents").save(data)
            .then(function (savedObject) {
                dispatch({
                    type: UPDATE_DOCUMENT,
                    payload: savedObject
                });
            })
    }
}

export function set_modify() {
    return (dispatch) => {
        let modify = true;
        dispatch({
            type: SET_MODIFY,
            payload: {modify}
        })
    }
}

export function delete_document(id) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("documents").remove({objectId: id})
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated(["lawsuit_id"]);
                getData(mass, DELETE_DOCUMENT, queryBuilder, dispatch);
            })
    }
}