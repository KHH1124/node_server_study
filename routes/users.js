var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  user : 'root',
  password : '^^rla940794',
  database : 'userEx'
})

// 회원가입
router.post('/signup', function(req, res, next) {
  const body = req.body
  pool.getConnection((err, connection) =>{
    if(err) throw err;
    
    connection.query('SELECT id FROM users WHERE id = ?', body.id,(error, results, fields) => {
      // connection.release();
      if(results.length == 0) {
        connection.query(`INSERT INTO users SET ?`, body, (error, results, fields) => {
          connection.release();
          console.log(results)
          res.status(200).json({results})
          if(error) throw error;
        })
      } else {
        return res.status(200).json('exist id')
      }
      if(error) throw error;
    })
    
  })
})

//로그인
router.post('/signin', function(req, res, next) {
  const {id, pwd} = req.body
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query('SELECT id, pwd FROM users WHERE id = ?', id,(error, results, fields) => {
      connection.release();
      console.log(results)
      console.log(id, pwd, results[0].id, results[0].pwd)
      if(id == results[0].id && pwd == results[0].pwd) {
        return res.status(200).json({login:true})
      }
      res.status(200).json('wrong id or password')
      if(error) throw error;
    })
  })
})

//회원 정보 수정
router.put('/', function(req, res, next) {
  const body = req.body;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query(`UPDATE users SET ? WHERE idx = ?`, [body, body.idx], (error, results, fields) => {
      connection.release();
      console.log(results)
      res.status(200).json({results})
      if(error) throw error;
    })
  })
})

//회원 탈퇴
router.delete('/', function(req, res, next) {
  const body = req.body
  pool.getConnection(function(err,connection) {
    if(err) throw err;
    connection.query(`DELETE FROM users WHERE idx = ?`, body.idx,(error, results, fields) => {
      connection.release();
      console.log(results)
      res.status(200).json({results})
      if(error) throw error
    })
  })
})

//회원 확인
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query('SELECT * FROM users', (error, results, fields) => {
      connection.release();
      console.log(results)
      res.status(200).json({results})
      if(error) throw error;
    })
  })
});

module.exports = router;
