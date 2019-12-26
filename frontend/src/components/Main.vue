<template>
  <div class="wrapper">
    <h1>Regit Restaurant Picker</h1>

    <hr />

    <div class="ui error message" v-if="errors.length > 0">
      <i class="close icon" @click="clearErrors"></i>
      <div class="header">Errors</div>
      <ul class="list">
        <li v-for="(error, index) in errors" :key="index">{{error}}</li>
      </ul>
    </div>

    <div class="picker">
      <h2 class="chosen">{{chosenRestaurant.name}}</h2>
      <button class="ui purple button" @click="chooseRestaurant">Choose Restaurant</button>
    </div>

    <div class="add-form">
      <div class="ui input">
        <input class="add-input" type="text" v-model="newRestaurant" placeholder="restaurant name" />
      </div>
      <button @click="addRestaurant" class="ui green button add-button">Add</button>
    </div>

    <div class="restaurant-table">
      <table class="ui celled table">
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant._id">
            <td>{{ restaurant.name }}</td>
            <td style="text-align:center;">
              <button class="ui icon red button" @click.prevent="deleteRestaurant(restaurant)">
                <i class="trash alternate outline icon"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      restaurants: [],
      errors: [],
      newRestaurant: "",
      chosenRestaurant: {
        name: "---"
      }
    };
  },
  mounted() {
    this.getAllRestaurants();
  },
  methods: {
    getAllRestaurants() {
      axios
        .get("http://localhost:3000/restaurants")
        .then(response => {
          this.restaurants = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    addRestaurant() {
      let restaurant = {
        name: this.newRestaurant
      };

      if (this.newRestaurant === "") {
        this.errors.push("Name required");
      } else {
        axios
          .post("http://localhost:3000/restaurants/new", restaurant)
          .then(() => {
            this.restaurants.push(restaurant);
            this.newRestaurant = "";
            this.getAllRestaurants();
          })
          .catch(error => {
            this.errors.push(error);
          });
      }
    },
    deleteRestaurant(restaurant) {
      axios
        .delete("http://localhost:3000/restaurants/" + restaurant._id)
        .then(() => {
          this.restaurants.splice(this.restaurants.indexOf(restaurant), 1);
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    chooseRestaurant() {
      this.chosenRestaurant = this.restaurants[
        Math.floor(Math.random() * this.restaurants.length)
      ];
    },
    clearErrors() {
      this.errors = [];
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: white;
  width: 40%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 50px;
  border-radius: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

hr {
  height: 1px;
  border: none;
  border-bottom: 1px solid #ccc;
}

.picker {
  text-align: center;
}

.picker .chosen {
  margin: 30px;
  font-size: 50px;
  color: #0072ff;
  font-weight: 700;
}

.add-form {
  margin: 30px 0;
  text-align: center;
}

.add-input {
  height: 22px;
}

.add-button {
  margin-left: 20px;
}

.restaurant-table {
  margin-top: 30px;
}

.icon {
  margin: 0 auto;
}
</style>
