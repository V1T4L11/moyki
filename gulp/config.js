var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';
var nodePath = 'node_modules/';

var config = {
    env       : 'development',
    production: production,

    src: {
        root         : 'src',
        templates    : 'src/templates',
        templatesData: './src/templates/data',
        sass         : 'src/scss',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'src/scss/generated',
        js           : 'src/js',
        img          : 'src/images',
        svg          : 'src/images/svg',
        iconsSvg     : 'src/icons',
        fonts        : 'src/scss/fonts',
        lib          : 'src/lib'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/images',
        fonts: destPath + '/css/fonts',
        lib  : destPath + '/lib'
    },

    scssIncludes: [
        nodePath + 'breakpoint-sass/stylesheets/',
        nodePath + 'modularscale-sass/stylesheets/',
        nodePath + 'sass-rem',
        nodePath + 'susy/sass'
    ],

    cssVendors: [
        nodePath + 'normalize.css/normalize.css',
        nodePath + 'slick-carousel/slick/slick.css',
        nodePath + 'slick-carousel/slick/slick-theme.css',
        nodePath + 'magnific-popup/dist/magnific-popup.css'
    ],

    jsVendors: [
        nodePath + 'jquery/dist/jquery.min.js',
        nodePath + 'slick-carousel/slick/slick.js',
        nodePath + 'magnific-popup/dist/jquery.magnific-popup.js'
    ],

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
