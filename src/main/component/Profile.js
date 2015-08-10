'use strict';

var React = require('react');
var UserStore = require('../store/UserStore');
var UserActions = require('../action/UserActions');

function getUserState() {
    return {
        userName: UserStore.getName(),
        loggedIn: UserStore.getName() != null
    };
};

var Profile = React.createClass({

    getInitialState: function() {
        return getUserState();
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    render: function() {

        if (this.state.loggedIn === false) {
            return false;
        }

        return  (
            <div>
                <span className="profile-name">Hello there {this.state.userName}!</span>&nbsp;
                <button type='button' className="btn btn-warning btn-xs" onClick={this._onLogoutClick}>Log me out</button>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getUserState());
    },

    _onLogoutClick: function() {
        UserActions.logout();
    }
});

module.exports = Profile;