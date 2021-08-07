const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  user : 'root',
  password : "^^rla940794",
  database : 'userEx'
})

module.exports.getConnection = function() {
    return new Promise(function(resolve,reject) {
        pool.getConnection(function(err,connection) {
            if(err) {
                reject(err)
            }
            resolve(connection)
        })
    })
}

module.exports.beginTransaction = function(connection) {
    return new Promise(function(resolve,reject) {
        connection.beginTransaction(function(err) {
            if(err) {
                reject(err)
            }
            resolve()
        })
    })
}

module.exports.commit = function(connection) {
    return new Promise(function(resolve,reject) {
        connection.commit(function(err) {
            if(err) {
                reject(this.rollback(connection))
            } else {
                connection.release()
                resolve()
            }
        })
    })
}

module.exports.rollback = function(connection) {
    return new Promise(function(resolve,reject) {
        connection.rollback(function(err) {
            if(err) {
                reject(err)
            } else {
                connection.release()
                resolve()
            }
        })
    })
}