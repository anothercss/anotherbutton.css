var gulp = require('gulp')
var gulpif = require('gulp-if')
var postcss = require('gulp-postcss')
var rename = require('gulp-rename')
var cssmin = require('gulp-cssmin')
var csscomb = require('gulp-csscomb')

var paths = {
  css: {
    src: './anotherbutton.css',
    dest: './dist',
    examples: './examples/css',
    watch: './anotherbutton.css'
  }
}

var processors = [
  require('postcss-import'),
  require('postcss-custom-properties'),
  require('postcss-custom-media'),
  require('postcss-calc')
]

var cssTask = function(options) {
  return gulp.src(options.src)
    .pipe(postcss(processors))
    .pipe(cssmin(options.optimize))
    .pipe(csscomb())
    .pipe(gulp.dest(options.dest))
    .pipe(gulp.dest(options.examples))
    .pipe(gulpif(options.minify, rename({
      extname: ".min.css"
    })))
    .pipe(gulpif(options.minify, cssmin(options.cssmin)))
    .pipe(gulpif(options.minify, gulp.dest(options.dest)))
    .pipe(gulpif(options.minify, gulp.dest(options.examples)))
}

gulp.task('dev', function() {
  cssTask({
    src: paths.css.src,
    minify: false,
    optimize: {
      advanced: true,
      aggressiveMerging: true,
      benchmark: false,
      compatibility: '*',
      debug: false,
      keepBreaks: true,
      mediaMerging: true,
      roundingPrecision: 10,
      shorthandCompacting: false
    },
    dest: paths.css.dest,
    examples: paths.css.examples
  })
})

gulp.task('watch', function () {
  gulp.watch(paths.css.watch, ['dev'])
})

gulp.task('prod', function() {
  cssTask({
    src: paths.css.src,
    minify: true,
    optimize: {
      advanced: true,
      aggressiveMerging: true,
      benchmark: false,
      compatibility: '*',
      debug: false,
      keepBreaks: true,
      mediaMerging: true,
      roundingPrecision: 10,
      shorthandCompacting: false
    },
    cssmin: {
      advanced: true,
      aggressiveMerging: true,
      benchmark: false,
      compatibility: '*',
      debug: false,
      keepBreaks: false,
      mediaMerging: true,
      roundingPrecision: 10,
      shorthandCompacting: false
    },
    dest: paths.css.dest,
    examples: paths.css.examples
  })
})
