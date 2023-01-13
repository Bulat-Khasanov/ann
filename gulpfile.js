const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const { reload } = require('browser-sync');

function style () {
    return gulp.src('./scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: "firefox"
    })
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', reload);
}

exports.style = style;
exports.watch = watch;