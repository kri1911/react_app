import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import   PageLawsuit from '../components/PageLawsuit';
import * as pageLawsuitActions from '../actions/PageLawsuitActions';
import Backendless from 'backendless';
import PropTypes from 'prop-types';

let APP_ID = "65C4EB6E-067E-1E36-FF02-606F133B7F00",
    API_KEY = "45E56205-830A-5E27-FF61-10A4D45F9600";

Backendless.initApp(APP_ID, API_KEY);

const mapStateToProps = (state) => ({
    page: state.pagelawsuit
});


@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        set_shedules: PropTypes.array.isRequired,
        set_participants: PropTypes.array.isRequired,
        set_documents: PropTypes.array.isRequired,
        mass: PropTypes.array.isRequired,
        link: PropTypes.string.isRequired
    }
    render(){
        const { page } = this.props;
        const { load } = this.props.pageLawsuitActions;
        const { load_in_progress, delete_lawsuit, add_lawsuit, add_shedule, set_modify, set_doc, set_shedule } = this.props.pageLawsuitActions;
        return(
            <div className='app container'>
                <PageLawsuit set_shedules={page.set_shedules} set_modify={set_modify} set_doc={set_doc} set_shedule={set_shedule} set_participants={page.set_participants} set_documents={page.set_documents} mass={page.mass} add_shedule={add_shedule} delete_lawsuit={delete_lawsuit} add_lawsuit={add_lawsuit} load_in_progress={load_in_progress} link={page.link} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        pageLawsuitActions: bindActionCreators(pageLawsuitActions, dispatch)
    }
}