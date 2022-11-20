import httpCommon from "@/shared/services/http-common";

export class UsersApiService {
  getUsers() {
    console.log("GET USERS");
    return httpCommon.get("/users");
  }

  signIn(user) {
    return httpCommon.post("/users/sign-in", user);
  }

  postUser(data) {
    return httpCommon.post("/users", data);
  }
}
