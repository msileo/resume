const { dest, src, series, task } = require('gulp');

// Include plugins
const autoprefixer = require('gulp-autoprefixer');

//scss file processing
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

//minify css
const cleanCSS = require('gulp-clean-css');

// Compile Sass into autoprefixed CSS with sourcemaps for local development
task('processSass', () => {
  return src(['./src/sass/**/*.scss'])
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(dest('./public/css'));
});

// Compile CSS into minified CSS with sourcemaps
task('minifyCSS', () => {
  return src('./public/css/**/*.css')
    .pipe(
      cleanCSS().on('error', err => {
        console.log(err);
      })
    )
    .pipe(dest('./public/css_min'));
});

task('sassify', series('processSass', 'minifyCSS'));

// Clean
task('html', () => {
  return src('./src/index.html').pipe(dest('./public/'));
});

task('build', series('sassify', 'html'));
