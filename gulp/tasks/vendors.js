var gulp            = require('gulp');
var concat          = require('gulp-concat');
var cssmin          = require('gulp-clean-css');
var rename          = require('gulp-rename');
var babel           = require('gulp-babel');
var uglify          = require('gulp-uglify');
var config          = require('../config');

gulp.task('vendors:js', function() {
  gulp.src(config.jsVendors)
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest.js+'/'));
});
gulp.task('vendors:js:copy', function() {
  gulp.src(config.jsVendors)
    .pipe(gulp.dest(config.dest.js+'/'));
});
gulp.task('vendors:js:show', function() {
    vendorsShow('js');
});

gulp.task('vendors:css', function() {
  gulp.src(config.cssVendors)
    .pipe(concat('vendors.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest.css));
});
gulp.task('vendors:css:show', function() {
    vendorsShow('css');
});

function vendorsShow(v) {
  var unfiltered = ( v == "css" ? config.cssVendors : config.jsVendors );
  for (var i = 0; i < unfiltered.length; i++) {
    console.log('vendor #' + i + ': ' + unfiltered[i]);
  }
}