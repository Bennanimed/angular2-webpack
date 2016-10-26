'use strict';

const gulp              = require('gulp');
const gulputil          = require('gulp-util');
const autoprefixer      = require('gulp-autoprefixer');
const cleancss          = require('gulp-clean-css');
const sass              = require('gulp-sass');
const concat            = require('gulp-concat');
const webserver         = require('gulp-webserver');
const runSequence       = require('run-sequence');
const webpackStream     = require('webpack-stream');
const webpackConfig     = require('./webpack.config');
const webpackFiles      = require('./config/webpackFilesInput.js');
const named             = require('vinyl-named');
const del               = require('del');
const env               = process.env.NODE_ENV || 'development';
const server            = require('./config/' + env);

gulp.task('start', () => {
    return gulputil.log('Start server');
});

gulp.task('clean', () => {
    return del([ './build/*.js', './build/*.css', './build/*.map', './app/css/tobuild/*.css' ]);
});

gulp.task('sass', () => {
    return gulp.src('./app/sass/*.scss')
        .pipe(sass({ outputStyle : 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./app/css/tobuild/'));
});

gulp.task('concat-css', () => {
    return gulp.src('./app/css/tobuild/*.css')
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('autoprefixer', () => {
    gulp.src('./build/*.css')
        .pipe(autoprefixer({
            browsers : [ 'last 2 versions' ],
            cascade  : false
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', () => {
    return gulp.src('./build/*.css')
        .pipe(cleancss({ compatibility : 'ie8' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('webpack', () => {
    return gulp.src(webpackFiles)
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('build/'));
});

gulp.task('webserver', () => {
    gulp.src('.')
        .pipe(webserver({
            host                : server.host,
            port                : server.port,
            livereload          : true,
            directoryListing    : false,
            open                : true,
            fallback            : './build/index.html'
        }));
});

gulp.task('default', (done) => {
    runSequence(
        [ 'start', 'clean' ],
        'sass',
        'concat-css',
        'autoprefixer',
        'minify-css',
        [ 'webpack', 'webserver' ],
    done);
});
