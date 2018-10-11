var gulp = require('gulp');
var webpack = require('webpack-stream');
var nodemon = require("gulp-nodemon");
var webpackConfig = require('./webpack.config.js');

// build configuration is different for the web and server
gulp.task('compile-server', function() {
  return gulp.src('./server/server.js')
    .pipe(webpack(webpackConfig.serverConfig))
    .pipe(gulp.dest('build'));
});
gulp.task('compile-web', function() {
  return gulp.src('./app.js')
    .pipe(webpack(webpackConfig.webConfig))
    .pipe(gulp.dest('build'));
});

// Starts node server
gulp.task("server", function () {
  nodemon({
    script: './build/server.js',
  });
});

// default
gulp.task('development', gulp.series('compile-web', 'compile-server', 'server'));
gulp.task('default',
  gulp.series(process.env.NODE_ENV || 'development')
);
