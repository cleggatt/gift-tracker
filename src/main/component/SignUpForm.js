'use strict';

var React = require('react');
var UserStore = require('../store/UserStore');
var UserActions = require('../action/UserActions');

function getUserState() {
    return {
        loggedIn: UserStore.getName() != null
    }
};

var SignUp = React.createClass({

    getInitialState: function() {
        return getUserState();
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    // TODO Stop assuming that this component is unique when selecting ids.
    render: function() {

        if (this.state.loggedIn !== false) {
            return false;
        }

        return (
            <form>
                <div className="form-group">
                    <label htmlFor="inputUser">User name</label>
                    <input ref="userName" type="text" className="form-control" id="inputUser" placeholder="User name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input ref="email" type="email" className="form-control" id="inputEmail" placeholder="Email address"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input ref="password" type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                </div>
                <button type='button' className="btn btn-success" onClick={this._onCreateClick}>Create my account!</button>
            </form>
        );
    },

    _onChange: function() {
        this.setState(getUserState());
    },

    _onCreateClick: function() {
        var userName = React.findDOMNode(this.refs.userName).value;
        var email = React.findDOMNode(this.refs.email).value;
        var password = React.findDOMNode(this.refs.password).value;

        UserActions.create(userName, email, password);
    }
});

module.exports = SignUp;