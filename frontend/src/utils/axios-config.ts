// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://expense-tracker-ass.up.railway.app/api',
//   withCredentials: true 
// });

// // Add request interceptor to add token from localStorage
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add response interceptor to handle 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Clear token and redirect to login
//       localStorage.removeItem('token');
//       // redirect to login page or show login modal
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expense-tracker-ass.up.railway.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Ensure CORS headers are respected
    config.headers['Access-Control-Allow-Origin'] = 'https://expense-tracker-orcin-five.vercel.app';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;