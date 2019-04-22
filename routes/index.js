const express = require('express');
const path    = require('path');

const mysql      = require('mysql');
const router = require('express').Router();





//Db connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jose',
  password : '12345Seis',
  database : 'test'
});

//Check if db is connected it will return connection ID

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as ID => ' + connection.threadId);
});

router.get('/',(req, res)=>{
  
    res.render('index', {
      title:"MI APP"
    });
  });
 


router.get('/show',(req, res)=>{
connection.query('SELECT * FROM customer', (err, customers) => {
  if (err) {
   res.json(err);
  }
  res.render('show', {
     data: customers
  });
});
});

router.get('/datos',(req, res)=>{
  connection.query('SELECT * FROM customer', (err, customers) => {
    if (err) {
     res.json(err);
    }
    res.render('datos', {
       data: customers
    });
  });
  });



  router.post('/datos',(req, res) => {

    var userData ={ name:req.body.name, address : req.body.address,phone: req.body.phone};
    
    connection.query('INSERT INTO customer SET ?', userData, function (error, results, fields) {
      if (error) throw error;
        res.redirect('/show');
    });
  })


router.post('/buscar',(req, res) => {
  console.log('hola')
  //var name =req.body.name;
  var name=req.body.name;
  console.log(name);
  connection.query('SELECT * FROM customer WHERE name like ?','%' + name + '%',
  function (error, results, fields) {
    if (error) return console.log(error)
    res.render('show.ejs', { data: results })
  })
})


router.get('/edit/:id',(req, res) => {
  var id = req.params.id

  connection.query('SELECT * FROM customer WHERE id = '+id+'', function (error, results, fields) {
    if (error) return res.send(error)
    res.render('edit.ejs', { data: results })
  })
})
router.post('/edit/:id',(req, res) => {
  var id = req.params.id
  var name = req.body.name
  var address = req.body.address
  var phone = req.body.phone

  query = connection.query('UPDATE customer SET name = ?, address = ?, phone = ? WHERE id = ?', 
  [name, address,phone,id],
   function (error, results, fields) {   
    if (error) return res.send(error)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})


router.get('/delete/:id',(req, res) => {
  var id = req.params.id

  query = connection.query('DELETE FROM customer WHERE id = '+id+'', 
  function (error, results, fields) {    if (error) return res.send(500, error)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})




module.exports =router;