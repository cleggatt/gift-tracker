'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constant/AppConstants');

var AppActions = {

    initialised: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.INITIALISED
        });
    }
};

module.exports = AppActions;