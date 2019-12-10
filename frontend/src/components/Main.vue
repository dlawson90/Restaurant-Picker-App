<template>
  <div class="wrapper">
    <h1>Food App</h1>

    <h2>Chosen Restaurant</h2>

    <input type="text" v-model="newRestaurant" />
    <button @click="addRestaurant">Add New</button>

    <table>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <td>{{ restaurant.name }}</td>
        <td>
          <button>Delete</button>
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
      newRestaurant: ""
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
      this.restaurants.push(restaurant);
      axios
        .post("http://localhost:3000/restaurants/new", restaurant)
        .catch(error => {
          this.errors.push(error);
        });
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
