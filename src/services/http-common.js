import axios from 'axios';

export default axios.create({
   baseURL: 'https://633515e4ea0de5318a0c8d92.mockapi.io/api/v1/',
   headers: { 'Content-type': 'application/json' }
});
