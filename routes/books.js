const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
// const mongodb = require('mongodb');
// const db = require('../connection');

// const collection = db.collection('books');
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const Book = require('../models/books');
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });

  }
})

router.get('/:title', async (req, res) => {
  try {
    const book = await Book.findOne({title:req.params.title})
    res.json(book)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
})
router.get('/genres/:genres', async (req, res) => {
  try {
    const book = await Book.findOne({genres:req.params.genres})
    res.json(book)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
})


router.post('/', async (req, res) => {
  try {
    const newBook = req.body;
    const result = await Book.create(newBook);
    res.send(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

})

router.delete('/:title', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({title:req.params.title});
    res.json({ message: "Book is successfully deleted" });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });

  }

})

router.patch('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Error updating book" });
  }

})


router.put('/:title', async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      {title:req.params.title},      
      req.body,           
      { new: true }       
    );
    res.json({ message: "Book updated successfully", data: updatedBook });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Error updating book" });
  }
});








module.exports = router;

