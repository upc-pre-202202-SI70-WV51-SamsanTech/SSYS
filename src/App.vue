<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>

  <div>
    <div v-if="userData"
         class="w-full flex justify-content-between px-4 align-items-center bg-black-alpha-90 fixed z-5">
      <div class="flex align-items-center">
        <i @click="setOpen" class="pi pi-bars p-toolbar-separator mx-2 cursor-pointer"/>
        <img src="./assets/img/logo-color.png" alt="logo" class="w-3rem">
      </div>
      <div class="flex align-items-center">
        <div class="border-circle bg-white w-2rem text-center text-gray-900 mr-2"><h3>JD</h3></div>
        <span class="hidden md:block">John Doe</span>
      </div>
    </div>

    <div class="py-6">
      <div v-if="userData && open" class="flex flex-column fixed z-1 w-full bg-black-alpha-50 h-screen">
        <div class="h-screen flex flex-column w-16rem bg-black-alpha-80 row-gap-4 pt-4 pl-4">
          <span>GENERAL</span>
          <RouterLink @click="setOpen" to="/" class="mx-4 hover:bg-gray-400">Dashboard</RouterLink>
          <RouterLink @click="setOpen" to="/orders" class="mx-4 hover:bg-gray-400">Orders</RouterLink>
          <span>MANAGEMENT</span>
          <RouterLink @click="setOpen" to="/workers" class="mx-4 hover:bg-gray-400">Workers</RouterLink>
          <RouterLink @click="setOpen" to="/customers" class="mx-4 hover:bg-gray-400">Customers</RouterLink>
          <RouterLink @click="setOpen" to="/suppliers" class="mx-4 hover:bg-gray-400">Suppliers</RouterLink>
          <RouterLink @click="setOpen" to="/products" class="mx-4 hover:bg-gray-400">Products</RouterLink>
          <p @click="logOut" class="cursor-pointer hover:bg-gray-400 text-white px-2 mr-2">Log out</p>
        </div>
      </div>

      <div class="pt-2 px-2">
        <router-view/>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "app.component",
  data() {
    return {
      userData: [],
      open: false
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    console.log(this.userData)
  },
  methods: {
    logOut() {
      localStorage.removeItem("userData")
      window.location.reload()
    },
    setOpen() {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
</style>
