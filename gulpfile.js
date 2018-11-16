const gulp = require('gulp');
const del = require('del');
const moment = require('moment');
const zip = require('gulp-zip');
const ftp = require('gulp-sftp');
const GulpSSH = require('gulp-ssh');
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence');

// 服务器配置
// ssh root@103.213.250.157 -p 22
const serverConfig = {
  host: '103.213.250.157',
  port: 22,
  user: 'root',
  password: '123456789lin',
};

// gulpSSH获取
const gulpSSH = new GulpSSH({
  sshConfig: {
    host: serverConfig.host,
    port: serverConfig.port,
    username: serverConfig.user,
    password: serverConfig.password,
  },
});

// 配置代码替换
gulp.task('change', (cb) => {
  gulp.src(['config/config_web.js'])
    .pipe(replace("password: '123456'", "password: ''"))
    .pipe(gulp.dest('config'))
    .on('end', cb);
});

// 压缩文件
gulp.task('zip', (cb) => {
  gulp.src(['**', '!node_modules/**', '!node_modules/', '!static/**', '!static/', '!index.html'])
    .pipe(zip(`VMALL${moment().format('YYYY-MM-DD')}.zip`))
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});

// 配置代码撤回
gulp.task('rechange', (cb) => {
  gulp.src(['config/config_web.js'])
    .pipe(replace("password: ''", "password: '123456'"))
    .pipe(gulp.dest('config'))
    .on('end', cb);
});

// 上传到服务器
gulp.task('upload', (cb) => {
  gulp.src('dist/*.zip')
    .pipe(ftp(Object.assign({
      remotePath: '/projects/projectzip/',
      host: serverConfig.host,
      user: serverConfig.user,
      pass: serverConfig.password,
      port: serverConfig.port,
    }, { callback: cb })));
});

// 执行服务器命令
gulp.task('shell', (cb) => {
  gulpSSH
    .shell(['cd /root', 'sh vmall.sh'], { filePath: 'shell.log' })
    .pipe(gulp.dest('./'))
    .on('end', cb);
});

// 重启Nginx
gulp.task('nginx', (cb) => {
  gulpSSH
    .shell(['cd /usr/local/nginx/sbin', './nginx -s stop', './nginx'], { filePath: 'shell.log' })
    .pipe(gulp.dest('./'))
    .on('end', cb);
});

// 清除生产目录文件
gulp.task('clear', (cb) => {
  // del(['dist/**', '!dist']);
  del.sync(['./dist']);
  cb();
});

gulp.task('default', cb => gulpSequence('change', 'zip', 'rechange', 'upload', 'clear', 'shell', cb));
