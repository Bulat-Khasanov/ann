const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const minmax = require('postcss-media-minmax');
const autoprefixer = require('autoprefixer-core');

function style () {
    var processors = [
        autoprefixer({ browsers: ['> 0%'] }),
        minmax()
    ];
    return gulp.src(['./current.layout/**/*.scss', '!./current.layout/layout.scss'])
            .pipe(sass())
            .pipe(postcss(processors))
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
    return gulp.src('./bundles/index/index.html')
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
    style();
    pugTrans();
    gulp.watch(['./current.blocks/**/*.scss', './current.layout/**/*.scss'], style);
    gulp.watch(['./current.layout/**/*.pug', './current.blocks/**/**/**/*.pug'], pugTrans);
    gulp.watch('./bundles/index/index.html').on('change', indexHtmlMove);
}

exports.watch = watch;