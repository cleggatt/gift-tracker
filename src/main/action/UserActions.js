'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constant/UserConstants');
var Parse = require('parse').Parse;

var UserActions = {

    create: function(userName, email, password) {

        Parse.User.signUp(userName, password, { "email" : email }, {
            success: function(user) {
                AppDispatcher.handleServerAction({
                    actionType: UserConstants.LOGGED_IN,
                    name: user.getUsername(),
                    email: user.getEmail()
                });
            },
            error: function(errUser, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
                if (error.code == 209) {
                    Parse.User.logOut();
                }
            }
        });
    },

    login: function(userName, password) {

        Parse.User.logIn(userName, password, {
            success: function(user) {
                AppDispatcher.handleServerAction({
                    actionType: UserConstants.LOGGED_IN,
                    name: user.getUsername(),
                    email:  user.getEmail()
                });
            },
            error: function(errUser, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
                if (error.code == 209) {
                    Parse.User.logOut();
                }
            }
        });
    },

    logout: function() {

        Parse.User.logOut();

        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_OUT
        });
    }
};

module.exports = UserActions;