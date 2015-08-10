jest.dontMock('object-assign');
jest.dontMock('../../main/action/UserActions');
jest.dontMock('../../main/constant/UserConstants');

describe('create', function() {
    it('calls signUp with the provided parameters', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');

        // act
        UserActions.create("hal", "me@example.com", "s3cr3t");

        // assert
        var User = require('parse').Parse.User;

        expect(User.signUp).toBeCalledWith("hal", "s3cr3t", { email : "me@example.com" }, jasmine.any(Object));
    });

    it('dispatches UserConstants.LOGGED_IN on success', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');
        UserActions.create("hal", "me@example.com", "s3cr3t");

        var User = require('parse').Parse.User;
        var callbacks = User.signUp.mock.calls[0 /* 1st call */][3 /* options */];

        // act
        callbacks.success({
            getUsername : function() { return 'sal'; },
            getEmail : function() { return 'you@example.com'; }
        });

        // assert
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        var UserConstants = require('../../main/constant/UserConstants');

        expect(AppDispatcher.handleServerAction).toBeCalledWith({
            actionType: UserConstants.LOGGED_IN,
            name : 'sal',
            email : 'you@example.com'
        });
    });
});

describe('login', function() {
    it('calls logIn with the provided parameters', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');

        // act
        UserActions.login("hal", "s3cr3t");

        // assert
        var User = require('parse').Parse.User;

        expect(User.logIn).toBeCalledWith("hal", "s3cr3t", jasmine.any(Object));
    });

    it('dispatches UserConstants.LOGGED_IN on success', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');
        UserActions.login("hal", "s3cr3t");

        var User = require('parse').Parse.User;
        var callbacks = User.logIn.mock.calls[0 /* 1st call */][2 /* options */];

        // act
        callbacks.success({
            getUsername : function() { return 'sal'; },
            getEmail : function() { return 'you@example.com'; }
        });

        // assert
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        var UserConstants = require('../../main/constant/UserConstants');

        expect(AppDispatcher.handleServerAction).toBeCalledWith({
            actionType: UserConstants.LOGGED_IN,
            name : 'sal',
            email : 'you@example.com'
        });
    });
});

describe('logout', function() {
    it('calls logOut', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');

        // act
        UserActions.logout();

        // assert
        var User = require('parse').Parse.User;

        expect(User.logOut).toBeCalled();
    });

    it('dispatches UserConstants.LOGGED_OUT', function() {
        // arrange
        var UserActions = require('../../main/action/UserActions');

        // act
        UserActions.logout();

        // assert
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        var UserConstants = require('../../main/constant/UserConstants');

        expect(AppDispatcher.handleViewAction).toBeCalledWith({
            actionType: UserConstants.LOGGED_OUT
        });
    });
});