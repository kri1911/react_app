import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AllParticipants from './AllParticipants';
import ParticipantItem from './ParticipantItem';
export default class PageParticipant extends Component{
    componentWillMount(){
        if(this.props.id){
            this.props.load_participant(this.props.id);
        }else{
            this.props.load_all();
        }
    }
    render() {

        return (
            <div>
                <Header />
                {!this.props.partic ? <AllParticipants add_participants={this.props.add_participants} delete_participant={this.props.delete_participant} mass={this.props.mass} />:<ParticipantItem update_participant={this.props.update_participant} set_modify={this.props.set_modify}  modify={this.props.modify} partic={this.props.partic} />}
            </div>);
    }
}