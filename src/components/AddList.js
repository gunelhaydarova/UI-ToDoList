import React, { Component } from 'react';
import Axios from 'axios';
import { AppContext } from './Context';

export default class AddList extends Component {
    static contextType = AppContext;

    insertList = (event) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/RESTPHP/addTask', {
            list_data: this.listData.value
        })
            .then(function ({ data }) {
                if (data.success === 1) {
                    this.context.addNewList(data.id, this.listData.value);
                    event.target.reset();
                }
                else {
                    alert(data.msg);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        return (
            <form onSubmit={this.insertList}>
                <div className="form-row">
                    <div className="form-group col-sm-8 text-right">
                        <input type="text" name="listData" ref={(val) => this.listData = val} className="form-control" placeholder="Name" />
                    </div>

                    <div className="form-group col-sm-4 text-right">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-plus"></i></button>
                    </div>
                </div>
            </form>
        );
    }
}