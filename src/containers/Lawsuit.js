import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pageLawsuitActions from '../actions/PageLawsuitActions';
import PageLawsuit from '../components/PageLawsuit';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
    page: state.pagelawsuit
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Lawsuit extends Component{

    static propTypes = {
        set_shedules: PropTypes.array.isRequired,
        set_participants: PropTypes.array.isRequired,
        set_documents: PropTypes.array.isRequired,
        document: PropTypes.array.isRequired,
        shedule: PropTypes.array.isRequired,
        mass: PropTypes.array.isRequired,
        link: PropTypes.string.isRequired,
        search_document_for_lawsuit: PropTypes.string.isRequired,
        search_shedule_for_lawsuit: PropTypes.string.isRequired,
        search_participant_for_lawsuit_for_lawsuit: PropTypes.string.isRequired,
        participants: PropTypes.array.isRequired,
        lawsuit: PropTypes.array.isRequired,
        modify: PropTypes.bool.isRequired
    }

    render(){
        const { page } = this.props;
        const { load, load_lawsuit, set_modify, update_lawsuit,set_shedule, set_doc, delete_lawsuit, add_lawsuit, main_search, add_shedule } = this.props.pageLawsuitActions;
        return(
            <div className='app container'>
                <PageLawsuit add_shedule={add_shedule} set_shedules={page.set_shedules} document={page.document}
                             delete_lawsuit={delete_lawsuit} main_search={main_search} add_lawsuit={add_lawsuit}
                             set_documents={page.set_documents} search_document_for_lawsuit={page.search_document_for_lawsuit}
                             search_shedule_for_lawsuit={page.search_shedule_for_lawsuit} shedule={page.shedule}
                             set_shedule={set_shedule} search_participant_for_lawsuit={page.search_participant_for_lawsuit}
                             set_participants={page.set_participants} id={this.props.match.params.id? this.props.match.params.id: ''}
                             set_modify={set_modify} set_doc={set_doc} update_lawsuit={update_lawsuit} modify={page.modify}
                             mass={page.mass} participants={page.participants} lawsuit={page.lawsuit} load={load}
                             load_lawsuit={load_lawsuit} />
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return{
        pageLawsuitActions: bindActionCreators(pageLawsuitActions, dispatch)
    }
}
