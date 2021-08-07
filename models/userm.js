module.exports.getList = (connection, opt) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if(error) {
                connection.release();
                reject(error);
            }
            resolve(results);
        })
    })
}

module.exports.delete = (connection,opt) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM users WHERE idx = ?`, opt.idx,(error, results, fields) => {
            if(error) {
                connection.release();
                reject(error)
            }
            resolve(results)
        })
    })
}

module.exports.update = (connection, opt) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE users SET ? WHERE idx = ?`, [opt, opt.idx], (error, results, fields) => {
            if(error) {
                connection.release()
                reject(error)
            }
            resolve(results)
        })
    })
}

module.exports.getUser = (connection, opt) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT id, pwd FROM users WHERE id = ?`, opt.id, (error, results, fields) => {
            if(error) {
                connection.release()
                reject(error)
            }
            resolve(results)
        })
    })
}

module.exports.insert = (connection, opt) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users SET ?`, opt, (error, results, fields) => {
            if(error) {
                connection.release()
                reject(error)
            }
            resolve(results)
        })
    })
}