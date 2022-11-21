import httpCommon from "@/shared/services/http-common";

export class UsersApiService {
  getUsers() {
    console.log("GET USERS");
    return httpCommon.get("/users");
  }

  signIn(user) {
    return httpCommon.post("/users/sign-in", user);
  }

  signUp(user) {
    return httpCommon.post("/users/sign-up", user);
  }

  postUser(data) {
    return httpCommon.post("/users", data);
  }

  postUserProfile(data, userId) {
    return httpCommon.post(`/profiles/user/${userId}`, data);
  }
}
