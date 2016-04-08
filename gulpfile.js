const gulp = require('gulp');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');

const mainBowerFiles = require('main-bower-files');

    gulp.task('bower', function(cb) {
        var files = mainBowerFiles(),
            jsFilter = filter('**/*.js', {restore: true}),
            cssFilter = filter('**/*.css', {restore: true}),
            fontFilter = filter('**/*.{eot,svg,ttf,woff,woff2}', {restore: true}),

            everythingElseFilter = filter([ '**/*.!{js,css}' ], {restore: true})
            //onError = createOnError(cb);

        if (!files.length) {
            return cb();
        }

        gulp.src(mainBowerFiles())
         .pipe(jsFilter)
         .pipe(concat('vendor.js'))
         .pipe(uglify())
         //.on('error', onError)
         .pipe(gulp.dest('public/js'))
         .pipe(jsFilter.restore)
         .pipe(cssFilter)
         .pipe(concat('vendor.css'))
         //.on('error', onError)
         .pipe(gulp.dest('public/css'))
         .pipe(cssFilter.restore)
         .pipe(fontFilter)
         //.on('error', onError)
         .pipe(gulp.dest('public/fonts'))
         .pipe(fontFilter.restore)
         .pipe(everythingElseFilter)
         .pipe(gulp.dest('public'))
         .on('end', cb);
    });
