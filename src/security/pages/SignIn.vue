<template>
  <div class="w-full flex flex-column mt-8">
  <div class="flex flex-column w-22rem mx-auto row-gap-2">

    <div class="w-fit mx-auto mb-4">
      <h1>Sign in</h1>
    </div>

    <div class="">
      <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
        <pv-input-text v-model="username" placeholder="Username" />
      </div>
    </div>

    <div class="">
      <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-eye-slash"></i>
                    </span>
        <pv-password v-model="password" toggleMask></pv-password>
      </div>
    </div>

    <div class="mx-auto mt-4">
      <pv-button @click="onSubmit" label="Sign In"></pv-button>
    </div>

    <div @click="closeMessage" v-if="error">
      <pv-message severity="error">{{error}}</pv-message>
    </div>

    <div>
      <a>No tienes cuenta ? registrate haciendo click aqui !</a>
    </div>

  </div>
  </div>
</template>

<script>
import {ref} from "vue";
import { UsersApiService } from "@/security/services/users-api.service";

export default {
  name: "SignIn",
  setup() {
    const username = ref();
    const password = ref();
    return { username, password }
  },
  data() {
    return {
      error: "",
      userData: "",
      usersService: null,
      loading: false
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    console.log(this.userData)
  },
  methods: {
    async onSubmit() {
      this.loading = true

      if (!this.username || !this.password) {
        this.error = "Incomplete Data"
      } else {
        //console.log("SIGN_IN_DATA: ", this.username, this.password)

        this.usersService = new UsersApiService()

        await this.usersService.getUsers()
            .then((res) => {
              console.log(res.data)
              res.data.forEach((element) => {
                //console.log(element.username === this.username)
                //console.log(element.password === this.password)
                if (element.username === this.username && element.password === this.password) {
                  this.userData = element
                  localStorage.setItem("userData", JSON.stringify(this.userData))
                  window.location.reload()
                  return
                }
              })
              if (!this.userData) this.error = "Password or username incorrect"
            })
            .catch((err) => {
              console.log(err)
            })
      }

      this.loading = false
    },
    closeMessage() {
      this.error = ""
    }
  }
}
</script>

<style scoped>

</style>