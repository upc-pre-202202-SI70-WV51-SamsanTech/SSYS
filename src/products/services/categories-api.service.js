import http from '../../shared/services/http-common';

export class CategoriesApiService {
    getAll() {
        return http.get('/categories');
    }

    getById(id) {
        return http.get(`/categories/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/categories', data);
    }

    update(id, data) {
        return http.put(`/categories/${id}`, data);
    }

    delete(id) {
        return http.delete(`/categories/${id}`);
    }

}