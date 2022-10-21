import http from '../../shared/services/http-common';

export class CustomersApiService {
    getAll() {
        return http.get('/customers');
    }

    getById(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/customers', data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }

}