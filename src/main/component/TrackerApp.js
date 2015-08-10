'use strict';

var React = require('react');
var UserStore = require('../store/UserStore');
var Profile = require('./Profile');
var ObtainUser = require('./ObtainUser');

function getUserState() {
    return {
        loggedIn: UserStore.getName() != null
    }
}

var TrackerApp = React.createClass({

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

        var child = (this.state.loggedIn === true) ? <Profile/> : <ObtainUser/>;

        return (
            <div className="content-panel">
                {child}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getUserState());
    }
});


module.exports = TrackerApp;