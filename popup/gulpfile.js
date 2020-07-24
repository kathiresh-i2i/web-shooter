const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const rm = require('gulp-rimraf');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify')
const plugins = require('gulp-load-plugins')();
const ngHtml2Js = require("gulp-ng-html2js");
const ngHtml2JsBrowserify = require('browserify-ng-html2js')
const templateCache = require('gulp-angular-templatecache');
const browserSync = require('browser-sync');

const asssetsPath = require('./config/assets.json');
const paths = {
    pages: ['src/*.html']
};

const destPath = 'dist';

const vendors = ['angular', 'ts-ebml'];


const core = asssetsPath.core;
const main = asssetsPath.main;


gulp.task('clean', function () {
    return gulp.src(['src/**/*.js', 'dist']).pipe(rm());
    // return gulp.src([paths.js, 'dist/*']).pipe(rm())
});

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(destPath));
});

gulp.task('cssmin', function () {
    return gulp.src(main.css.src)
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.css.dest));
});

gulp.task('assetsCssMin', function () {
    return gulp.src(core.css.src)
        .pipe(plugins.debug())
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.css.dest));
});

gulp.task('prod_inject', function () {
    const injectOptions = { ignorePath: 'dist/', addPrefix: '.', addRootSlash: false }
    return gulp.src('src/index.html')
        .pipe(plugins.debug())
        .pipe(plugins.inject(gulp.src(["dist/css/lib.min.css", "dist/css/app.min.css"], {
            read: false,
            allowEmpty: true,
        }), injectOptions))
        .pipe(plugins.inject(gulp.src(["dist/js/lib.min.js", "dist/js/vendor.min.js","dist/js/app.min.js"], {
            read: false,
            allowEmpty: true
        }), injectOptions))
        .pipe(gulp.dest(destPath));
});


gulp.task('assetsJsMin', function () {
    return gulp.src(core.js.src)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.js.dest));
});

gulp.task('build:vendor', () => {
    const b = browserify({
        debug: true
    });

    // require all libs specified in vendors array
    vendors.forEach(lib => {
        b.require(lib);
    });

    return b.bundle()
        .pipe(source('vendor.js'))

        .pipe(plugins.rename({
            suffix: '.min'
        }))
       // .pipe(streamify(uglify()))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'))
        ;
});


gulp.task('build:app', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/popup.ts'],
        cache: {},
        packageCache: {}
    })
        .external(vendors)
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
      //  .pipe(streamify(uglify()))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('templates:build', function () {
    const headerTpl = `
    import * as angular from 'angular';
    import { MODULE_NAME } from './popup.module';

    const MODULE_DEPENDENCIES: Array<string> = [MODULE_NAME];
    export const TEMPLATE_MODULE_NAME ="<%= module %>";
    export const TemplateModule = angular.module("<%= module %>"<%= standalone %>,MODULE_DEPENDENCIES).run(["$templateCache", function($templateCache) {
    `
    return gulp.src('src/**/*.component.html')
        .pipe(plugins.htmlmin({
            empty: true,
            spare: true,
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(templateCache(
            {   
                templateHeader: headerTpl,
                templateFooter: '}]).name;' 
            }
        ))
        .pipe(plugins.concat("template.module.ts"))
        .pipe(gulp.dest('src/'));

});

gulp.task('move', function () {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('../dist/popup/'))
});

gulp.task('copy-images', function () {
  return gulp.src('assets/images/*')
      .pipe(gulp.dest('dist/images/'))
});

gulp.task('build', gulp.series('assetsCssMin', 'cssmin', 'assetsJsMin','templates:build', 'build:app', 'build:vendor',  'prod_inject', 'copy-images', 'move'));


gulp.task('default', gulp.series('assetsCssMin', 'cssmin', 'assetsJsMin', 'templates:build','build:app', 'build:vendor',  'prod_inject', 'move', 'clean'));

 
gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: 'dist/'
      }
    });
  });