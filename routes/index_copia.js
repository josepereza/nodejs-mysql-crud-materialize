const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://localhost:27017/crud-nodejs";

MongoClient.connect(uri, { useNewUrlParser: true } , (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs') // coloque o nome do seu DB
  
    
  })


router.get('/', (req, res) =>{
    res.render('index', {title: 'MI APP'});


})


router.get('/contact', (req, res) =>{
    res.render('contact',{title: 'MI CONTACT-APP'});


})




router.get('/datos',function(req, res) {
  const cursor = db.collection('data').find()
  res.render('datos.ejs')
})

router.post('/datos',(req, res) => {
  db.collection('data').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvado  Banco de Dados')
    res.redirect('/show')
  })
})


router.get('/show',(req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
  })
})


router.get('/edit/:id',(req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
router.post('/edit/:id',(req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})


router.get('/delete/:id',(req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})




module.exports =router;