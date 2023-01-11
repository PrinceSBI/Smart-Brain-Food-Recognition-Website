const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//   // connect to your own database here:
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'aneagoie',
//     password : '',
//     database : 'smart-brain'
//   }
// });

const db = {
  users: [
    {
      id: '1',
      name: 'Shreyas G S',
      email: 'paranjyothi.1998@gmail.com',
      password: 'abcd',
      entries: 0,
      joined: new Date()
    }
  ]
  // login: [
  //   {
  //     id: '1',
  //     hash: hasher('abcd'),
  //     email: 'paranjyothi.1998@gmail.com'
  //   }
  // ]
}

// let hasher = ((pass) => {
//   bcrypt.hash(pass, null, null, function(err, hash) {
//      hash
//   })
// }) 

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

// // app.get('/', (req, res)=> { res.send(db.users) })
// app.get('/', (req, res)=> { res.send(db.users) })
// // app.post('/signin', signin.handleSignin(db, bcrypt))
// app.post('/signin', (req, res) => {
//   // bcrypt.compare(password, db.login.password, function(err, res) {
//   //   //res === true
//   //   //res === false
//   // })
//   db.users.forEach((user) => {
//     if ((req.body.email === user.email) && (req.body.password === user.password)) {
//       // res.json('success')
//       res.json(user)
//     }
//   })
//   res.status(400).json('error logging in');
//   // if ((req.body.email === db.users[0].email) && (req.body.password === db.users[0].password)) {
//   //   res.json('success')
//   // } else {
//   //   res.status(400).json('error logging in');
//   // }
// })
// // app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// app.post('/register', (req, res) => {
//   const { email, name, password } = req.body;
//   let ID =  db.users.length+1
//   // bcrypt.hash(password, null, null, function(err, hash) {
//   // db.login.push(
//   //   {
//   //     id: ID,
//   //     hash: bcrypt.hash("abcd", null, null, function(err, hash) {
//   //       return hash
//   //     }),
//   //     email: 'paranjyothi.1998@gmail.com'
//   //   }
//   // )
//   // })
//    db.users.push(
//     {
//       id: ID,
//       name: name,
//       email: email,
//       password: password,
//       entries: 0,
//       joined: new Date()
//     }) 
//     res.json(db.users[db.users.length-1])
//   })
// // app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     db.users.forEach(user => {
//       if (user.id === id) {
//         res.json(user);
//       }
//     })
//     res.status(404).json('User does not exist')
//   })
// // app.put('/image', (req, res) => { image.handleImage(req, res, db)})
// app.put('/image', (req, res) => { 
//   const { id } = req.body;
//   let found = false;
//   db.users.forEach(user => {
//     if (user.id === id) {
//       found = true;
//       user.entries++
//       res.json(user.entries)
//     }
//   })
//   if (found === false) {
//     res.status(400).json('User not found')
//   }
// })
// // app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db))
app.post('/register', (req, res) => { register.handleRegister(req, res, db) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})