import React, { Component } from 'react';
import backendless from 'backendless';
import ReactDOM from 'react-dom';


export default class User extends Component{
    onLog(){
        let that = this;
        let APP_ID = "65C4EB6E-067E-1E36-FF02-606F133B7F00",
            API_KEY = "45E56205-830A-5E27-FF61-10A4D45F9600",
            login = ReactDOM.findDOMNode(this.refs.log).value,
            password = ReactDOM.findDOMNode(this.refs.psw).value,
            stayLoggedIn = true;
        backendless.initApp(APP_ID, API_KEY);
        backendless.UserService.login(login, password, stayLoggedIn)
        .then(function(){
            that.props.logIn(true);
        })
        .catch(function(error){
            alert(error);
        })
    }
    render(){
        return <div className='user'>
            <h2>{this.props.message}</h2>
            <input type="text" ref='log' />
            <input type="password" ref='psw' />
            <button onClick={this.onLog.bind(this)} className='btn'>Войти</button>
        </div>;
    }
}