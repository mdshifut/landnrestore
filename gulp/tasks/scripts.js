var gulp = require("gulp"),
    webpack = require("webpack");



// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
gulp.task('scripts', function(callback) {
    webpack(require("../../webpack.config.js"), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});