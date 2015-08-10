'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

    // TODO Not sure we need these to variants at this stage
    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    },

    handleServerAction: function(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    }

});

module.exports = AppDispatcher;