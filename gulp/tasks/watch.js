'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');


// Watch files for changes & reload
gulp.task('watch', ['sass', 'scripts'], function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/**/*.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.scss', function() {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });



});

gulp.task('copyFonts', function() {
    return gulp.src('./app/assets/fonts/**')
        .pipe(gulp.dest('./app/temp/fonts/'));
})

gulp.task('cssInject', ['sass'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});


gulp.task("scriptsRefresh", ["scripts"], function() {
    browserSync.reload();
});