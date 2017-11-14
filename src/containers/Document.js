import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PageDocumentAction from '../actions/PageDocumentActions';
import { bindActionCreators } from 'redux';
import PageDocument from '../components/PageDocument';
import Backendless from 'backendless';

const mapStateToProps = (state) => ({page: state.pagedocument});

@connect(mapStateToProps, mapDispatchToProps)
export default class Document extends Component {
    render() {
        const {page} = this.props;
        const {load_all, load_document,add_document, delete_document, update_document, set_modify } = this.props.PageDocumentAction;
            return (
                <div className='app container'>
                    <PageDocument add_document={add_document} modify={page.modify} set_modify={set_modify}
                                  update_document={update_document} delete_document={delete_document}
                                  id={this.props.match.params.id? this.props.match.params.id: ''} mass={page.doc? [] : page.mass}
                                  doc={page.doc} load_all={load_all} load_document={load_document}
                    />
                </div>);
    }
}


function mapDispatchToProps(dispatch) {
    return({
        PageDocumentAction: bindActionCreators(PageDocumentAction, dispatch)
    });
}
