jest.dontMock('object-assign');
jest.dontMock('../../main/action/AppActions');
jest.dontMock('../../main/constant/AppConstants');

describe('initialised', function() {
    it('dispatches AppConstants.INITIALISED', function() {
        // arrange
        var AppActions = require('../../main/action/AppActions');

        // act
        AppActions.initialised();

        // assert
        var AppDispatcher = require('../../main/dispatcher/AppDispatcher');
        var AppConstants = require('../../main/constant/AppConstants');

        expect(AppDispatcher.handleServerAction).toBeCalledWith({ actionType: AppConstants.INITIALISED });
    });
});

