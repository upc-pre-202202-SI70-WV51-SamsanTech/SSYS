<template>
  <div class="w-full flex flex-column mt-8">
    <div class="flex flex-column w-22rem mx-auto row-gap-2">
      <div class="w-fit mx-auto mb-4">
        <h1>Sign Up</h1>
      </div>

      <div class="">
        <div>
          <pv-input-text v-model="name" placeholder="Name" class="w-full" />
        </div>
      </div>

      <div class="">
        <div>
          <pv-input-text
            v-model="lastName"
            placeholder="Last Name"
            class="w-full"
          />
        </div>
      </div>

      <div class="">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-google"></i>
          </span>
          <pv-input-text v-model="email" placeholder="Email" />
        </div>
      </div>

      <div class="">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-phone"></i>
          </span>
          <pv-input-text v-model="phone" placeholder="Phone" />
        </div>
      </div>

      <div class="">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <pv-input-text v-model="address" placeholder="Address" />
        </div>
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
          <pv-password
            v-model="password"
            toggleMask
            placeholder="Password"
          ></pv-password>
        </div>
      </div>

      <div class="">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-eye-slash"></i>
          </span>
          <pv-password
            v-model="rePassword"
            toggleMask
            placeholder="Type Again The Password"
          ></pv-password>
        </div>
      </div>

      <div class="mx-auto mt-4">
        <pv-button @click="onSubmit" label="Sign Up"></pv-button>
      </div>

      <div @click="closeMessage" v-if="error">
        <pv-message severity="error" :life="1500" :sticky="false">{{
          error
        }}</pv-message>
      </div>

      <div @click="closeMessage" v-if="message">
        <pv-message severity="success" :life="1500" :sticky="false">{{
          message
        }}</pv-message>
      </div>

      <div>
        <RouterLink to="/signIn">
          <a>Tienes una Cuenta ? ingresa haciendo click aqui !</a>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { UsersApiService } from "@/security/services/users-api.service";

export default {
  name: "SignUp",
  setup() {
    const username = ref();
    const password = ref();
    const rePassword = ref();
    const name = ref();
    const lastName = ref();
    const email = ref();
    const phone = ref();
    const address = ref();
    return {
      username,
      password,
      name,
      lastName,
      email,
      phone,
      address,
      rePassword,
    };
  },
  data() {
    return {
      error: "",
      userData: {},
      usersService: null,
      loading: false,
      message: "",
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData) this.$router.push({ name: "dashboard" });
  },
  methods: {
    async onSubmit() {
      this.loading = true;

      if (
        !this.username ||
        !this.password ||
        !this.name ||
        !this.lastName ||
        !this.email ||
        !this.phone ||
        !this.address ||
        !this.rePassword
      ) {
        this.error = "Incomplete Data";
      } else {
        const user = {
          username: this.username,
          password: this.password,
          email: this.email,
        };

        const profile = {
          firstName: this.name,
          lastName: this.lastName,
          phoneNumber: this.phone,
          address: this.address,
        };

        this.usersService = new UsersApiService();

        /*this.usersService
          .postUser(data)
          .then((res) => {
            this.loading = false;
            this.message = "User was register successfully";
            this.$router.push({ name: "dashboard" });
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });*/
        let success = false;

        await this.usersService
          .signUp(user)
          .then((res) => {
            console.log(res);
            success = true;
          })
          .catch((err) => {
            console.log(err);
            this.error = err.response.data.message;
            this.loading = false;
          });

        if (success) {
          let userId;

          await this.usersService
            .signIn(user)
            .then((res) => {
              localStorage.setItem("token", JSON.stringify(res.data.token));
              userId = res.data.id;
            })
            .catch((err) => {
              this.error = err.response.data.message;
              this.loading = false;
            });

          await this.usersService
            .postUserProfile(profile, userId)
            .then((res) => {
              this.loading = false;
              this.message = "User was register successfully";
              this.$router.push({ name: "dashboard" });
            })
            .catch((err) => {
              this.error = err.response.data.message;
              console.log(err);
              this.loading = false;
            });
        }

        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
