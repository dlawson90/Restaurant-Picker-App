const express = require("express");
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(
  config.database.url,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String
});

var Restaurant = mongoose.model("Restaurant", restaurantSchema);

app.get("/restaurants", (req, res) => {
  Restaurant.find({}, (error, restaurants) => {
    if (error) {
      console.log(error);
    } else {
      res.send(restaurants);
    }
  });
});

app.post("/restaurants/new", (req, res) => {
  let data = {
    name: req.body.name
  };

  let restaurant = new Restaurant(data);

  restaurant.save(error => {
    if (error) {
      console.log(error);
    } else {
      res.json('Restaurant added!');
    }
  });
});

app.delete('/restaurants/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.json('Restaurant deleted!');
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(config.server.port, function () {
  console.log("Server Listening: " + config.server.port);
});
