jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../../main/component/tabs/Tab');

describe('a Tab component', function() {

    it('should use the active class when selected', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tab = require('../../../main/component/tabs/Tab');

        // act
        var rendered = TestUtils.renderIntoDocument(<Tab selected={true}/>);

        // assert
        var children = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'active');
        expect(children.length).toBe(1);
    });

    it('should not use the active class when not selected', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tab = require('../../../main/component/tabs/Tab');

        // act
        var rendered = TestUtils.renderIntoDocument(<Tab selected={false}/>);

        // assert
        var children = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'active');
        expect(children.length).toBe(0);
    });

    it('should not use the active class as a default', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tab = require('../../../main/component/tabs/Tab');

        // act
        var rendered = TestUtils.renderIntoDocument(<Tab/>);

        // assert
        var children = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'active');
        expect(children.length).toBe(0);
    });

    it('should assign onSelect callback', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tab = require('../../../main/component/tabs/Tab');

        var clickCount = 0;
        var callback = function() {
            clickCount++;
        };

        // act
        var rendered = TestUtils.renderIntoDocument(<Tab onSelect={callback}/>);

        // assert
        var link = TestUtils.findRenderedDOMComponentWithTag(rendered, 'a');
        React.addons.TestUtils.Simulate.click(link);

        expect(clickCount).toBe(1);
    });

    it('should render children', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var Tab = require('../../../main/component/tabs/Tab');

        // act
        var rendered = TestUtils.renderIntoDocument(<Tab><div className='target'>One</div><div className='target'>Two</div></Tab>);

        // assert
        var children = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'target');
        expect(children.length).toBe(2);
        expect(children[0].getDOMNode().textContent).toEqual('One');
        expect(children[1].getDOMNode().textContent).toEqual('Two');
    });
});