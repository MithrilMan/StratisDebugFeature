/// <reference path="peer.js" />
/// <reference path="tcp-server.js" />

class Server {

   /**
    * Create an instance of the Server class.
    * @param {Number} maxCachedLogsPerPeer Maximum number of cached logs kept in memory for every connected peer.
    */
   constructor(logContainerId, maxCachedLogsPerPeer) {
      this._$logContainer = document.querySelector("#logPanel");
      this._$logs = document.querySelector("#serverlog");
      this._$connectionBox = document.querySelector("#connection-box");
      this.maxCachedLogsPerPeer = maxCachedLogsPerPeer;

      this.tcpServer = null;
      this.connectedClients = new Array();
   }

   initialize() {
      var instance = this;

      TcpServer.getNetworkAddresses(function (list) {
         var addr = document.querySelector("#addresses");
         for (var i = 0; i < list.length; i++) {
            if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(list[i].address)) {
               var option = document.createElement('option');
               option.text = list[i].name + " (" + list[i].address + ")";
               option.value = list[i].address;
               addr.appendChild(option);
            }
         }
      });

      document.getElementById('serverStart').addEventListener('click', function () {
         var addr = document.getElementById("addresses").value;
         var port = parseInt(document.getElementById("serverPort").value);
         instance.setConnectedState(addr, port);
         instance.startServer(addr, port);
      });

      document.getElementById('serverStop').addEventListener('click', function () {
         instance._$connectionBox.className = "";
         instance._$logContainer.className = "";
         instance.stopServer();
      });

      var currentState = instance.getServerState();
      if (currentState.isConnected) {
         instance.setConnectedState(currentState.addr, currentState.port);
      }

      //chrome.fileSystem.getWritableEntry(chosenFileEntry, function (writableFileEntry) {
      //   writableFileEntry.createWriter(function (writer) {
      //      writer.onerror = errorHandler;
      //      writer.onwriteend = callback;

      //      chosenFileEntry.file(function (file) {
      //         writer.write(file);
      //      });
      //   }, errorHandler);
      //});
   }


   startServer(address, port) {
      if (this.tcpServer) {
         this.tcpServer.disconnect();
      }
      this.tcpServer = new TcpServer(address, port);
      this.tcpServer.listen(this._onAcceptCallback.bind(this));
   }

   stopServer() {
      if (this.tcpServer) {
         this.tcpServer.disconnect();
         this.tcpServer = null;
      }
   }

   getServerState() {
      if (this.tcpServer) {
         return {
            isConnected: this.tcpServer.isConnected(),
            addr: this.tcpServer.addr,
            port: this.tcpServer.port
         };
      } else {
         return { isConnected: false };
      }
   }

   _onAcceptCallback(tcpConnection, socketInfo) {
      var newPeer = new Peer(tcpConnection, socketInfo.peerAddress, socketInfo.peerPort, this.maxCachedLogsPerPeer);
      newPeer.setLogReceivedCallback(this._onLogReceived.bind(this));
      newPeer.setLogRemovedCallback(this._onLogRemoved.bind(this));

      this.connectedClients.push(newPeer);
      var info = newPeer.tag + " Connection accepted!";
      if (console)
         console.log(info);
   }

   /**
    * Invoked whenever a peer receive a log
    * @param {Peer} peer Peer that received the log.
    * @param {String} log Received log message.
    */
   _onLogReceived(peer, log) {
      var html = '<div>' + peer.tag + ': ' + log + '</div>';
      this._$logs.innerHTML += html;
   }

   _onLogRemoved(peer, log) {

   }

   setConnectedState(addr, port) {
      document.querySelector(".serving-at").innerText = addr + ":" + port;
      this._$connectionBox.className = "connected";
      this._$logContainer.className = "connected";
   }
}