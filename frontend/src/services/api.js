import axios from 'axios';

const API_BASE_URL = '/api';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Добавляем интерцептор для автоматической отправки токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок авторизации
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен недействителен, очищаем localStorage и перенаправляем на логин
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API функции для работы с постами
export const postsAPI = {
  // Получить все посты
  getAllPosts: () => api.get('/posts/'),
  
  // Получить посты пользователя
  getUserPosts: () => api.get('/posts/my/'),
  
  // Создать новый пост
  createPost: (postData) => api.post('/posts/', postData),
  
  // Получить конкретный пост
  getPost: (id) => api.get(`/posts/${id}/`),
  
  // Обновить пост
  updatePost: (id, postData) => api.put(`/posts/${id}/`, postData),
  
  // Удалить пост
  deletePost: (id) => api.delete(`/posts/${id}/`),
};

export default api; 