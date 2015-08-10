jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../main/component/SignUpForm');

describe('a SignUpForm', function() {

    it('should invoke a create action when clicked', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var SignUpForm = require('../../main/component/SignUpForm');
        var rendered = TestUtils.renderIntoDocument(<SignUpForm/>);

        // act
        React.findDOMNode(rendered.refs.userName).value = 'sal';
        React.findDOMNode(rendered.refs.email).value = 'you@example.com';
        React.findDOMNode(rendered.refs.password).value = 'r4nd0m';

        var button = TestUtils.findRenderedDOMComponentWithClass(rendered, 'btn-success');
        React.addons.TestUtils.Simulate.click(button);

        // assert
        var UserActions = require('../../main/action/UserActions');
        expect(UserActions.create).toBeCalledWith('sal', 'you@example.com', 'r4nd0m');
    });

    it('should not render if there is a user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var SignUpForm = require('../../main/component/SignUpForm');

        // act
        var rendered = TestUtils.renderIntoDocument(<SignUpForm/>);

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

        var SignUpForm = require('../../main/component/SignUpForm');
        var rendered = TestUtils.renderIntoDocument(<SignUpForm/>);

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

        var SignUpForm = require('../../main/component/SignUpForm');
        var rendered = TestUtils.renderIntoDocument(<SignUpForm/>);

        expect(UserStore.removeChangeListener).not.toBeCalled();

        // act
        rendered.componentWillUnmount();

        // assert
        expect(UserStore.removeChangeListener).toBeCalled();
    });
});