<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="top-bar">
    <img src="./assets/img/logo-color.png" alt="logo">
    <div class="profile">
      <div id="photo-user"><h1>J</h1></div>
      <span>John Doe</span>
    </div>
  </div>
  <div class="navbar">
    <div class="navbar-links">
      <span>GENERAL</span>
      <RouterLink to="/"><p>Dashboard</p></RouterLink>
      <RouterLink to="/orders"><p>Orders</p></RouterLink>
      <span>MANAGEMENT</span>
      <RouterLink to="/workers">Workers</RouterLink>
      <RouterLink to="/" >Customers</RouterLink>
      <RouterLink to="/" >Suppliers</RouterLink>
      <RouterLink to="/" >Products</RouterLink>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>

.top-bar {
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#photo-user {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
  color: black;
}

#photo-user h1 {
  font-size: 30px;
  text-align: center;
  justify-content: center;
}

.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
}

.navbar {
  width:100%;
  display: flex;
  flex-direction: row;
}

.navbar-links {
  width: 150px;
  height: 90.7vh;
  padding: 20px;
  background-color: #5E17EB ;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.main {
  padding: 30px;
  width: 100%;
}

img {
    width: 70px;
  }
</style>
