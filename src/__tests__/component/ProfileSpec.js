jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../main/component/Profile');

describe('a Profile component', function() {

    it('should render a name if there is a user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var Profile = require('../../main/component/Profile');

        // act
        var rendered = TestUtils.renderIntoDocument(<Profile/>);

        // assert
        var nameSpan = TestUtils.findRenderedDOMComponentWithClass(rendered, 'profile-name');
        expect(nameSpan.getDOMNode().textContent).toEqual('Hello there hal!');
    });

    it('should invoke a log out action when clicked', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var Profile = require('../../main/component/Profile');
        var rendered = TestUtils.renderIntoDocument(<Profile/>);

        // act
        var button = TestUtils.findRenderedDOMComponentWithClass(rendered, 'btn-warning');
        React.addons.TestUtils.Simulate.click(button);

        // assert
        var UserActions = require('../../main/action/UserActions');
        expect(UserActions.logout).toBeCalled();
    });

    it('should not render if there is no user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var Profile = require('../../main/component/Profile');

        // act
        var rendered = TestUtils.renderIntoDocument(<Profile/>);

        // assert
        var domNode = React.findDOMNode(rendered);
        expect(domNode).toBeNull()
    });

    it('should react to a change in the user state', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var Profile = require('../../main/component/Profile');
        var rendered = TestUtils.renderIntoDocument(<Profile/>);

        var callback = UserStore.addChangeListener.mock.calls[0 /* 1st call */][0 /* callback*/];

        // act
        UserStore.getName.mockReturnValue(null);
        callback();

        // assert
        var domNode = React.findDOMNode(rendered);
        expect(domNode).toBeNull();
    });

    it('should unregister as a UserStore changeListener when unmounted', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');

        var Profile = require('../../main/component/Profile');
        var rendered = TestUtils.renderIntoDocument(<Profile/>);

        expect(UserStore.removeChangeListener).not.toBeCalled();

        // act
        rendered.componentWillUnmount();

        // assert
        expect(UserStore.removeChangeListener).toBeCalled();
    });
});