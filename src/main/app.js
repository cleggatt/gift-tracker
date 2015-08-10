'use strict';

require("!style!css!../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("!style!css!./css/main.css");

var keys = require('./config/keys');

var Parse = require('parse').Parse;
var AppActions = require('./action/AppActions');
var React = require('react');
var TrackerApp = require('./component/TrackerApp');

Parse.initialize(keys.app_id, keys.js);

AppActions.initialised();

React.render(<TrackerApp/>, document.getElementById('login'));