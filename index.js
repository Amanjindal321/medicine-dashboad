const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://127.0.0.1/next");
const Medlrr = require("../backend/models/medi");

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/search', async function (req, res) {
    try {
      let query = {}; // Default query to retrieve all data
      let searchQuery = '';
  
      // Check if there is a search query in the URL
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = { Medicine_Name: searchRegex };
        searchQuery = req.query.search;
      }
  
      const data = await Medi.find(query);
      res.render('search', { med: data, searchQuery });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.listen(3000, function () {
  console.log("Server is running...");
});
