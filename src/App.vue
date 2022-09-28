<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="navbar">
    <div class="navbar__links">
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/workers">Workers</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </div>

  <router-view/>
</template>

<style scoped>
/*navbar div class navbar*/
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

img {
    width: 70px;
  }
</style>
