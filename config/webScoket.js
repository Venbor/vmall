function socketClient(io){
   // 监听用户连接
   io.on('connection', function (socket) {
    //处理新用户进入
    // socket.on('login', function (data) {
    //           socket.socketId = data.userId; 
    //           onlineUserName=data.userName;
    //           onlineUserList.push(data);       
		  //     //通知除自己外其他用户有新用户加入
		  //     this.broadcast.emit('login', {
		  //           onlineUserName:onlineUserName,
		  //       });
    //       //通知全部成员在线人员信息
    //       io.sockets.emit('count', {
    //             onlineUserList:onlineUserList,
    //         });
    // });      
    // 监听用户退出
    socket.on('disconnect', function () {	
         // //处理退出的用户
         //   onlineUserList.forEach(function(value,index){
         //      if(value.userId==socket.socketId){
         //        outlineUserName=value.userName;
         //        onlineUserList.splice(index,1);
         //      }
         //    })
         //    //通知所有人用户退出
      	  //   this.broadcast.emit('logout', {
      	  //       outlineUserName:outlineUserName
      	  //     });  
         //    //通知全部成员在线人员信息
         //   io.sockets.emit('count', {
         //        onlineUserList:onlineUserList,
         //    });       
    });
    // 监听用户发布聊天内容
    socket.on('message', function (data) {
        //转发该消息给其他人
        // var nowtime=Date.parse(new Date());
        // data.time=formatTime(nowtime);
        // data.class="other";
        // this.broadcast.emit('message',data);
        // //转发该消息给自己
        // data.class="me";
        // this.emit('mymessage', data);
    });
});
}

module.exports = socketClient;