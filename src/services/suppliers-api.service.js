import http from './http-common';

export class SuppliersApiService {
    getAll() {
        return http.get('/suppliers');
    }

    getById(id) {
        return http.get(`/suppliers/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/suppliers', data);
    }

    update(id, data) {
        return http.put(`/suppliers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/suppliers/${id}`);
    }
    findByRUC(ruc){
        return http.get('/suppliers?ruc=${ruc}');
    }
}
