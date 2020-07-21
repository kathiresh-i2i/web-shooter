const gulp = require('gulp');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plugins = require('gulp-load-plugins')();
const debug = require('gulp-debug')
const inject = require('gulp-inject');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');
const rm = require('gulp-rimraf');
const babel = require('gulp-babel');
const runSeq = require('run-sequence');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const _ = require('lazy.js');
const sources = require('./config/assets.json');
const dirPath = require("path").join(__dirname, "/");
console.log('....DIR pATH', dirPath);

const destPath = 'dist';
const paths = {
    pages: ['src/**/*.html'],
    js: ['src/**/*.js']
};

const htmlPath = dirPath + "src/";

const core = sources.core;
const main = sources.main;


const css = _(core.css.src).concat(main.css.src).toArray();
const js = _(core.js.src).concat(main.js.src).toArray();

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(destPath));
});

gulp.task('compile-to-js', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('src'));
});



gulp.task('copy-js', function () {
    return gulp.src(paths.js)
        .pipe(gulp.dest(destPath));
});

gulp.task('dev_inject', function () {
    gulp.src(htmlPath + 'index.html')
        .pipe(plugins.debug())
        .pipe(plugins.inject(gulp.src(css, {
            read: false
        })))
        .pipe(plugins.inject(gulp.src(js, {
            read: false
        })))
        .pipe(gulp.dest(destPath));
});

gulp.task('prod_inject', function () {
    console.log('......destPath..........',destPath);
    gulp.src(destPath + '/index.html')
        .pipe(plugins.debug())
        .pipe(plugins.inject(gulp.src(["dist/css/lib.min.css", "dist/css/app.min.css"], {
            read: false,
            //cwd: __dirname + '/dist'
        }), { }))
        .pipe(plugins.inject(gulp.src(["dist/js/lib.min.js", "dist/js/app.min.js"], {
            read: false
        })))
        .pipe(gulp.dest(destPath));
});

gulp.task('cssmin', function () {
    gulp.src(main.css.src)
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.css.dest));
});


gulp.task('jsmin', function () {
    gulp.src(main.js.src)
        .pipe(plugins.ngAnnotate())
        // .pipe(babel({
        //     presets: ['es2015']
        //  }))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.js.dest));
});


gulp.task('assetsCssMin', function () {
    gulp.src(core.css.src)
        .pipe(plugins.debug())
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.css.dest));
});

gulp.task('assetsJsMin', function () {
    gulp.src(core.js.src)
        .pipe(plugins.ngAnnotate())
        // .pipe(babel({
        //     presets: ['es2015']
        //  }))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.js.dest));
});

gulp.task('clean', function () {
    return gulp.src('dist/*').pipe(rm());
});


gulp.task('build', function (cb) {
    runSeq('clean', ['compile-to-js', 'assetsCssMin', 'assetsJsMin', 'cssmin', 'jsmin', 'copy-html', 'prod_inject'], cb)
});


gulp.task('default', ['build', 'prod_inject']);



