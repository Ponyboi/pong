var gulp = require('gulp');
var webpack = require('webpack-stream');
var nodemon = require("gulp-nodemon");
var webpackConfig = require('./webpack.config.js');

const isDevEnv = process.env.NODE_ENV === 'development';

// build configuration is different for the web and server
gulp.task('compile-server', function() {
  return gulp.src('./server/server.js')
    .pipe(webpack(webpackConfig.serverConfig))
    .pipe(gulp.dest('build'));
});
gulp.task('compile-webapp', function() {
  // if using the dev environment, set up the config to watch for changes and refresh
  if (isDevEnv) {
    webpackConfig.webConfig.watch = true;
  };

  return gulp.src('./app.js')
    .pipe(webpack(webpackConfig.webConfig))
    .pipe(gulp.dest('build'));
});

// only run the local web app
gulp.task("run-webapp", function(cb) {
  cb();
});

// Starts node server
gulp.task("run-server", function() {
  nodemon({
    script: './build/server.js',
  });
});

// default
gulp.task('dev-webapp', gulp.series('compile-webapp', 'run-webapp'));
gulp.task('dev-server', gulp.series('compile-server', 'run-server'));
gulp.task('development', gulp.series('compile-webapp', 'compile-server', 'run-server'));

/**
 * different 'default' task depending on settings
 */
function getDefaultTask() {
  // only testing the pong app
  if (process.env.DEV_ENV === 'webapp') {
    return gulp.series('dev-webapp');
  }

  // test with the socket server
  if (process.env.DEV_ENV === 'server') {
    return gulp.series('dev-server');
  }

  // production
  if (process.env.NODE_ENV === 'production') {
    return gulp.series('production');
  };

  // use dev otherwise
  return gulp.series('development');
};

gulp.task('default', getDefaultTask());
