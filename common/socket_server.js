
class stocketServer {
  constructor(socketClient) {
    this.socketClient = socketClient;
  }

  emitToServer(channel, data) {
    this.socketClient.emit(channel, data);
  }
}

module.exports = stocketServer;
