import http from '../../shared/services/http-common';

export class WorkersApiService {
    getAll() {
        return http.get('/employees');
    }

    getById(id) {
        return http.get(`/employees/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/employees', data);
    }

    update(id, data) {
        return http.put(`/employees/${id}`, data);
    }

    delete(id) {
        return http.delete(`/employees/${id}`);
    }
}
