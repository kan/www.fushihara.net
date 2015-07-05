var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});

