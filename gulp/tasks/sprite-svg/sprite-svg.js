var gulp        = require('gulp');
var watch       = require('gulp-watch');
var batch       = require('gulp-batch');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var through2    = require('through2');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');

gulp.task('sprite', function() {
    return gulp
        .src(config.src.iconsSvg + '/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore({ inlineSvg: true }))
        .pipe(through2.obj(function(file, encoding, cb) {
            var $ = file.cheerio;
            var data = $('svg > symbol').map(function() {
                var $this  = $(this);
                var size   = $this.attr('viewBox').split(' ').splice(2);
                var name   = $this.attr('id');
                var ratio  = size[0] / size[1]; // symbol width / symbol height
                var fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
                var stroke = $this.find('[stroke]').attr('stroke');
                return {
                    name: name,
                    ratio: +ratio.toFixed(2),
                    fill: fill || 'initial',
                    stroke: stroke || 'initial'
                };
            }).get();
            this.push(file);
            gulp.src(__dirname + '/_sprite-svg.scss')
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(gulp.dest(config.src.sassGen));
            gulp.src(__dirname + '/sprite.html')
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(gulp.dest(config.src.root));
            cb();
        }))
        .pipe(cheerio({
            run: function($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: '_sprite' }))
        .pipe(gulp.dest(config.src.templates + '/partials'));
});

gulp.task('sprite:watch', function() {
    watch(config.src.iconsSvg + '/*.svg', batch(function (events, done) {
        gulp.start('sprite', done);
    }));
});
