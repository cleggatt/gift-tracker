'use strict';

var React = require('react');

var Tabs = React.createClass({

    propTypes: {
        selected: React.PropTypes.number,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            selected: 0
        };
    },

    _onSelect: function(index) {
        this.props.onSelect(index);
    },

    render: function() {

        var index = 0;
        var newChildren = React.Children.map(this.props.children, function(child) {

            var props = {
                onSelect: this._onSelect.bind(this, index),
                selected: index++ == this.props.selected
            };

            return React.cloneElement(child, props);
        }, this);

        return (
            <ul className="nav nav-tabs">
                {newChildren}
            </ul>
        );
    }
});

module.exports = Tabs;
