import httpCommon from "@/shared/services/http-common";

export class UsersApiService {
    getUsers() {
        console.log("GET USERS")
        return httpCommon.get('/users')
    }
}