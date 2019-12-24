<template>
  <div class="wrapper">
    <h1>Food App</h1>

    <h2>{{chosenRestaurant.name}}</h2>
    <button class="button" @click="chooseRestaurant">Choose Restaurant</button>

    <br />

    <input type="text" v-model="newRestaurant" />
    <button @click="addRestaurant">Add New</button>

    <table>
      <tr v-for="restaurant in restaurants" :key="restaurant._id">
        <td>{{ restaurant.name }}</td>
        <td>
          <button @click.prevent="deleteRestaurant(restaurant)">Delete</button>
        </td>
      </tr>
    </table>
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
      chosenRestaurant: ""
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

      axios
        .post("http://localhost:3000/restaurants/new", restaurant)
        .then(() => {
          this.restaurants.push(restaurant);
        })
        .catch(error => {
          this.errors.push(error);
        });
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
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 50%;
  margin: 0 auto;
}
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}

table {
  width: 100%;
}

td {
  border: 1px solid red;
  padding: 10px;
}
</style>
