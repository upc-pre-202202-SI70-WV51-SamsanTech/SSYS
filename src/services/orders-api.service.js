import http from './http-common';

export class OrdersApiService {
    getAll() {
        return http.get('/orders');
    }

    getById(id) {
        return http.get(`/orders/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/orders', data);
    }

    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }

    delete(id) {
        return http.delete(`/orders/${id}`);
    }

    findByTitle(title) {
        return http.get(`/orders?title=${title}`);
    }
}
