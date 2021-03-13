import React, { Component } from 'react';
import Axios from 'axios';
import { AppContext } from './Context';

class ListData extends Component {
    static contextType = AppContext;
    state = {
        all_data: []
    }

    fetchData = () => {
        fetch('http://localhost/RESTPHP/allTasks')
            .then(response => {
                response.json().then(function (data) {
                    if (data.success === 1) {
                        console.log(data.ListData.reverse())
                        this.setState({
                            all_data: data.ListData.reverse()
                        });
                    }
                    else {
                        this.context.post_show(false);
                    }
                }.bind(this));
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    handleUpdate = (id) => {
        Axios.post('http://localhost/RESTPHP/updateTask',
            {
                id: id,
                list_data: this.name.value
            })
            .then(({ data }) => {
                if (data.success === 1) {
                    let all_data = this.state.all_data.map(data => {
                        if (data.id === id) {
                            data.name = this.name.value;
                            data.isEditing = false;
                            return data;
                        }
                        return data;
                    });
                    this.setState({
                        all_data
                    });
                }
                else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    editMode = (id) => {
        let all_data = this.state.all_data.map(data => {
            if (data.id === id) {
                data.isEditing = true;
                return data;
            }
            data.isEditing = false;
            return data;
        });

        this.setState({
            all_data
        });
    }

    cancleEdit = (id) => {
        let all_data = this.state.all_data.map(data => {
            if (data.id === id) {
                data.isEditing = false;
                return data;
            }
            return data

        });
        this.setState({
            all_data
        });
    }

    handleDelete = (id) => {
        let deleteList = this.state.all_data.filter(data => {
            return data.id !== id;
        });

        Axios.post('http://localhost/RESTPHP/deleteTask', {
            id: id
        })
            .then(({ data }) => {
                if (data.success === 1) {
                    this.setState({
                        all_data: deleteList
                    });
                }
                else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidUpdate() {
        let newList = this.context.new_list;
        if (newList) {
            this.setState({
                all_data: [
                    newList,
                    ...this.state.all_data

                ]
            });
            this.context.new_list = false;
        }
    }

    render() {

        let allList = this.state.all_data.map(({ id, name, isEditing }, index) => {
            return isEditing === true ? (
                <tr key={id}>
                    <td><input className="form-control" type="text" ref={(item) => this.name = item} defaultValue={name} />
                        <div>
                            <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}><i className="fa fa-check"></i></button>
                            <button onClick={() => this.cancleEdit(id)} className="btn btn-light"><i className="fa fa-close"></i></button>
                        </div>
                    </td>
                </tr>
            ) :
                (
                    <tr key={id}>
                        <td>{name}
                            <div>
                                <button className="btn btn-dark mr-2" onClick={() => this.editMode(id)}><i className="fa fa-pencil-square-o"></i>
                                </button>
                                <button onClick={() => this.handleDelete(id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                            </div>

                        </td>
                    </tr>
                );
        });

        return (
            <>
                {allList}
            </>
        );

    }
}

export default ListData;
