var os = require('os');
var childProcess = require('child_process');
var gulp = require('gulp');
var opn = require('opn');
var webpack = require('webpack-stream');

var appWebpackConfig = require('./webpack-app.config.js');
var serverWebpackConfig = require('./webpack-server.config.js');

const isDevEnv = process.env.NODE_ENV === 'development';
const browser = os.platform() === 'darwin' ? '/Applications/Google\ Chrome.app' : 'google-chrome';

// build configuration is different for the web and server
gulp.task('compile-server', function() {
  return gulp.src('./server/server.js')
    .pipe(webpack(serverWebpackConfig))
    .pipe(gulp.dest('build'));
});

// compile webapp
gulp.task('compile-webapp', function(done) {
  return gulp.src('./app.js')
    .pipe(webpack(appWebpackConfig))
    .pipe(gulp.dest('build'));
});

// watch for changes for the webapp
gulp.task('webapp:watch', function() {
  gulp.watch('./public', gulp.series('compile-webapp', 'run-webapp-local'));
});

// run webapp page
gulp.task("run-webapp-local", function() {
  return opn('./build/index.html', {app: browser});
});

// watch for changes for the server
gulp.task('server:watch', function() {
  gulp.watch('./public', gulp.series('compile-webapp', 'run-server-local'));
});

// Starts node server
gulp.task("run-server-local", function() {
  const serverProcess = childProcess.spawn('node', ['./build/server.js']);
  serverProcess.stdout.on('data', function() {
    // open after server is running
    opn('http://localhost:666', {app: browser});

    // watch for changes to the app and recompile
    gulp.watch('./public', gulp.series('compile-webapp', 'run-server-local'));
  });
});

// default
gulp.task('dev-webapp', gulp.series('compile-webapp', 'run-webapp-local', 'webapp:watch'));
gulp.task('dev-server', gulp.series('compile-server', 'run-server-local', 'server:watch'));
gulp.task('development', gulp.series('compile-webapp', 'compile-server', 'run-server-local'));

/**
 * different 'default' task depending on settings
 */
function getDefaultTask() {
  // only testing the web app
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
