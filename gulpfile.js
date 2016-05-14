var gulp = require('gulp');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var transform = require('vinyl-transform'),
var uglify = require('gulp-uglify'),
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject(
  {
    removeComments: true,
    noImplicitAny: true,
    target: 'ES3',
    module: 'commonjs',
    declarationFiles: false
  });

var tsTestProject = ts.createProject(
  {
    removeComments: true,
    noImplicitAny: true,
    target: 'ES3',
    module: 'commonjs',
    declarationFiles: false
  });

  var browserified = transform(function(filename)
  {
    var b = browserify({entries: filename, debug: true});
    return b.bundle;
  });

gulp.task('default', ['lint', 'tsc', 'tsc-tests']);

gulp.task('lint', function()
{
    return gulp.src(['./source/ts/**/**.ts', '/test/**/**.test.ts'])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('tsc', function()
{
    return gulp.src('./source/ts/**/**.ts')
    .pipe(ts(tsProject))
    .js.pipe(gulp.desc('./temp/sourdce/js'));
});

gulp.task('tsc-tests', function()
{
    return gulp.src('./test/ts/**/**.ts')
    .pipe(ts(tsProject))
    .js.pipe(gulp.desc('./temp/test/js'));
});

gulp.task('bundle-js', function()
{
  return gulp.src('./temp/source/js/main.js')
  .pipe(browserified)
  .pipe(sourcemaps.init(
    {
      loadMaps:true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/source/js/'));
})



// gulp.task('default', function()
// {
//   console.log('Hellp Gulp!');
// });
