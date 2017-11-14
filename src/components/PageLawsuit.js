import React , { Component } from 'react';
import Backendless from 'backendless';
import Header from './Header';
import AllLawsuit from './AllLawsuits';
import LawsuitItem from './LawsuitItem';

export default class PageLawsuit extends Component{
    componentWillMount(){
        if(this.props.id){
            this.props.load_lawsuit(this.props.id);
        }else{
            if(this.props.load_in_progress){
                this.props.load_in_progress();
            }else{
                this.props.load();
            }
        }
    }
    componentWillUnmount(){
        if(this.props.id) {
            console.log('Пока-Пока-Пока-Пока');
        }
    }
    render(){
        return(
            <div>
                <Header />
                {!this.props.lawsuit? <AllLawsuit add_shedule={this.props.add_shedule} ld={this.props.load_in_progress} main_search={this.props.main_search} delete_lawsuit={this.props.delete_lawsuit} add_lawsuit={this.props.add_lawsuit} mass={this.props.mass} /> : <LawsuitItem document={this.props.document} set_documents={this.props.set_documents} search_document_for_lawsuit={this.props.search_document_for_lawsuit} search_shedule_for_lawsuit={this.props.search_shedule_for_lawsuit} set_shedules={this.props.set_shedules} shedule={this.props.shedule} set_shedule={this.props.set_shedule} set_doc={this.props.set_doc} set_participants={this.props.set_participants} search_participant_for_lawsuit={this.props.search_participant_for_lawsuit} set_modify={this.props.set_modify} participants={this.props.participants} update_lawsuit={this.props.update_lawsuit} modify={this.props.modify} lawsuit={this.props.lawsuit} />}
            </div>);
    }
}

