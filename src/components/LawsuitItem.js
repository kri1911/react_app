import React, { Component } from 'react';


export default class LawsuitItem extends Component{
    componentDidMount(){
        this.props.set_shedule();
        this.props.set_doc();
    }
    Modify(){
        this.props.set_modify();
    }
    search_participant(){
        let value = this.refs.search_input.value;
        this.props.set_modify('',value);
    }

    RemoveParticipant(e){
        if(this.props.set_participants.length > 0){
            this.props.set_modify('DELETE','',this.props.set_participants, e.target.value);
        }else {
            this.props.set_modify('DELETE','',this.props.lawsuit.participants_id, e.target.value);
        }
    }

    add_participant(target, e) {
        if(this.props.set_participants.length > 0){
            this.props.set_modify('ADD','',this.props.set_participants, target);
        }else {
            this.props.set_modify('ADD','',this.props.lawsuit.participants_id, target);
        }
    }

    search_shedule(){
        let value = this.refs.search_input_shedule.value;
        this.props.set_shedule('',value);
    }

    RemoveShedule(e){
        if(this.props.set_shedules.length > 0){
            this.props.set_shedule('DELETE','',this.props.set_shedules, e.target.value);
        }else {
            this.props.set_shedule('DELETE','',this.props.lawsuit.shedule_id, e.target.value);
        }
    }
    add_shedule(target, e) {
        if(this.props.set_participants.length > 0){
            this.props.set_shedule('ADD','',this.props.set_shedules, target);
        }else {
            this.props.set_shedule('ADD','',this.props.lawsuit.shedule_id, target);
        }
    }
    search_documents(){
        let value = this.refs.search_input_document.value;
        this.props.set_doc('',value);
    }
    RemoveDocument(e){
        if(this.props.set_documents.length > 0){
            this.props.set_doc('DELETE','',this.props.set_documents, e.target.value);
        }else {
            this.props.set_doc('DELETE','',this.props.lawsuit.documents_id, e.target.value);
        }
    }
    add_document(target, e) {
        if(this.props.set_documents.length > 0){
            this.props.set_doc('ADD','',this.props.set_documents, target);
        }else {
            this.props.set_doc('ADD','',this.props.lawsuit.documents_id, target);
        }
    }
    UpdateLawsuit(){
        let mass = [],
            shedule = [],
            document = [];
        if(this.props.set_shedules.length > 0){
            shedule = this.props.set_shedules;
        }else {
            shedule = this.props.lawsuit.shedule_id;
        }
        if(this.props.set_participants.length > 0){
            mass = this.props.set_participants;
        }else {
           mass = this.props.lawsuit.participants_id;
        }
        if(this.props.set_documents.length > 0){
            document = this.props.set_documents;
        }else {
            document = this.props.lawsuit.documents_id;
        }
       this.props.update_lawsuit({
            objectId: this.props.lawsuit.objectId,
            type: this.refs.type.value,
            state:this.refs.state.value
        }, mass,shedule,document);
    }
    render(){
        var data = [],
            participants = [],
            shedule = [],
            document = [],
            search_result_document = [],
            edit_participants = [],
            search_result = [],
            search_result_shedule = [],
            shedule_mass = [],
            document_mass = [];

        if(!this.props.modify) {
            let sh_mass = [];
            for(let key in this.props.lawsuit.shedule_id){
                var myDate = new Date(this.props.lawsuit.shedule_id[key].datetime);
                sh_mass.push(<div key={this.props.lawsuit.shedule_id[key].objectId}><h3><span>Тип заседания:</span> {this.props.lawsuit.shedule_id[key].type}</h3><h3>
                    <span>Дата заседания:</span> {''+myDate+''}</h3></div>);
            }
            data.push(<div className="lawsuit">
                <h2>{this.props.lawsuit.type}</h2>
                <h3><span>Статус:</span> {this.props.lawsuit.state}</h3>
                {sh_mass}
                <div className="persons">{this.props.lawsuit.participants_id.map(function (item, index) {
                    return <div key={index}><h3><span>Участник:</span> {item.name}</h3><h3>
                        <span>Должность:</span> {item.type}</h3><h3><span>Адрес:</span> {item.adress}</h3><h3><span>Телефон:</span> {item.phone}
                    </h3></div>;
                })}</div>
                {this.props.lawsuit.documents_id.map(function (item, index) {
                    return <div key={index}><h3><span>Тип документа:</span> {item.type}</h3><h3><span>Название документа:</span> {item.name}
                    </h3></div>;
                })}
                <input type="button" onClick={this.Modify.bind(this)} value="Редактировать"/>
            </div>)
        }else{
            let new_participants,
                new_shedule,
                new_document;

            if(this.props.set_participants.length > 0){
                new_participants = this.props.set_participants;
            }else{
                new_participants = this.props.lawsuit.participants_id;
            }
            for(let key in new_participants){
                participants.push(new_participants[key].objectId)
            }
            for(let key in this.props.participants){
                if(participants.join().indexOf(this.props.participants[key].objectId) > -1) {
                    edit_participants.push(
                        <div data-id={this.props.participants[key].objectId}>
                            <label htmlFor="">{this.props.participants[key].type+": "+this.props.participants[key].name}</label>
                            <button className='addButton' value={this.props.participants[key].objectId} onClick={this.RemoveParticipant.bind(this)}>X</button>
                        </div>
                    );
                }
            }
            for(let key in this.props.participants) {
                if ((this.props.participants[key].name.indexOf(this.props.search_participant_for_lawsuit) > -1)||(this.props.participants[key].type.indexOf(this.props.search_participant_for_lawsuit) > -1)) {
                    search_result.push(
                        <div key={this.props.participants[key].objectId} value={this.props.participants[key].objectId} className="Search_item" onClick={this.add_participant.bind(this, this.props.participants[key].objectId)}>
                            <h5>{this.props.participants[key].type}: {this.props.participants[key].name}</h5>
                        </div>
                    )
                }else {
                    continue;
                }
            }

            if(this.props.set_shedules.length > 0){
                new_shedule = this.props.set_shedules;
            }else{
                new_shedule = this.props.lawsuit.shedule_id;
            }

            for(let key in new_shedule){
                shedule.push(new_shedule[key].objectId)
            };
            for(let key in this.props.shedule) {
                if(shedule.join().indexOf(this.props.shedule[key].objectId) > -1) {
                    var myDate = new Date(this.props.shedule[key].datetime);
                    shedule_mass.push(
                        <div key={this.props.shedule[key].objectId}>
                            <label htmlFor="">{this.props.shedule[key].type+": "+myDate}</label>
                            <button className='addButton' value={this.props.shedule[key].objectId} onClick={this.RemoveShedule.bind(this)}>X</button>
                        </div>
                    )
                }
            }
            for(let key in this.props.shedule) {
                var myDate = new Date(this.props.shedule[key].datetime);
                if ((this.props.shedule[key].type.indexOf(this.props.search_shedule_for_lawsuit) > -1)||(""+myDate+"".indexOf(this.props.search_shedule_for_lawsuit) > -1)) {
                    search_result_shedule.push(
                        <div key={this.props.shedule[key].objectId}
                             value={this.props.shedule[key].objectId} className="Search_item"
                             onClick={this.add_shedule.bind(this, this.props.shedule[key].objectId)}
                        >
                            <h5>{this.props.shedule[key].type}: {""+myDate+""}</h5>
                        </div>
                    )
                }else {
                    continue;
                }
            }

            if(this.props.set_documents.length > 0){
                new_document = this.props.set_documents;
            }else{
                new_document = this.props.lawsuit.documents_id;
            }

            for(let key in new_document){
                document.push(new_document[key].objectId)
            }
            for(let key in this.props.document) {
                if(document.join().indexOf(this.props.document[key].objectId) > -1) {
                    document_mass.push(
                        <div key={this.props.document[key].objectId}>
                            <label htmlFor="">{this.props.document[key].type+": "+this.props.document[key].name}</label>
                            <button className='addButton' value={this.props.document[key].objectId} onClick={this.RemoveDocument.bind(this)}>X</button>
                        </div>
                    )
                }
            }
            for(let key in this.props.document) {
                if ((this.props.document[key].type.indexOf(this.props.search_document_for_lawsuit) > -1)||(this.props.document[key].name.indexOf(this.props.search_document_for_lawsuit) > -1)) {
                    search_result_document.push(
                        <div value={this.props.document[key].objectId} className="Search_item" onClick={this.add_document.bind(this, this.props.document[key].objectId)}>
                            <h5>{this.props.document[key].type}: {this.props.document[key].name}</h5>
                        </div>
                    )
                }else {
                    continue;
                }
            }

            data.push(
                <div className="lawsuit_edit">
                    <div className='Current_lawsuit'>
                        <h1>Редактирование</h1>
                        <select ref='type' defaultValue={this.props.lawsuit.type}>
                            <option>Административное дело</option>
                            <option>Уголовное дело</option>
                        </select>
                        <select ref='state' defaultValue={this.props.lawsuit.state}>
                            <option selected defaultValue='Завершено'>Завершено</option>
                            <option defaultValue='В процессе'>В процессе</option>
                        </select>
                        <div className='shedules'>
                            <h2>Текущие расписания:</h2>
                            {shedule_mass}
                        </div>
                        <div className='documents'>
                            <h2>Текущие документы:</h2>
                            {document_mass}
                        </div>
                        <div className="persons_edit" id='persons'>
                            <h2>Текущие участники:</h2>
                            {edit_participants}
                        </div>
                        <input type="button" onClick={this.UpdateLawsuit.bind(this)} value="Сохранить"/>
                    </div>
                    <div className="search_field">
                        <div className='search_participant'>
                            <input type="text" ref='search_input' placeholder="Поиск участника" onChange={this.search_participant.bind(this)}/>
                            <div id='search_answers_participant'>{search_result}</div>
                        </div>
                        <div className='search_shedule'>
                            <input type="text" ref='search_input_shedule' placeholder="Поиск расписания"  onChange={this.search_shedule.bind(this)}/>
                            <div id='search_answers_shedule'>{search_result_shedule}</div>
                        </div>
                        <div className='search_document'>
                            <input type="text" ref='search_input_document' placeholder='Поиск документа' onChange={this.search_documents.bind(this)}/>
                            <div id='search_answers_document'>{search_result_document}</div>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>{data[0]}</div>
        );
    }
}