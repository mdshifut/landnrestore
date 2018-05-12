var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();


// Delete dist folder
gulp.task('deleteDistFolder', function() {
    return del('./dist');
});

// Copy Genarel files
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./dist"));
});


// Optimize Images
gulp.task('optimizeImage', ['deleteDistFolder'], function() {
    return gulp.src('./app/assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./dist/assets/images'));

});






// Revisioning scripts or stylesheets  by appending content hash to filenames
// and Replaces references to non-optimized scripts or stylesheets into a set of HTML files
// and minify scripts or stylesheets
gulp.task('usemin', ['deleteDistFolder', 'sass', 'scripts'], function() {
    return gulp.src('./app/*.html')
        .pipe(usemin({
            css: [function() {
                return rev()
            }, function() {
                return cssnano();
            }],
            js: [function() {
                    return rev();
                },
                function() {
                    return uglify();
                }
            ]
        }))
        .pipe(gulp.dest("./dist"));
});
// Copy  styles file to production folder
gulp.task('copyCompStyles', ['usemin'], function() {

    return gulp.src("./app/temp/styles/styles.css")
        .pipe(gulp.dest("./dist/assets/styles"));
});

// Copy  scripts file to production folder
gulp.task('copyCompScripts', ['usemin'], function() {

    return gulp.src("./app/temp/scripts/*.js")
        .pipe(gulp.dest("./dist/assets/scripts"));
});


// Build production files, 
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles',
    'optimizeImage', 'usemin', 'copyCompStyles', 'copyCompScripts'
]);

// Preview production file
gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "dist"
        }
    });
});