const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(JSON.stringify(books,null,4));
    },6000)})
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const isbn = req.params.isbn;
        res.send(books[isbn])
    },6000)})
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const author = req.params.author;
        const matchingBooks = [];
        for (const isbn in books) {
            const book = books[isbn];
            if (book.author === author) {
            matchingBooks.push(book);
            }
        }
        res.json(matchingBooks)
    },6000)})
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const title = req.params.title;
        const matchingBooks = [];
        for (const isbn in books) {
            const book = books[isbn];
            if (book.title === title) {
                matchingBooks.push(book);
            }
            }
        res.json(matchingBooks)
    },6000)})
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.isbn;
  const matchingBooks = [];
  for (const isbn in books) {
      const book = books[isbn];
      if (isbn === review) {
        matchingBooks.push(book.reviews);
      }
    }
  res.json(matchingBooks)
});

module.exports.general = public_users;
