const handleSignin = (db) => (req, res) => {
  // bcrypt.compare(password, db.login.password, function(err, res) {
  //   //res === true
  //   //res === false
  // })
  db.users.forEach((user) => {
    if ((req.body.email === user.email) && (req.body.password === user.password)) {
      // res.json('success')
      res.json(user)
    }
  })
  res.status(400).json('error logging in');
  // if ((req.body.email === db.users[0].email) && (req.body.password === db.users[0].password)) {
  //   res.json('success')
  // } else {
  //   res.status(400).json('error logging in');
  // }
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json('incorrect form submission');
  // }
  // db.select('email', 'hash').from('login')
  //   .where('email', '=', email)
  //   .then(data => {
  //     const isValid = bcrypt.compareSync(password, data[0].hash);
  //     if (isValid) {
  //       return db.select('*').from('users')
  //         .where('email', '=', email)
  //         .then(user => {
  //           res.json(user[0])
  //         })
  //         .catch(err => res.status(400).json('unable to get user'))
  //     } else {
  //       res.status(400).json('wrong credentials')
  //     }
  //   })
  //   .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handleSignin: handleSignin
}
