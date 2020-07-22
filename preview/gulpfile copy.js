const gulp = require('gulp');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const plugins = require('gulp-load-plugins')();
const debug = require('gulp-debug')
const inject = require('gulp-inject');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');

const rename = require('gulp-rename');
const clean = require('gulp-clean');
const rm = require('gulp-rimraf');
const babel = require('gulp-babel');
const runSeq = require('run-sequence');
const uglifyEs = require('gulp-uglify-es').default;
const browserify = require('gulp-browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');

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
  return  gulp.src(htmlPath + 'index.html')
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
  return  gulp.src(destPath + '/index.html')
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
   return  gulp.src(main.css.src)
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.css.dest));
});


// gulp.task('jsmin', function () {
//    return gulp.src(main.js.src)
//         .pipe(plugins.ngAnnotate())
//         // .pipe(babel({presets: ['es2015']}))
//         // .pipe(plugins.uglify())
//         // .pipe(browserify({
//         //      shim: {
//         //         angular: {
//         //             path: 'node_modules/angular/angular.js',
//         //             exports: 'angular'
//         //         }
//         //     }
//         // }))
//         .pipe(uglifyEs())
//         .pipe(plugins.concat('app.js'))
//         .pipe(plugins.rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest(main.js.dest));
// });

gulp.task('jsmin', function () {
    return gulp.src(main.js.src)
    .pipe(plugins.ngAnnotate())
    .pipe(browserify({
        basedir: '.',
        debug: true,
        entries: ['src/preview.ts'],
        cache: {},
        packageCache: {}
    }))
    .pipe(tsify())
     .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist'))
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

gulp.task('clean', function () {
  return gulp.src(['src/**/*.js', 'dist/*']).pipe(rm());
  // return gulp.src([paths.js, 'dist/*']).pipe(rm())
});


gulp.task('build', function (cb) {
    runSeq('clean', ['compile-to-js', 'assetsCssMin', 'assetsJsMin', 'cssmin', 'jsmin', 'copy-html', 'prod_inject'], cb)
});

gulp.task('test',gulp.series('compile-to-js','jsmin'));

gulp.task('default', gulp.series('compile-to-js', 'assetsCssMin', 'assetsJsMin', 'cssmin', 'jsmin', 'copy-html', 'prod_inject'));



