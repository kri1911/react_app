import React , { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component{
    render(){
        return(
            <header>
                <nav className="navbar navbar-light bg-ligth navbar-expand-md">
                    <a className="navbar-brand" href="/"><div className='logo'></div></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className='nav-item text-center'><Link className='nav-link' to='/'>Главная</Link></li>
                            <li className='nav-item text-center'><Link className='nav-link' to='/lawsuit'>Дела</Link></li>
                            <li className='nav-item text-center'><Link className='nav-link' to='/document'>Документы</Link></li>
                            <li className='nav-item text-center'><Link className='nav-link' to='/participants'>Участники</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}