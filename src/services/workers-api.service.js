import http from './http-common';

export class TutorialsApiService {
    getAll() {
        return http.get('/workers');
    }

    getById(id) {
        return http.get(`/workers/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post('/workers', data);
    }

    update(id, data) {
        return http.put(`/workers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/workers/${id}`);
    }

    findByTitle(title) {
        return http.get(`/workers?title=${title}`);
    }
}
