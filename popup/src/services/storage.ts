
export class StorageService {
  database: IDBDatabase;
  public static $inject: string[] = ['$q'];
  public browserInfoValue: Object = {};
  constructor(
    private $q: angular.IQService
  ) { }

  init() {
    var deferred = this.$q.defer();

    var request = indexedDB.open("db");

    request.onupgradeneeded = function() {
        // The database did not previously exist, so create object stores and indexes.
        var db = request.result;

        var usersStore = db.createObjectStore("users", { keyPath: "email" });
        usersStore.createIndex('email_idx', 'email');
    };

    request.onsuccess = function() {
        deferred.resolve(request.result);
    };

    request.onerror = function() {
        deferred.reject(request.error);
    };

    return deferred.promise;
}

add(storeName, entity) {
    var deferred = this.$q.defer();

    var add = function(db) {

        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);

        store.add(entity);

        tx.oncomplete = function(e) {
            // All requests have succeeded and the transaction has committed.
            deferred.resolve(entity.id);
        };

        tx.onerror = function(ex) {
            deferred.reject(ex);
        };
        tx.onabort = function(ex) {
            deferred.reject(ex);
        };

        //db.close();
    }

    this.init().then(add);

    return deferred.promise;
}

put(storeName, entity) {
    var deferred = this.$q.defer();
    var put = function(db) {

        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);

        store.put(entity);

        tx.oncomplete = function() {
            // All requests have succeeded and the transaction has committed.
            deferred.resolve(tx.result);
        };

        tx.onerror = function() {
            deferred.reject(tx);
        };
        tx.onabort = function() {
            deferred.reject(tx);
        };
    }

    this.init().then(put);

    return deferred.promise;
}
getById(storeName, id) {
    var deferred = this.$q.defer();

    var getById = function(db) {

        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        var index = store.index("email_idx");

        var request = index.get(id);

        request.onsuccess = function() {
            deferred.resolve(request.result);
        };

        request.onerror = function() {
            deferred.reject(request.error);
        };
        tx.onabort = function() {
            deferred.reject(tx.error);
        };
    }

    this.init().then(getById);

    return deferred.promise;
}

getAll(storeName) {
  var deferred = this.$q.defer();

  var getById = function(db) {

      var tx = db.transaction(storeName, "readonly");
      var store = tx.objectStore(storeName);
      var request = store.getAll();
      
      request.onsuccess = function() {
          deferred.resolve(request.result);
      };

      request.onerror = function() {
          deferred.reject(request.error);
      };
      tx.onabort = function() {
          deferred.reject(tx.error);
      };
  }

  this.init().then(getById);

  return deferred.promise;
}

remove(storeName, id) {
    var deferred = this.$q.defer();

    var remove = function(db) {

        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);

        store.delete(id);

        tx.oncomplete = function(e) {
            // All requests have succeeded and the transaction has committed.
            deferred.resolve(id);
        };

        tx.onerror = function(r) {
            deferred.reject(r.error);
        };
        tx.onabort = function(r) {
            deferred.reject(r.error);
        };

        //db.close();
    }

    this.init().then(remove);

    return deferred.promise;
}



}