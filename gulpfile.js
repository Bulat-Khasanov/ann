const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const pug = require('gulp-pug')

function style () {
    return gulp.src('./current.layout/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./bundles'))
            .pipe(browserSync.stream())
}

function pugTrans () {
    return gulp.src(['./current.layout/**/*.pug', '!./current.layout/layout.pug'])
            .pipe(pug({
                pretty: true,
            }))
            .pipe(gulp.dest('./bundles'))
            .pipe(browserSync.stream())
}

function indexHtmlMove() {
    return gulp.src('./html/index/index.html')
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
    gulp.watch('./current.layout/**/*.scss', style);
    gulp.watch(['./current.layout/**/*.pug', './current.blocks/**/**/**/*.pug'], pugTrans);
    gulp.watch('./html/index/index.html').on('change', indexHtmlMove);
}

exports.style = style;
exports.watch = watch;