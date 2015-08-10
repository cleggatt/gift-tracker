'use strict';

var React = require('react');

var TabbedPanel = React.createClass({

    propTypes: {
        selected: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            selected: 0
        };
    },

    getInitialState: function() {
        return { selected: this.props.selected };
    },

    _onTabSelectedSelect: function(index) {
        this.setState({ selected: index });
    },

    render: function() {

        var newChildren = React.Children.map(this.props.children, function(child) {

            var extraProps = { selected: this.state.selected };
            if (child.type.displayName == 'Tabs') {
                extraProps.onSelect = this._onTabSelectedSelect
            }

            return React.cloneElement(child, extraProps);
        }, this);

        return (
            <div>
                {newChildren}
            </div>
        );
    }
});

module.exports = TabbedPanel;