const fs = require('fs')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')

const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))
const bcrypt = require('bcrypt')
const db = require('../pg')

const app = express()

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await db.query(`
      select * from users where username = '${username}';
    `).then(res => res.rows[0])
    
    const allowed = await bcrypt.compare(password, user.hashed_password)

    if (!allowed) { 
      return res.status(401).end() 
    }

    const refreshToken = await jwt.signAsync({user.id}, 'secret', { expiresIn: '7d' })
    const accessToken = await jwt.signAsync({user.id}, 'secret', { expiresIn: '15m' })

    return res.send({accessToken, refreshToken})

  } catch (err) {
    return res.status(500).send(err.message)
  }
})

app.post('/posts', protectedRoute, async (req, res) => {
  try {
    const post = await db.query(`
      insert into posts(
        user_id, url
      ) value (
        '${req.user.id}' ${req.body.url}'
      )
      return *;
    `).then(res => res.rows[0])
    
    const allowed = await bcrypt.compare(password, user.hashed_password)

    if (!allowed) { 
      return res.status(401).end() 
    }

    const refreshToken = await jwt.signAsync({user.id}, 'secret', { expiresIn: '7d' })
    const accessToken = await jwt.signAsync({user.id}, 'secret', { expiresIn: '15m' })

    return res.send({accessToken, refreshToken})

  } catch (err) {
    return res.status(500).send(err.message)
  }
  
})

app.get('/posts', protectedRoute, async (req, res) => {
  
})

function protectedRoute (req, res, next) {
  const {accessToken, refreshToken} = req.body

  req.user = {
    id: 1,
    username: 'kareniel'
  }

  return next()
}

const options = {
  key: fs.readFileSync('./.ssl/server.key'),
  cert: fs.readFileSync('./.ssl/server.crt')
}

https.createServer(options, app).listen(7111)

console.log('listening on 7111')