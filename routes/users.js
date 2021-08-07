var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const userm = require('../models/userm')
const db = require('../components/db')

// 회원가입
router.post('/signup', async (req, res, next) => {
  const body = req.body
  const connection = await db.getConnection()
  await db.getConnection(connection)
  const user = await userm.getUser(connection, body)
  if(user.length > 0) {
    return res.status(200).json('exist id')
  } 
  const results = await userm.insert(connection, body)
  await db.commit(connection)
  return res.status(200).json({results})
})

//로그인
router.post('/signin', async (req, res, next) => {
  const body = req.body
  const connection = await db.getConnection()
  const user = await userm.getUser(connection, body)
  if(body.id == user[0].id && body.pwd == user[0].pwd) {
    return res.status(200).json({login:true})
  }
  res.status(200).json('wrong id or password')
  if(error) throw error;    
})

//회원 정보 수정
router.put('/', async (req, res, next) => {
  const body = req.body;
  const connection = await db.getConnection()
  await db.beginTransaction(connection)
  const results = await userm.update(connection, body)
  await db.commit(connection)
  res.status(200).json({results})
})

//회원 탈퇴
router.delete('/', async (req, res, next) => {
  const body = req.body
  const connection = await db.getConnection()
  await db.beginTransaction(connection)
  const results = await userm.delete(connection, body)
  await db.commit(connection)
  res.status(200).json({results})
})

//회원 확인
router.get('/', async (req, res, next) => {
  const connection = await db.getConnection()
  const results = await userm.getList(connection);
  res.status(200).json({results})
});

module.exports = router;
