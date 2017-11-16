import { LOAD_PARTICIPANT_SUCCESS, LOAD_PARTICIPANT_ALL_SUCCESS, SET_MODIFY, UPDATE_PARTICIPANT, ADD_PARTICIPANT, DELETE_PARTICIPANT } from '../constans/Page';
import Backendless from 'backendless';
let APP_ID = "65C4EB6E-067E-1E36-FF02-606F133B7F00",
    API_KEY = "45E56205-830A-5E27-FF61-10A4D45F9600";

Backendless.initApp(APP_ID, API_KEY);

function getData(mass, TYPE, queryBuilder, dispatch){

    queryBuilder.setSortBy(['created DESC']);

    Backendless.Data.of('participants').find(queryBuilder).then(function (result) {
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
        getData(mass, LOAD_PARTICIPANT_ALL_SUCCESS, queryBuilder, dispatch);
    }
}

export function load_participant(target) {
    return (dispatch) => {
        Backendless.Data.of('participants').findById({
            objectId: "" + target + "",
            loadRelations: "lawsuit_id"
        }).then(function (result) {
            console.log(result);
            dispatch({
                type: LOAD_PARTICIPANT_SUCCESS,
                payload: result
            })
        })
    }
}
export function set_modify() {
    let participants = [];
    return (dispatch) => {
            let modify = true;
            dispatch({
                type: SET_MODIFY,
                payload: {modify}
            })
    }
}

export function update_participant(data) {
    return (dispatch) => {
        Backendless.Data.of("participants").save(data)
            .then(function (savedObject) {
                dispatch({
                    type: UPDATE_PARTICIPANT,
                        payload: savedObject
                });
            })
    }
}

export  function add_participants(data) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("participants").save(data)
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated(["lawsuit_id"]);
                getData(mass,ADD_PARTICIPANT, queryBuilder, dispatch);
            })
    }
}

export function delete_participant(id) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("participants").remove({objectId: id})
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated(["lawsuit_id"]);
                getData(mass, DELETE_PARTICIPANT, queryBuilder, dispatch);
            })
    }
}