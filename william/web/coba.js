// Untuk membaca file
var fs = require('fs');

// Membaca stop words dari file
var stopWords = fs.readFileSync("C:/Users/USER/Desktop/STBI/web/assets/Stopwords/stop-words-english-complete.txt", "utf8");

var file = fs.readFileSync("C:/Users/USER/Desktop/Indosat.txt", "utf8");

// Untuk melakukan stemming (menggunakan library natural --> "npm install natural")
var natural = require('natural'),  
    stemmer = natural.PorterStemmer;  

stemmer.attach(); // Membuat string menjadi array of string, masing-masing satu untuk setiap kata dan masing-masing di stem
	
var fileStemmed = stemmer.tokenizeAndStem(file);

console.log(fileStemmed);

// var http = require("http");

// http.createServer(function (request, response) {

   // // Send the HTTP header 
   // // HTTP Status: 200 : OK
   // // Content Type: text/plain
   // response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // // Send the response body as "Hello World"
   // response.end('Hello World/n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');
