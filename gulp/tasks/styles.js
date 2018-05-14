var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');


// Compile and automatically prefix stylesheets and rename main.css to style.css
gulp.task('sass', function() {
    return gulp.src('./app/assets/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/temp/styles/'));
});