var gulp = require('gulp');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');

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



// gulp.task('default', function()
// {
//   console.log('Hellp Gulp!');
// });
