<template>
  <div class="wrapper">
    <h1>Food App</h1>

    <h2>Chosen Restaurant</h2>

    <button>Add New</button>

    <table>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <td>{{restaurant.name}}</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      restaurants: [
        {
          id: 1,
          name: "Burger King"
        },
        {
          id: 2,
          name: "KFC"
        },
        {
          id: 3,
          name: "McDonalds"
        }
      ]
    };
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
