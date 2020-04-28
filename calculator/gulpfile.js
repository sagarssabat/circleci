var gulp = require('gulp');
var sass = require('gulp-sass');
var dartsass = require('gulp-dart-sass');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var run = require('gulp-run-command').default;
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// task to convert sass to minifies css and generate map files resp.
gulp.task('sass', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(dartsass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'));
});
//task to reload the browser once scss/html file is changed
gulp.task('serve', function () {
    browserSync.init({
        injectChanges: true,
        watch: true,
        notify: true,
        // server: ["."]
        server: {
            baseDir: "./",
            routes: {
                "./assets": "assets"
            }
        }
    });

    gulp.watch(['./assets/scss/**/*.scss', './**/*.html'], gulp.series('sass', done => {
        browserSync.reload();
        done();
    }));
});

//task to generate and watch css for the first time
gulp.task('default', gulp.series('sass', 'serve'));