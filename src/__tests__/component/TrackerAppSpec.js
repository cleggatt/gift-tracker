jest.dontMock('object-assign');
jest.dontMock('react');
jest.dontMock('../../main/component/TrackerApp');
jest.dontMock('../../main/component/Profile');

describe('a TrackerApp', function() {

    it('should render an obtain user component there is a user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var TrackerApp = require('../../main/component/TrackerApp');

        // act
        shallowRenderer.render(<TrackerApp/>);

        // assert
        var ObtainUser = require('../../main/component/ObtainUser');

        var rendered = shallowRenderer.getRenderOutput();
        expect(rendered.type).toBe('div');
        expect(rendered.props.children).toEqual(<ObtainUser/>);
    });

    it('should render a profile component there is no user', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var shallowRenderer = TestUtils.createRenderer();

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue('hal');

        var TrackerApp = require('../../main/component/TrackerApp');

        // act
        shallowRenderer.render(<TrackerApp/>);

        // assert
        var Profile = require('../../main/component/Profile');

        var rendered = shallowRenderer.getRenderOutput();
        expect(rendered.type).toBe('div');
        expect(rendered.props.children).toEqual(<Profile/>);
    });

    // Note: componentDidMount() does not appear to be called when using shallow rendering
    // This also means that we need to render the *real* profile (hence the jest.dontMock) so we know what
    // child was chosen
    it('should react to a change in the user state', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');
        UserStore.getName.mockReturnValue(null);

        var TrackerApp = require('../../main/component/TrackerApp');
        var rendered = TestUtils.renderIntoDocument(<TrackerApp/>);

        var callback = UserStore.addChangeListener.mock.calls[0 /* 1st call */][0 /* callback*/];

        // act
        UserStore.getName.mockReturnValue('hal');
        callback();

        // assert
        var nameSpan = TestUtils.findRenderedDOMComponentWithClass(rendered, 'profile-name');
        expect(nameSpan.getDOMNode()).not.toBeNull();
    });

    it('should unregister as a UserStore changeListener when unmounted', function() {
        // arrange
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var UserStore = require('../../main/store/UserStore');

        var TrackerApp = require('../../main/component/TrackerApp');
        var rendered = TestUtils.renderIntoDocument(<TrackerApp/>);

        expect(UserStore.removeChangeListener).not.toBeCalled();

        // act
        rendered.componentWillUnmount();

        // assert
        expect(UserStore.removeChangeListener).toBeCalled();
    });
});