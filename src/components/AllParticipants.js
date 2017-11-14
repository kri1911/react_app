import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllParticipants extends Component{
    add_participants(){
        if(this.refs.name.value && this.refs.type.value && this.refs.adress.value && this.refs.phone.value){
            this.props.add_participants({
                name: this.refs.name.value,
                type: this.refs.type.value,
                adress: this.refs.adress.value,
                phone: this.refs.phone.value
            })
        }
        this.refs.name.value = '';
        this.refs.adress.value = '';
        this.refs.phone.value = '';
    }
    remove__part(target, e){
        this.props.delete_participant(target);
    }
    render() {
        var data = [],
            thead;
        data.push(<tr key='edit'>
            <td><button className='addButton' onClick={this.add_participants.bind(this)} >+</button><input placeholder="ФИО" type="text" ref='name'/></td>
                <td><select ref='type' name="" id="">
                    <option defaultValue='Cудья'>Cудья</option>
                    <option defaultValue='Истец'>Истец</option>
                    <option defaultValue='Ответчик'>Ответчик</option>
                </select></td>
                <td><input type="text" placeholder="Адрес" ref='adress'/></td>
                <td><input type="text" placeholder="Телефон" ref='phone'/></td>
                <td></td>
            </tr>
        );
        for (let key in this.props.mass) {
            data.push(<tr key={key}>
                <td><Link to={`/participants/${this.props.mass[key].objectId}`}>{this.props.mass[key].name}</Link></td>
                <td>{this.props.mass[key].type}</td>
                <td>{this.props.mass[key].adress}</td>
                <td>{this.props.mass[key].phone}</td>
                <td className='delete_button' onClick={this.remove__part.bind(this, this.props.mass[key].objectId)}>X</td>
            </tr>);
        }
        thead = <tr>
            <td>Участник</td>
            <td>Должность</td>
            <td>Адрес</td>
            <td>Телефон</td>
            <td>Удалить</td>
        </tr>
        return (
            <div className='table-responsive'>
                <table className='table'>
                    <thead>{thead}</thead>
                    <tbody>{data}</tbody>
                </table>
            </div>
        );
    }
}