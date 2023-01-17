const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const pug = require('gulp-pug')

function style () {
    return gulp.src('./scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
}

function pugTrans () {
    return gulp.src('./pug/**/*.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('./html'))
            .pipe(browserSync.stream())
}

function indexPugTrans () {
    return gulp.src('./pug/index.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('./'))
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
    gulp.watch(['./pug/**/*.pug', '!./pug/index.pug'], pugTrans);
    gulp.watch('./pug/index.pug', indexPugTrans);
}

exports.style = style;
exports.watch = watch;