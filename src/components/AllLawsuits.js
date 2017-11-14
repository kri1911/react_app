import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllLawsuit extends Component{
    componentDidMount(){
        console.log('привет')
        console.log(this.props.add_lawsuit)
    }
    addShedule(){
        this.props.add_shedule({type: this.refs.shed_type.value, datetime: this.refs.date.value})
    }
    MainSearch(){
        this.props.main_search(this.refs.search.value);
    }
    add_law(){
        if(this.refs.state.value && this.refs.type.value){
            this.props.add_lawsuit({
                state: this.refs.state.value,
                type: this.refs.type.value,
            })
        }
    }
    remove__law(target, e){
        this.props.delete_lawsuit(target);
    }
    render() {
        var data = [],
            thead;

        data.push(<tr key='edit'>
                <td><button className='addButton' onClick={this.add_law.bind(this)} >+</button><select ref='type'>
                    <option
                        defaultValue='Административное дело'>Административное дело</option>
                    <option defaultValue='Уголовное дело'>Уголовное дело</option>
                </select></td>
                <td><select ref='state'>
                    <option
                        defaultValue='В процессе'>В процессе</option>
                    <option defaultValue='Завершено'>Завершено</option>
                </select></td>
                <td></td>
            </tr>
        );

        for (let key in this.props.mass) {
            data.push(<tr key={key}>
                <td><Link to={`/lawsuit/${this.props.mass[key].objectId}`}>{this.props.mass[key].type}</Link></td>
                <td>{this.props.mass[key].state}</td>
                <td className='delete_button' onClick={this.remove__law.bind(this, this.props.mass[key].objectId)}>X</td>
            </tr>)
        }

        thead = <tr>
            <td>Тип дела</td>
            <td>Статус дела</td>
            <td>Удалить дело</td>
        </tr>;
        return (
            <div>
                <div className='shedul'><label htmlFor="" >Добавить расписание</label></div>
                <div className='shedul'>
                    <button className='addButton' onClick={this.addShedule.bind(this)} >+</button>
                    <select name="" ref='shed_type' id="">
                        <option value="Открытое">Открытое</option>
                        <option value="Закрытое">Закрытое</option>
                    </select>
                    <input type="date" ref='date'/>
                </div>
                {!this.props.ld ? <div className='main_search'><input type="text" ref='search'  onChange={this.MainSearch.bind(this)} placeholder='Поиск'/></div>: ''}
                <table className='table table-responsive'>
                    <thead>{thead}</thead>
                    <tbody>{data}</tbody>
                </table>
            </div>
        );
    }
}