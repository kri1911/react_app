import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllDocuments extends Component{
    add_doc(){
        if(this.refs.name.value && this.refs.type.value){
            this.props.add_document({
                name: this.refs.name.value,
                type: this.refs.type.value,
            })
        }
        this.refs.name.value = '';
    }
    remove__doc(target, e){
        this.props.delete_document(target);
    }
    render() {
        var data = [],
            thead;
        data.push(<tr key='edit'>
                <td><button className='addButton' onClick={this.add_doc.bind(this)} >+</button><select ref='type' name="" id="">
                    <option defaultValue='Закон'>Закон</option>
                    <option defaultValue='Постановление'>Постановление</option>
                </select></td>
                <td><textarea name="" ref='name' id="" cols="30" rows="2"></textarea></td>
                <td></td>
            </tr>
        );
        for (let key in this.props.mass) {
            data.push(<tr key={key}>
                <td><Link to={`/document/${this.props.mass[key].objectId}`}>{this.props.mass[key].type}</Link></td>
                <td>{this.props.mass[key].name}</td>
                <td className='delete_button' onClick={this.remove__doc.bind(this, this.props.mass[key].objectId)}>X</td>
            </tr>);
        }
        thead = <tr>
            <td>Тип документа</td>
            <td>Название документа</td>
            <td>Удалить</td>
        </tr>
        return (
            <table className='table table-responsive'>
                <thead>{thead}</thead>
                <tbody>{data}</tbody>
            </table>
        );
    }
}