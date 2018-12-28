/// <reference path="tcp-server.js" />

class Peer {

   /**
    * Create an instance of the Client.
    * @param {Object} tcpConnection Established TCP connection.
    * @param {String} address address of the connecting peer.
    * @param {Number} port port of the connecting peer.
    * @param {Number} maxCachedLogs Maximum number of cached logs kept in memory.
    */
   constructor(tcpConnection, address, port, maxCachedLogs) {
      this.id = address + ":" + port;
      this.tag = "[" + this.id + "]";
      this.maxStoredLogs = maxCachedLogs;

      this._logs = new Array();
      this._logReceivedCallback = null;
      this._logRemovedCallback = null;

      tcpConnection.addDataReceivedListener(this._onDataReceived.bind(this));
   }

   /**
    * Invoked whenever a new log is received
    * @param {any} logData data received.
    */
   _onDataReceived(logData) {
      var lines = logData.split(/[\n\r]+/);

      for (var i = 0; i < lines.length; i++) {
         var line = lines[i];
         if (line.length > 0) {
            this._addLog(line);
         }
      }
   }

   /**
    * Adds the received log to an internal memory array with limited size
    * @param {any} logEvent log received.
    */
   _addLog(logEvent) {
      this._logs.push(logEvent);
      if (this._logReceivedCallback !== null) {
         this._logReceivedCallback(this, logEvent);
      }

      if (this._logs.length > this.maxStoredLogs) {
         removed = this._logs.shift();
         if (this._logRemovedCallback !== null) {
            this._logRemovedCallback(this, removed);
         }
      }
   }

   /**
    * Sets the callback to invoke whenever a new log is received.
    * @param {function(Peer, String):void} callback callback to invoke whenever a new log is received.
    */
   setLogReceivedCallback(callback) {
      this._logReceivedCallback = callback;
   }

   /**
    * Sets the callback to invoke whenever a log is removed from the internal memory.
    * @param {function(Peer, String):void} callback callback to invoke whenever a new log is removed from the internal memory.
    */
   setLogRemovedCallback(callback) {
      this._logRemovedCallback = callback;
   }
}