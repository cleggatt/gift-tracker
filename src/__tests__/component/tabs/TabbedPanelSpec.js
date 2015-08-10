jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../../main/component/tabs/TabbedPanel');

describe('a Tab contents component', function() {

    var getOnSelectedCallBack = function(rendered) {

        var React = require('react/addons');

        var callback = null;
        React.Children.forEach(rendered.props.children, function(child) {
            if (child.props.onSelect) {
                callback = child.props.onSelect;
            }
        });

        return callback;
    };

    it('should wrap children', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var TabbedPanel = require('../../../main/component/tabs/TabbedPanel');
        var Tabs = require('../../../main/component/tabs/Tabs');
        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        shallowRenderer.render(
            <TabbedPanel>
                <Tabs/>
                <TabContents/>
            </TabbedPanel>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        var children = [];
        React.Children.forEach(rendered.props.children, function(child) {
            children.push(child.type.displayName);
        });

        expect(children.length).toBe(2);
        expect(children).toContain('Tabs');
        expect(children).toContain('TabContents');
    });

    it('sets the selected item', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var TabbedPanel = require('../../../main/component/tabs/TabbedPanel');
        var Tabs = require('../../../main/component/tabs/Tabs');
        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        shallowRenderer.render(
            <TabbedPanel selected={2}>
                <Tabs/>
                <TabContents/>
            </TabbedPanel>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        React.Children.forEach(rendered.props.children, function(child) {
            expect(child.props.selected).toBe(2);
        });
    });

    it('selects the first item by default', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var TabbedPanel = require('../../../main/component/tabs/TabbedPanel');
        var Tabs = require('../../../main/component/tabs/Tabs');
        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        shallowRenderer.render(
            <TabbedPanel>
                <Tabs/>
                <TabContents/>
            </TabbedPanel>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        React.Children.forEach(rendered.props.children, function(child) {
            expect(child.props.selected).toBe(0);
        });
    });

    it('onSelect callback sets selected item', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var TabbedPanel = require('../../../main/component/tabs/TabbedPanel');
        var Tabs = require('../../../main/component/tabs/Tabs');
        var TabContents = require('../../../main/component/tabs/TabContents');

        shallowRenderer.render(
            <TabbedPanel selected={1}>
                <Tabs/>
                <TabContents/>
            </TabbedPanel>
        );

        var rendered = shallowRenderer.getRenderOutput();
        var callback = getOnSelectedCallBack(rendered);

        // act
        callback(3);

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        React.Children.forEach(rendered.props.children, function(child) {
            expect(child.props.selected).toBe(3);
        });
    });

    it('only sets onSelect callback for Tabs', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var TabbedPanel = require('../../../main/component/tabs/TabbedPanel');
        var Tabs = require('../../../main/component/tabs/Tabs');
        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        shallowRenderer.render(
            <TabbedPanel selected={1}>
                <Tabs/>
                <TabContents/>
            </TabbedPanel>
        );

        // assert
        var rendered = shallowRenderer.getRenderOutput();

        React.Children.forEach(rendered.props.children, function(child) {
            if (child.type.displayName == 'Tabs') {
                expect(child.props.onSelect).toBeDefined();
            } else {
                expect(child.props.onSelect).toBeUndefined();
            }
        });
    });
});