'use strict';

var React = require('react');
var LoginForm = require('./LoginForm');
var SignUpForm = require('./SignUpForm');
var Tab = require('./tabs/Tab');
var TabContents = require('./tabs/TabContents');
var TabbedPanel = require('./tabs/TabbedPanel');
var Tabs = require('./tabs/Tabs');

var ObtainUser = React.createClass({

    render: function() {

        return (
            <TabbedPanel selected={0}>
                <Tabs>
                    <Tab>I have an account</Tab>
                    <Tab>I don't have an account</Tab>
                </Tabs>
                <TabContents>
                    <LoginForm/>
                    <SignUpForm/>
                </TabContents>
            </TabbedPanel>
        );
    }
});

module.exports = ObtainUser;