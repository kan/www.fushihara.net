var gulp = require('gulp');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');
var gzip = require('gulp-gzip');
var bower = require('main-bower-files');
var concat = require('gulp-concat');
var react = require('gulp-react');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var debug = require('gulp-debug');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src/',
            index: 'index.html'
        }
    });

    gulp.watch('src/**/*.+(html|js|css|svg)').on('change', browserSync.reload);
    gulp.watch('src/**/*.jsx', ['script']);
    gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src'));
});

gulp.task('minify-css', ['sass'], function() {
    return gulp.src('src/**/*.css')
        .pipe(plumber())
        .pipe(filter(['**/*.css', '!**/*.min.css']))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src'));
});

gulp.task('script', function() {
    browserify({
        entries: ['src/js/main.jsx'],
        transform: [reactify, debowerify],
        debug: true
    }).bundle()
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('build', ['script','minify-css'], function() {
    gulp.src('src/**/*.*')
        .pipe(plumber())
        .pipe(filter(['**/*', '!**/*.jsx', '!**/*.scss']))
        .pipe(gulp.dest('dist'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('release', shell.task([
    'ssh fushihara.net "cd /var/www; git pull"',
    'open https://fushihara.net/'
]));
