const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const minifyCSS = require('gulp-csso');
const runSeq = require('run-sequence');
const rm = require('gulp-rimraf');

const files = [
  {
    src: 'src/docs/*',
    dest: 'dist/docs/'
  },
  {
    src: 'src/manifest.json',
    dest: 'dist/'
  },
  {
    src: 'src/assets/*/*',
    dest: 'dist/assets'
  },
  {
    src: 'src/html/*',
    dest: 'dist/'
  }
]

gulp.task('js', function (cb) {
  pump([
    gulp.src('src/js/**/*.js'),
    // uglify(),
    gulp.dest('dist')
  ],
    cb
  );
});

gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'))
});

gulp.task('move', function (cb) {
  files.forEach((file, index) => {
    pump([
      gulp.src(file.src),
      gulp.dest(file.dest)
    ]);
    if (index === (files.length - 1)) {
      cb();
    }
  });
});

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(rm());
});

gulp.task('build', function (cb) {
  runSeq('clean', ['js', 'css', 'move'], cb)
});


gulp.task('default', ['build'], function() {
  gulp.watch('src/**/*', function() {
     gulp.run('build');
  });
});

