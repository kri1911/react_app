import { LOAD_LAWSUIT_SUCCESS,
         SET_MODIFY,
         LOAD_LAWSUIT_ALL_SUCCESS,
         UPDATE_LAWSUIT,
         SET_UPDATED_DATA,
         SET_UPDATED_SHEDULE_DATA,
         INITIAL_SHEDULE,
         SET_UPDATED_DOCUMENT_DATA,
         INITIAL_DOCUMENT,
         ADD_LAWSUIT,
         DELETE_LAWSUIT,
         MAIN_SEARCH,
         ADD_SHEDULE} from '../constans/Page';
import Backendless from 'backendless';

function getData(mass, TYPE, queryBuilder, dispatch){

    queryBuilder.setSortBy(['created DESC']);

    Backendless.Data.of('Lawsuit').find(queryBuilder).then(function (result) {
        for(let key in result){
            mass.push(result[key]);
        }

        dispatch({
            type: TYPE,
            payload: {mass}
        })
    });
}


export function load() {
    return (dispatch) => {
        var mass = [];
        var queryBuilder = Backendless.DataQueryBuilder.create();
        queryBuilder.setRelated( [ "participants_id", "shedule_id", "documents_id" ] );
        getData(mass, LOAD_LAWSUIT_ALL_SUCCESS, queryBuilder, dispatch);
    }
}

export function load_lawsuit(target) {
    return (dispatch) => {
        Backendless.Data.of('Lawsuit').findById({
            objectId: "" + target + "",
            loadRelations: "participants_id,shedule_id,documents_id"
        }).then(function (result) {
            console.log(result);
            dispatch({
                type: LOAD_LAWSUIT_SUCCESS,
                payload: result
            })
        })
    }
}

export function load_in_progress() {

    return (dispatch) => {
        var mass = [];
        var queryBuilder = Backendless.DataQueryBuilder.create();
        queryBuilder.setRelated( [ "participants_id", "shedule_id", "documents_id" ] );

        Backendless.Data.of('Lawsuit').find(queryBuilder).then(function (result) {
            for(let key in result){
                if(result[key].state === 'В процессе') {
                    mass.push(result[key]);
                }
            }
            console.log(result);
            dispatch({
                type: LOAD_LAWSUIT_ALL_SUCCESS,
                payload: {mass}
            })
        });
    }
}

export function set_modify(command = '',search_participant_for_lawsuit = '',participant_mass = [], target = '') {
    let participants = [],
        set_participants = [],
        id_mass = [];
    return (dispatch) => {
        Backendless.Data.of('participants').find().then(function (result) {
        switch (command){
            case 'ADD':
                for (let key in participant_mass) {
                    set_participants.push(participant_mass[key]);
                    id_mass.push(participant_mass[key].objectId);
                }
                for (let key in result) {
                    if((result[key].objectId == target)&&(id_mass.join().indexOf(target) == -1)){
                        set_participants.push(result[key]);
                    }
                }
                dispatch({
                    type: SET_UPDATED_DATA,
                    payload: {set_participants}
                })
                break;

            case 'DELETE':
                for (let key in participant_mass) {
                    set_participants.push(participant_mass[key]);
                }
                let indexToRemove = set_participants.findIndex(obj => obj.objectId == target);

                set_participants.splice(indexToRemove , 1);

                dispatch({
                    type: SET_UPDATED_DATA,
                    payload: {set_participants}
                })
                break;

            case '':
                for (let key in result) {
                    participants.push(result[key]);
                }
                let modify = true;
                dispatch({
                    type: SET_MODIFY,
                    payload: {modify, participants, search_participant_for_lawsuit}
                })
                break;
        }
        });
    }
}


export function set_shedule(command = '',search_shedule_for_lawsuit = '',shedule_mass = [], target = '') {
    let shedule = [],
        set_shedules = [],
        id_mass = [];
    return (dispatch) => {
        Backendless.Data.of('Shedule').find().then(function (result) {
            switch (command){
                case 'ADD':
                    for (let key in shedule_mass) {
                        set_shedules.push(shedule_mass[key]);
                        id_mass.push(shedule_mass[key].objectId);
                    }
                    for (let key in result) {
                        if((result[key].objectId == target)&&(id_mass.join().indexOf(target) == -1)){
                            set_shedules.push(result[key]);
                        }
                    }
                    dispatch({
                        type: SET_UPDATED_SHEDULE_DATA,
                        payload: {set_shedules}
                    })
                    break;

                case 'DELETE':
                    for (let key in shedule_mass) {
                        set_shedules.push(shedule_mass[key]);
                    }
                    let indexToRemove = set_shedules.findIndex(obj => obj.objectId == target);

                    set_shedules.splice(indexToRemove , 1);

                    dispatch({
                        type: SET_UPDATED_SHEDULE_DATA,
                        payload: {set_shedules}
                    })
                    break;

                case '':
                    for (let key in result) {
                        shedule.push(result[key]);
                    }
                    dispatch({
                        type: INITIAL_SHEDULE,
                        payload: {shedule, search_shedule_for_lawsuit}
                    })
                    break;
            }
        });
    }
}

export function set_doc(command = '',search_document_for_lawsuit = '',document_mass = [], target = '') {
    let document = [],
        set_documents = [],
        id_mass = [];
    return (dispatch) => {
        Backendless.Data.of('documents').find().then(function (result) {
            switch (command){
                case 'ADD':
                    for (let key in document_mass) {
                        set_documents.push(document_mass[key]);
                        id_mass.push(document_mass[key].objectId);
                    }
                    for (let key in result) {
                        if((result[key].objectId == target)&&(id_mass.join().indexOf(target) == -1)){
                            set_documents.push(result[key]);
                        }
                    }
                    dispatch({
                        type: SET_UPDATED_DOCUMENT_DATA,
                        payload: {set_documents}
                    })
                    break;

                case 'DELETE':
                    for (let key in document_mass) {
                        set_documents.push(document_mass[key]);
                    }
                    let indexToRemove = set_documents.findIndex(obj => obj.objectId == target);

                    set_documents.splice(indexToRemove , 1);

                    dispatch({
                        type: SET_UPDATED_DOCUMENT_DATA,
                        payload: {set_documents}
                    })
                    break;

                case '':
                    for (let key in result) {
                        document.push(result[key]);
                    }
                    dispatch({
                        type: INITIAL_DOCUMENT,
                        payload: {document, search_document_for_lawsuit}
                    })
                    break;
            }
        });
    }
}


export function update_lawsuit(update, participants, shedule, document) {
    return (dispatch) => {
        Backendless.Data.of("Lawsuit").save(update)
            .then(function (savedObject) {
                dispatch({
                    type: UPDATE_LAWSUIT
                });
                let contactStorage = Backendless.Data.of( "Lawsuit" ),
                    children = [];

                participants.forEach(function (currentValue, index, array) {
                    children.push(currentValue.objectId);
                });

                var parentObject = { objectId: update.objectId };
                contactStorage.setRelation(parentObject, "participants_id", children);

                children = [];
                shedule.forEach(function (currentValue, index, array) {
                    children.push(currentValue.objectId);
                });
                contactStorage.setRelation(parentObject, "shedule_id", children);

                children = [];
                document.forEach(function (currentValue, index, array) {
                    children.push(currentValue.objectId);
                });
                contactStorage.setRelation(parentObject, "documents_id", children);

                contactStorage.findById({
                    objectId: "" + update.objectId + "",
                    loadRelations: "participants_id,shedule_id,documents_id"
                }).then(function (result) {
                    dispatch({
                        type: LOAD_LAWSUIT_SUCCESS,
                        payload: result
                    })
                })
            })
    }
}

export function add_lawsuit(data) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("Lawsuit").save(data)
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated([ "participants_id", "shedule_id", "documents_id" ]);
                getData(mass, ADD_LAWSUIT, queryBuilder, dispatch);
            })
    }
}

export function delete_lawsuit(id) {
    let mass = [];
    return (dispatch) => {
        Backendless.Data.of("Lawsuit").remove({objectId: id})
            .then(function (savedObject) {
                var queryBuilder = Backendless.DataQueryBuilder.create();
                queryBuilder.setRelated([ "participants_id", "shedule_id", "documents_id" ]);
                getData(mass, DELETE_LAWSUIT, queryBuilder, dispatch);
            })
    }
}

export function main_search(data) {
    let mass = [];
    return (dispatch) => {
        var mass = [];

        var queryBuilder = Backendless.DataQueryBuilder.create();
        queryBuilder.setWhereClause(
            "objectId IN (Lawsuit[participants_id.name LIKE '%" + data + "%'].objectId) " +
            "OR objectId IN (Lawsuit[documents_id.name LIKE '%" + data + "%'].objectId) " +
            "OR objectId IN (Lawsuit[shedule_id.type LIKE '%" + data + "%'].objectId) " +
            "OR state LIKE '%" + data + "%' " +
            "OR type LIKE '%" + data + "%' "
        );
        getData(mass, MAIN_SEARCH, queryBuilder, dispatch);
    }
}

export function add_shedule(data) {
    return (dispatch) => {
        Backendless.Data.of("Shedule").save(data)
            .then(function (savedObject) {
                dispatch({
                    type: ADD_SHEDULE
                })
                alert('Расписание создано');
            });
    }
}