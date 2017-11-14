import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as pageParticipantAction from '../actions/PageParticipantAction';
import { bindActionCreators } from 'redux';
import PageParticipant from '../components/PageParticipant';
import Backendless from 'backendless';

const mapStateToProps = (state) => ({
    page: state.pageparticipant
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Participant extends Component {
    render() {
        const {page} = this.props;
        const {load_all, load_participant,set_modify, update_participant,add_participants, delete_participant } = this.props.pageParticipantAction;
        return (
            <div className='app container'>
                <PageParticipant add_participants={add_participants} delete_participant={delete_participant} id={this.props.match.params.id? this.props.match.params.id: ''}  mass={page.doc? [] : page.mass} partic={page.partic} modify={page.modify} set_modify={set_modify} load_all={load_all} update_participant={update_participant} load_participant={load_participant} />
            </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return({
        pageParticipantAction: bindActionCreators(pageParticipantAction, dispatch)
    });
}
