'use strict';

var React = require('react');
var UserStore = require('../store/UserStore');
var UserActions = require('../action/UserActions');

function getUserState() {
    return {
        loggedIn: UserStore.getName() != null
    }
};

var Login = React.createClass({

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
                    <label htmlFor="inputUserName">User name</label>
                    <input ref="userName" className="form-control" id="inputUserName" placeholder="User name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input ref="password" type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                </div>
                <button type='button' className="btn btn-success" onClick={this._onCreateClick}>Log me in!</button>
            </form>
        );
    },

    _onChange: function() {
        this.setState(getUserState());
    },

    _onCreateClick: function() {
        // TODO Support login by username OR email address
        var userName = React.findDOMNode(this.refs.userName).value;
        var password = React.findDOMNode(this.refs.password).value;

        UserActions.login(userName, password);
    }
});

module.exports = Login;