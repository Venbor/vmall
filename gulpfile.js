const gulp = require('gulp');
const del = require('del');
const moment = require('moment');
const zip = require('gulp-zip');
const ftp = require('gulp-sftp');
const GulpSSH = require('gulp-ssh');
const gulpSequence = require('gulp-sequence');

// 服务器配置
// ssh root@103.213.250.157 -p 22
const serverConfig = {
  host: '103.213.250.157',
  port: 22,
  user: 'root',
  password: 'e1ae3ba3a7a7',
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

// 压缩文件
gulp.task('zip', (cb) => {
  gulp.src(['**', '!node_modules/**', '!node_modules/', '!index.html', '!static/**', '!static/'])
    .pipe(zip(`LINWB${moment().format('YYYY-MM-DD')}.zip`))
    .pipe(gulp.dest('dist'))
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
    .shell(['cd /root', 'sh linwb.sh', 'ls'], { filePath: 'shell.log' })
    .pipe(gulp.dest('assets'))
    .on('end', cb);
});

// 清除生产目录文件
gulp.task('clear', (cb) => {
  // del(['dist/**', '!dist']);
  del.sync(['./dist']);
  cb();
});

gulp.task('default', cb => gulpSequence('zip', 'upload', 'shell', 'clear', cb));
