'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constant/AppConstants');
var UserConstants = require('../constant/UserConstants');
var assign = require('object-assign');
var Parse = require('parse').Parse;

var CHANGE_EVENT = 'change';

var _name = null;

function initialise() {
    var currentUser = Parse.User.current();
    if (currentUser) {
        _name = currentUser.getUsername();
    }
}

function updateUser(name) {
    _name = name;
}

function clear() {
    _name = null;
}

var UserStore = assign({}, EventEmitter.prototype, {

    getName: function() {
        return _name;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {

        var action = payload.action;
        var name;

        switch(action.actionType) {
            case AppConstants.INITIALISED:
                initialise();
                UserStore.emitChange();
                break;
            case UserConstants.LOGGED_IN:
                name = action.name.trim();
                updateUser(name);
                UserStore.emitChange();
                break;
            case UserConstants.LOGGED_OUT:
                clear();
                UserStore.emitChange();
                break;
        }

        return true;
    })
});

module.exports = UserStore;