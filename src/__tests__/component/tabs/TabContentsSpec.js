jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../../main/component/tabs/TabContents');

describe('a Tab contents component', function() {

    it('should have the have the correct class', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        var rendered = TestUtils.renderIntoDocument(
            <TabContents>
                <div/>
            </TabContents>
        );

        // assert
        var domNode = React.findDOMNode(rendered);
        expect(domNode.className).toContain('tab-content');
    });

    it('should wrap children', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        var rendered = TestUtils.renderIntoDocument(
            <TabContents>
                <div>One</div>
                <div>Two</div>
            </TabContents>
        );

        // assert
        var domNode = React.findDOMNode(rendered);

        var childOneWrapper = domNode.childNodes[0];
        expect(childOneWrapper.childNodes[0].textContent).toEqual('One');

        var childTwoWrapper = domNode.childNodes[1];
        expect(childTwoWrapper.childNodes[0].textContent).toEqual('Two');
    });

    it('should have the correct classes on child wrappers', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        var rendered = TestUtils.renderIntoDocument(
            <TabContents>
                <div>One</div>
            </TabContents>
        );

        // assert
        var domNode = React.findDOMNode(rendered);

        var childWrapper = domNode.childNodes[0];
        expect(childWrapper.className).toContain('nav-tabs-content');
        expect(childWrapper.className).toContain('tab-pane');
    });

    it('should set the active class on the selected child', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var TabContents = require('../../../main/component/tabs/TabContents');

        // act
        var rendered = TestUtils.renderIntoDocument(
            <TabContents selected={1}>
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
            </TabContents>
        );

        // assert
        var domNode = React.findDOMNode(rendered);

        var childOneWrapper = domNode.childNodes[0];
        expect(childOneWrapper.className).not.toContain('active');

        var childTwoWrapper = domNode.childNodes[1];
        expect(childTwoWrapper.className).toContain('active');

        var childThreeWrapper = domNode.childNodes[2];
        expect(childThreeWrapper.className).not.toContain('active');
    });
});