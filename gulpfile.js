var os = require('os');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var opn = require('opn');
var webpack = require('webpack-stream');

var appWebpackConfig = require('./webpack-app.config.js');
var serverWebpackConfig = require('./webpack-server.config.js');

const isDevEnv = process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'production'; // todo: not 'production' is kinda hacky
var browser = os.platform() === 'darwin' ? '/Applications/Google\ Chrome.app' : 'google-chrome';
switch(os.platform())
{
  case 'aix':

    break;
  case 'darwin':
    browser = '/Applications/Google\ Chrome.app';
    break;
  case 'freebsd':

    break;
  case 'linux':

    break;
  case 'openbsd':

    break;
  case 'sunos':

    break;
  case 'win32':
    browser = "Chrome";
    break;
  default:
    browser = 'google-chrome';
    break;
}
// files to watch for in the web app
const WEBAPP_CHANGE_WATCH = [
  '!**/{' + [
    'bower_components',
    'bundles',
    'compiled',
    'config',
    'dev',
    'libraries',
    'node_modules',
  ].join(',') +
  '}/**',
  './public/index.html',
  '*.css',
  './public/*.js',
  './public/**/*.js',
  './shared/*.js',
  './shared/**/*.js',
];
// files to watch for in the server (which include the webapp)
const SERVER_CHANGE_WATCH = [
  ...WEBAPP_CHANGE_WATCH,
  './server/*.js',
  './server/**/*.js',
];

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
  gulp.watch(WEBAPP_CHANGE_WATCH, gulp.series('compile-webapp'));
});

// run webapp page
gulp.task("run-webapp-local", function() {
  return opn('./build/index.html', {app: browser});
});

// watch for changes for the server
gulp.task('server:watch', function() {
  gulp.watch(WEBAPP_CHANGE_WATCH, gulp.series('compile-webapp'));
});

// nodemon start server
gulp.task('run-nodemon-server', function() {
  var stream = nodemon({
    script: './build/server.js',
    ignore: ['node_modules/', 'bundles/'],
    watch: SERVER_CHANGE_WATCH,
    tasks: ['compile-webapp', 'compile-server']
  });

  if (isDevEnv) {
    opn('http://localhost:666', {app: browser});
  }

  return stream;
})

gulp.task('run-production-server', function(cb) {
  exec('node build/server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


// default
gulp.task('dev-webapp', gulp.series('compile-webapp', 'webapp:watch', 'run-webapp-local'));
gulp.task('dev-server', gulp.series('compile-server', 'run-nodemon-server'));
gulp.task('development', gulp.series('compile-webapp', 'compile-server', 'run-nodemon-server'));
gulp.task('production', gulp.series('compile-webapp', 'compile-server', 'run-production-server'));
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
