import React, { Component } from 'react';


export default class ParticipantItem extends Component{
    Modify(){
        this.props.set_modify();
    }
    UpdateParticipant(){
        this.props.update_participant({
            objectId: this.props.partic.objectId,
            type: this.refs.type.value,
            name:this.refs.name.value,
            phone:this.refs.phone.value,
            adress:this.refs.adress.value
        });
    }
    render(){
        let render_mass = [];
        if(!this.props.modify) {
            render_mass.push(<div key={render_mass.length} className="participant"><h1>{this.props.partic.name}</h1><h2>{this.props.partic.type}</h2><h2>{this.props.partic.adress}</h2><h2>{this.props.partic.phone}</h2><input type="button" onClick={this.Modify.bind(this)} value="Редактировать"/></div>);
        }else{
            render_mass.push(<div key={render_mass.length} className="participant_edit">
                <h1>Редактирование</h1>
                <input type="text" ref='name' defaultValue={this.props.partic.name}/>
                <input type="text" ref='type' defaultValue={this.props.partic.type}/>
                <input type="text" ref='phone' defaultValue={this.props.partic.phone}/>
                <input type="text" ref='adress' defaultValue={this.props.partic.adress}/>
                <input type="button" onClick={this.UpdateParticipant.bind(this)} value="Сохранить"/>
            </div>);
        }
        return <div>{render_mass}</div>
    }
}