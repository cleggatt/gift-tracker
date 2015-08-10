'use strict';

var classnames = require('classnames');
var React = require('react');

var TabContents = React.createClass({

    propTypes: {
        selected: React.PropTypes.number
    },

    render: function() {

        var index = 0;
        var wrappedChildren = React.Children.map(this.props.children, function(child) {

            // TODO Persist existing class names
            var classes = classnames({
                'nav-tabs-content': true,
                'tab-pane': true,
                'active': index++ == this.props.selected
            });

            return (
                <div className={classes}>
                    { React.cloneElement(child) }
                </div>
            );
        }, this);

        return (
            <div className="tab-content">
                {wrappedChildren}
            </div>
        );
    }
});

module.exports = TabContents;
