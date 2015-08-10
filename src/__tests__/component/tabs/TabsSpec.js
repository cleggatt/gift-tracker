jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../../main/component/tabs/Tabs');

describe('a Tab list', function() {

    it('should have the have the correct class', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tabs = require('../../../main/component/tabs/Tabs');

        // act
        var rendered = TestUtils.renderIntoDocument(
            <Tabs/>
        );

        // assert
        var domNode = React.findDOMNode(rendered);
        expect(domNode.className).toContain('nav');
        expect(domNode.className).toContain('nav-tabs');
    });

    it('should wrap children', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var Tabs = require('../../../main/component/tabs/Tabs');
        var Tab = require('../../../main/component/tabs/Tab');

        // act
        shallowRenderer.render(
            <Tabs>
                <Tab marker="one"/>
                <Tab marker="two"/>
            </Tabs>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        var children = [];
        React.Children.forEach(rendered.props.children, function(child) {
            children.push(child.props.marker);
        });

        expect(children.length).toBe(2);
        expect(children).toContain('one');
        expect(children).toContain('two');
    });

    it('sets the selected tab', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var Tabs = require('../../../main/component/tabs/Tabs');
        var Tab = require('../../../main/component/tabs/Tab');

        // act
        shallowRenderer.render(
            <Tabs selected={1}>
                <Tab marker="one"/>
                <Tab marker="two"/>
            </Tabs>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        var selectedIndexs = [];
        React.Children.forEach(rendered.props.children, function(child) {
            if (child.props.selected) {
                selectedIndexs.push(child.props.marker)
            }
        });

        expect(selectedIndexs.length).toBe(1);
        expect(selectedIndexs).toContain('two');
    });

    it('sets the first tab as selected by default', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var Tabs = require('../../../main/component/tabs/Tabs');
        var Tab = require('../../../main/component/tabs/Tab');

        // act
        shallowRenderer.render(
            <Tabs>
                <Tab marker="one"/>
                <Tab marker="two"/>
            </Tabs>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        var selectedIndexs = [];
        React.Children.forEach(rendered.props.children, function(child) {
            if (child.props.selected) {
                selectedIndexs.push(child.props.marker)
            }
        });

        expect(selectedIndexs.length).toBe(1);
        expect(selectedIndexs).toContain('one');
    });

    it('onSelect callback is set on tabs with correct index', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var Tabs = require('../../../main/component/tabs/Tabs');
        var Tab = require('../../../main/component/tabs/Tab');

        var selectedIndex;
        var onSelect = function(index) {
            selectedIndex = index;
        };

        shallowRenderer.render(
            <Tabs onSelect={onSelect}>
                <Tab index={0}/>
                <Tab index={1}/>
            </Tabs>
        );
        var rendered = shallowRenderer.getRenderOutput();

        React.Children.forEach(rendered.props.children, function(child) {
            // act
            child.props.onSelect();

            // assert
            expect(selectedIndex).toBe(child.props.index);
        });
    });
});