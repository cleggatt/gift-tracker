// For Jest
require('harmonize')();

var gulp = require('gulp');
var gutil = require("gulp-util");

var del = require('del');
var jest = require('gulp-jest');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config.js");

gulp.task('default', ['webpack'], function () {
});

gulp.task('clean', function (callback) {
    del(['build/'], callback);
});

gulp.task('test', function () {
    return gulp.src("src/__tests__").pipe(jest({
        rootDir: "src",
        scriptPreprocessor: "preprocessor.js"
    }));
});

gulp.task('test-cover', function (callback) {
    return gulp.src("src/__tests__").pipe(jest({
        collectCoverage: true,
        rootDir: "src",
        "scriptPreprocessor": "preprocessor.js",
        // Due to a bug, we need to list each component - see https://github.com/facebook/jest/issues/433
        "collectCoverageOnlyFrom": {
            "main/action/AppActions.js": true,
            "main/action/UserActions.js": true,
            "main/component/LoginForm.js": true,
            "main/component/ObtainUser.js": true,
            "main/component/Profile.js": true,
            "main/component/SignUpForm.js": true,
            "main/component/TrackerApp.js": true,
            "main/component/tabs/Tab.js": true,
            "main/component/tabs/TabbedPanel.js": true,
            "main/component/tabs/TabContents.js": true,
            "main/component/tabs/Tabs.js": true,
            "main/config/keys.js": true,
            "main/constants/AppConstants.js": true,
            "main/constants/UserConstants.js": true,
            "main/dispatcher/AppDispatcher.js": true,
            "main/store/UserStore.js": true,
            "main/app.js": true
        }
    }));
});

gulp.task("webpack", ['clean', 'test-cover'], function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: "app/"
    }).listen(8080, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        });
});