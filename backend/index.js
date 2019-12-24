const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb://dan:qwerty123@ds129625.mlab.com:29625/restaurant-picker",
  { useNewUrlParser: true }
);

var restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String
});

var Restaurant = mongoose.model("Restaurant", restaurantSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.listen(port, function () {
  console.log("Server Listening: " + port);
});
