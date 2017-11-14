import React, { Component } from 'react';


export default class DocumentItem extends Component{
    Modify(){
        this.props.set_modify();
    }
    UpdateDocument(){
        this.props.update_document({
            objectId: this.props.doc.objectId,
            type: this.refs.type.value,
            name:this.refs.name.value
        });
    }
    render(){
        let render_mass = [];
        if(!this.props.modify) {
            render_mass.push(<div key={render_mass.length} className="document"><h1>{this.props.doc.type}</h1><h2>{this.props.doc.name}</h2><input type="button" onClick={this.Modify.bind(this)} value="Редактировать"/></div>);
        }else{
            render_mass.push(<div key={render_mass.length} className="document_edit">
                <h1>Редактирование</h1>
                <select ref='type' defaultValue={this.props.doc.type}>
                    <option>Закон</option>
                    <option>Постановление</option>
                </select>
                <textarea name="" id="" ref='name' cols="30" rows="5" defaultValue={this.props.doc.name}></textarea>
                <input type="button" onClick={this.UpdateDocument.bind(this)} value="Сохранить"/>
            </div>);
        }
        return <div>{render_mass}</div>
    }
}