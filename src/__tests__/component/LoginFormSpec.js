jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../main/component/LoginForm');

describe('a LoginForm', function() {

    it('should invoke a log in action when clicked', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var LoginForm = require('../../main/component/LoginForm');
        var rendered = TestUtils.renderIntoDocument(<LoginForm/>);

        // act
        React.findDOMNode(rendered.refs.userName).value = 'hal';
        React.findDOMNode(rendered.refs.password).value = 'p4ssw0rd';

        var button = TestUtils.findRenderedDOMComponentWithClass(rendered, 'btn-success');
        React.addons.TestUtils.Simulate.click(button);

        // assert
        var UserActions = require('../../main/action/UserActions');
        expect(UserActions.login).toBeCalledWith('hal', 'p4ssw0rd');
    });

    it('should not render if there is a user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var LoginForm = require('../../main/component/LoginForm');

        // act
        var rendered = TestUtils.renderIntoDocument(<LoginForm/>);

        // assert
        var domNode = React.findDOMNode(rendered);
        expect(domNode).toBeNull();
    });

    it('should react to a change in the user state', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var LoginForm = require('../../main/component/LoginForm');
        var rendered = TestUtils.renderIntoDocument(<LoginForm/>);

        var callback = UserStore.addChangeListener.mock.calls[0 /* 1st call */][0 /* callback*/];

        // act
        UserStore.getName.mockReturnValue('hal');
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

        var LoginForm = require('../../main/component/LoginForm');
        var rendered = TestUtils.renderIntoDocument(<LoginForm/>);

        expect(UserStore.removeChangeListener).not.toBeCalled();

        // act
        rendered.componentWillUnmount();

        // assert
        expect(UserStore.removeChangeListener).toBeCalled();
    });
});