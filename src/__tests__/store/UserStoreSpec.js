jest.dontMock('object-assign');
jest.dontMock('../../main/store/UserStore');
jest.dontMock('../../main/constant/AppConstants');
jest.dontMock('../../main/constant/UserConstants');
jest.dontMock('../../main/dispatcher/AppDispatcher');

describe('UserStore responding to AppConstants.INITIALISED', function() {

    var AppConstants = require('../../main/constant/AppConstants');

    it('set the current user', function() {
        // arrange
        var User = require('parse').Parse.User;
        User.current.mockReturnValue({
            getUsername : function() { return 'hal'; }
        });

        var UserStore = require('../../main/store/UserStore');

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INITIALISED
        });

        // assert
        expect(UserStore.getName()).toBe('hal');
    });
    it('invokes change listeners', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        var changeCount = 0;
        UserStore.addChangeListener(function() {
            changeCount++;
        });

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INITIALISED
        });

        // assert
        expect(changeCount).toBe(1);

        // annihilate
        UserStore.removeAllListeners();
    });
    it('handles no current user', function() {
        // arrange
        var User = require('parse').Parse.User;
        User.current.mockReturnValue(null);

        var UserStore = require('../../main/store/UserStore');

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INITIALISED
        });

        // assert
        expect(UserStore.getName()).toBeNull();
    });
});

describe('UserStore responding to UserConstants.LOGGED_IN', function() {

    var UserConstants = require('../../main/constant/UserConstants');

    it('sets the current user name', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_IN,
            name: 'sal',
            email: 'you@example.com'
        });

        // assert
        expect(UserStore.getName()).toBe('sal');
    });
    it('invokes change listeners', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        var changeCount = 0;
        UserStore.addChangeListener(function() {
            changeCount++;
        });

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_IN,
            name: 'sal',
            email: 'you@example.com'
        });

        // assert
        expect(changeCount).toBe(1);

        // annihilate
        UserStore.removeAllListeners();
    });
    it('trims the current user name', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_IN,
            name: '  sal  ',
            email: 'you@example.com'
        });

        // assert
        expect(UserStore.getName()).toBe('sal');
    });
});

describe('UserStore responding to UserConstants.LOGGED_OUT', function() {

    var UserConstants = require('../../main/constant/UserConstants');

    it('clears the current user name', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_IN,
            name: 'sal',
            email: 'you@example.com'
        });

        // act
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_OUT
        });

        // assert
        expect(UserStore.getName()).toBeNull();
    });

    it('invokes change listeners', function() {
        // arrange
        var UserStore = require('../../main/store/UserStore');

        var changeCount = 0;
        UserStore.addChangeListener(function() {
            changeCount++;
        });

        // act
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGGED_OUT
        });

        // assert
        expect(changeCount).toBe(1);

        // annihilate
        UserStore.removeAllListeners();
    });
});