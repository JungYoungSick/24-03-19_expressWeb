const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000;


app.set('view engine', 'ejs')
app.set('viws', './views')

// 라우팅
app.get('/', (req, res) => {
  res.render('index') // ./views/index.ejs
})

app.get('/profile', (req, res) => {
  res.render('profile') // ./views/index.ejs
})

app.get('/map', (req, res) => {
  res.render('map')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/contactProc', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  let a = ` ${name} ${phone} ${email} ${memo}`

  res.send(a);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})