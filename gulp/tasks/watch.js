'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');


// Watch files for changes & reload
gulp.task('watch', ['sass', 'scripts', 'copyFontsTemp', 'copyImagesTemp'], function() {
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

    gulp.watch(['app/assets/fonts/**/*'], function() {
        gulp.start('copyFontsTemp');
    });

    gulp.watch(['app/assets/images/**/*'], function() {
        gulp.start('copyImagesTemp');
    });

});

gulp.task('copyFontsTemp', function() {
    return gulp.src('./app/assets/fonts/**')
        .pipe(gulp.dest('./app/temp/fonts/'));
});

gulp.task('copyImagesTemp', function() {
    return gulp.src('./app/assets/images/**')
        .pipe(gulp.dest('./app/temp/images/'));
});

gulp.task('cssInject', ['sass'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});


gulp.task("scriptsRefresh", ["scripts"], function() {
    browserSync.reload();
});