import React, { Component } from 'react';
import ListData from './components/ListData';
import AddList from './components/AddList';
import './index.css';
import { Provider } from './components/Context';
class App extends Component {
    state = {
        post_found: true,
        new_list: false
    }
    addNewList = (id, list_data) => {
        if (this.state.post_found) {
            this.setState({
                new_list: { id: id, name: list_data }
            });
        }
        else {
            this.setState({
                post_found: true
            });
        }
    }

    postShow = (show) => {
        this.setState({
            post_found: show
        })
    }

    render() {
        const contextValue = {
            new_list: this.state.new_list,
            addNewList: this.addNewList,
            post_show: this.postShow
        }

        let showUsers;
        if (this.state.post_found) {
            showUsers = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="2"><AddList /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListData />
                    </tbody>
                </table>
            );
        }
        else {
            showUsers = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">No User Found!</h4>
                    <hr />
                    <p>Please Insert Some Users.</p>
                </div>
            );
        }
        return (
            <Provider value={contextValue}>
                <div className="card shadow-sm  list_style">
                    <div className="card-body">
                        <div className="row">
                            {showUsers}
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}
export default App;