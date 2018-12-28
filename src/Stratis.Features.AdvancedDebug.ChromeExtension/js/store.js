'use strict';

function Store(name, callback) {
   var dbName;

   callback = callback || function () { };

   dbName = this._dbName = name;

   chrome.storage.local.get(dbName, function (storage) {
      if (dbName in storage) {
         callback.call(this, storage[dbName].todos);
      } else {
         storage = {};
         storage[dbName] = { todos: [] };

         chrome.storage.local.set(storage, function () {
            callback.call(this, storage[dbName].todos);
         }.bind(this));
      }
   }.bind(this));
}

Store.prototype.find = function (query, callback) {
   if (!callback) {
      return;
   }

   chrome.storage.local.get(this._dbName, function (storage) {
      var todos = storage[this._dbName].todos.filter(function (todo) {
         for (var q in query) {
            return query[q] === todo[q];
         }
      });

      callback.call(this, todos);
   }.bind(this));
};

Store.prototype.findAll = function (callback) {
   callback = callback || function () { };
   chrome.storage.local.get(this._dbName, function (storage) {
      var todos = storage[this._dbName] && storage[this._dbName].todos || [];
      callback.call(this, todos);
   }.bind(this));
};

Store.prototype.save = function (id, updateData, callback) {
   chrome.storage.local.get(this._dbName, function (storage) {
      var data = storage[this._dbName];
      var todos = data.todos;

      callback = callback || function () { };

      // If an ID was actually given, find the item and update each property
      if (typeof id !== 'object' || Array.isArray(id)) {
         var ids = [].concat(id);
         ids.forEach(function (id) {
            for (var i = 0; i < todos.length; i++) {
               if (todos[i].id == id) {
                  for (var x in updateData) {
                     todos[i][x] = updateData[x];
                  }
               }
            }
         });

         chrome.storage.local.set(storage, function () {
            chrome.storage.local.get(this._dbName, function (storage) {
               callback.call(this, storage[this._dbName].todos);
            }.bind(this));
         }.bind(this));
      } else {
         callback = updateData;

         updateData = id;

         // Generate an ID
         updateData.id = new Date().getTime();

         todos.push(updateData);
         chrome.storage.local.set(storage, function () {
            callback.call(this, [updateData]);
         }.bind(this));
      }
   }.bind(this));
};