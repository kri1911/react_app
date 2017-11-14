import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AllDocuments  from './AllDocuments'
import DocumentItem  from './DocumentItem'
export default class PageDocument extends Component{
    componentWillMount(){
        if(this.props.id){
            this.props.load_document(this.props.id);
        }else{
            this.props.load_all();
        }
    }
    render() {
        var data = [];

        if(!this.props.doc) {
            if (this.props.mass.length > 0) {
                for (let key in this.props.mass) {
                    data.push(<tr key={key}>
                        <td><Link to={`/document/${this.props.mass[key].objectId}`}>{this.props.mass[key].type}</Link></td>
                        <td>{this.props.mass[key].name}</td>
                    </tr>);
                }
            }
        }
        return (
            <div>
                <Header />
                {!this.props.doc ?
                    <AllDocuments add_document={this.props.add_document} delete_document={this.props.delete_document} mass={this.props.mass} />:
                    <DocumentItem doc={this.props.doc} modify={this.props.modify} set_modify={this.props.set_modify} update_document={this.props.update_document}/>
                }
            </div>);
    }
}