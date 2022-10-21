import httpCommon from "@/shared/services/http-common";

export class UsersApiService {
    getUsers() {
        console.log("GET USERS")
        return httpCommon.get('/users')
    }

    postUser(data) {
        return httpCommon.post('/users', data)
    }
}