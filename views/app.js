const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1216',
  database: 'webpage'
})
connection.connect((err) => {
  if (err) {
    console.error("mysql연결 실패:" + err.stack)
    return;
  }
  console.log("mysql 연결 성공")
})



app.set('view engine', 'ejs')
app.set('viws', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
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

  let sql = `insert into contact(name,phone,email, memo,regdate) values('${name}', '${phone}', '${email}','${memo}',now() )`

  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log("자료 한개를 삽입하였습니다")
    res.send("<script>alert('문의사항이 등록되었습니다'); location.href='/'</script>");
  })
})

app.get('/contactList', (req, res) => {
  let sql = `select * from contact`
  connection.query(sql, function (err, results, fields) {
    if (err) throw err;
    res.render('contactList', { lists: results })
  })

})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})