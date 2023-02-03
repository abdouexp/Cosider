var express = require('express');
const mysql = require('mysql');

// Init App
var app = express();









// //MySQL
// const pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : '',
//   database        : 'pfe'
// })

// // Get all beers
// app.get('', (req, res) => {
//   pool.getConnection((err, connection) => {
//       if(err) throw err
//       console.log('connected as id ' + connection.threadId)
//       connection.query('SELECT * from beers', (err, rows) => {
//           connection.release() // return the connection to pool

//           if (!err) {
//               res.send(rows)
//           } else {
//               console.log(err)
//           }

//           // if(err) throw err
//           console.log('The data from beer table are: \n', rows)
//       })
//   })
// })

// // Get a beer by ID
// app.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//       if(err) throw err
//       console.log('connected as id ' + connection.threadId)
//       connection.query('SELECT * from beers WHERE id = ?', [req.params.id], (err, rows) => {
//           connection.release() // return the connection to pool

//           if (!err) {
//               res.send(rows)
//           } else {
//               console.log(err)
//           }

//           // if(err) throw err
//           console.log('The data from beer table are: \n', rows)
//       })
//   })
// })

// // Delete a beer
// app.delete('/:id', (req, res) => {

//   pool.getConnection((err, connection) => {
//       if(err) throw err
//       connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
//           connection.release() // return the connection to pool
//           if (!err) {
//               res.send(`Beer with the record ID ${[req.params.id]} has been removed.`)
//           } else {
//               console.log(err)
//           }
          
//           console.log('The data from beer table are: \n', rows)
//       })
//   })
// });

// // Add beer
// app.post('', (req, res) => {

//   pool.getConnection((err, connection) => {
//       if(err) throw err
      
//       const params = req.body
//       connection.query('INSERT INTO beers SET ?', params, (err, rows) => {
//       connection.release() // return the connection to pool
//       if (!err) {
//           res.send(`Beer with the record ID  has been added.`)
//       } else {
//           console.log(err)
//       }
      
//       console.log('The data from beer table are:11 \n', rows)

//       })
//   })
// });

// // update
// app.put('', (req, res) => {

//   pool.getConnection((err, connection) => {
//       if(err) throw err
//       console.log(`connected as id ${connection.threadId}`)

//       const { id, name, tagline, description, image } = req.body

//       connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
//           connection.release() // return the connection to pool

//           if(!err) {
//               res.send(`Beer with the name: ${name} has been added.`)
//           } else {
//               console.log(err)
//           }

//       })

//       console.log(req.body)
//   })
// })
