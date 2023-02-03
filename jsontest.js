var express = require('express');
const mysql = require('mysql');

// Init App
var app = express();

// Home Route
// app.get('/', function(rep, res){
//   res.send('Hello World');
// });





// // important
// var fs = require('fs');



// var data = fs.readFileSync('words.json');
// var words = JSON.parse(data);
// console.log(words);







// // Our "database" (in addition to what is in the AFINN-111 list)
// // is "additional.json", check first to see if it exists
// var words;
// var exists = fs.existsSync('words.json');
// if (exists) {
//   // Read the file
//   console.log('loading words words');
//   var txt = fs.readFileSync('words.json', 'utf8');
//   // Parse it  back to object
//   words = JSON.parse(txt);
// } else {
//   // Otherwise start with blank list
//   console.log('No words words');
//   words = {};
// }




// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});




// // A route for adding a new word with a score
// app.get('/add/:word/:score', addWord);

// // Handle that route
// function addWord(req, res) {
//   // Word and score
//   var word = req.params.word;
//   // Make sure it's not a string by accident
//   var score = Number(req.params.score);

//   // Put it in the object
//   words[word] = score;

//   // Let the request know it's all set
//   var reply = {
//     status: 'success',
//     word: word,
//     score: score
//   }
//   console.log('adding: ' + JSON.stringify(reply));

//   // Write a file each time we get a new word
//   // This is kind of silly but it works
//   var json = JSON.stringify(words, null, 2);
//   fs.writeFile('words.json', json, 'utf8', finished);
//   function finished(err) {
//     console.log('Finished writing words.json');
//     // Don't send anything back until everything is done
//     res.send(reply);
//   }
// }




// var data = fs.readFileSync('words.json');
// var words = JSON.parse(data);
// console.log(words);



