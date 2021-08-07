var express = require('express');
var router = express.Router();
const fs = require('fs');

// 회원가입
router.post('/signup', function(req, res, next) {
  const user = req.body;
  let newDb;
  fs.readFile('database.json', 'utf8', (err,data) => {
    if(data) {
      let originDb = JSON.parse(data)
      let arrayDb = originDb.users ? originDb.users : []
      for(let x of arrayDb) {
        if(user.id == x.id) return res.json('user exist')
      }
      arrayDb.push(user)
      originDb.users = arrayDb
      newDb = JSON.stringify(originDb)
    } else {
      newDb = JSON.stringify({users: [user]})
    }
    fs.writeFile('database.json', newDb, 'utf8', (err) => {
      res.status(200).json({result:true, list: newDb})
    })
  })
})

//로그인
router.post('/signin', function(req, res, next) {
  const {id, pwd} = req.body
  fs.readFile('database.json', 'utf8', (err,data) => {
    let originDb = JSON.parse(data)
    let arrayDb = originDb.users
    for(let x of arrayDb) {
      if(id == x.id && pwd == x.pwd) {
        return res.status(200).json({login:true})
      }
    }
    res.status(200).json('wrong id or password')
  })
})

//회원 정보 수정
router.put('/', function(req, res, next) {
  const { name, id, pwd, idx}  = req.body
  const user = {name:name, id:id, pwd:pwd}
  fs.readFile('database.json', 'utf8', (err,data) => {
    let originDb = JSON.parse(data)
    originDb.users[idx] = user
    let newDb=JSON.stringify(originDb)
    fs.writeFile('database.json', newDb, 'utf8', (err) => {
      res.status(201).json({result: true, list: newDb})
    })
  })
})

//회원 탈퇴
router.delete('/', function(req, res, next) {
  const {idx} = req.body
  fs.readFile('database.json', 'utf8', (err, data) => {
    let originDb = JSON.parse(data)
    delete originDb.users[idx]
    originDb.users = originDb.users.filter(x=>x!=null)
    let newDb = JSON.stringify(originDb)
    fs.writeFile('database.json', newDb, 'utf8', (err) => {
      res.status(201).json({result: true, list: newDb})
    })
  })
})

//회원 확인
router.get('/', function(req, res, next) {
  fs.readFile('database.json', 'utf8', (err, data) => {
    let Db = JSON.parse(data)
    res.status(200).json({result: true, list: Db.users})
  })
});

module.exports = router;
