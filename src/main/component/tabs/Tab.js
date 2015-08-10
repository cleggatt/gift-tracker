'use strict';

var React = require('react');

var Tab = React.createClass({

    propTypes: {
        selected: React.PropTypes.bool,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            selected: false
        };
    },

    render: function() {
        return (
            <li className={this.props.selected ? 'active' : ''}><a href="#" onClick={this.props.onSelect}>{this.props.children}</a></li>
        );
    }
});

module.exports = Tab;