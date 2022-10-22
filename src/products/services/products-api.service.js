import http from '../../shared/services/http-common';

export class ProductsApiService {
    getAll() {
        return http.get('/products');
    }

    getById(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/products', data);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

}