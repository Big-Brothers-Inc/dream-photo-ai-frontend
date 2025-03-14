import axios from 'axios';

// Базовый URL для API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://dream-photo-ai-api.example.com';
// Для разработки можно использовать локальный URL
// const API_BASE_URL = process.env.NODE_ENV === 'development' 
//   ? 'http://localhost:5000' 
//   : (process.env.REACT_APP_API_URL || 'https://dream-photo-ai-api.example.com');

// Получаем Telegram Web App данные
const getTelegramData = () => {
  if (!window.Telegram || !window.Telegram.WebApp) {
    throw new Error('Telegram WebApp не инициализирован');
  }
  
  const webApp = window.Telegram.WebApp;
  const initData = webApp.initData;
  
  return {
    initData,
    user: webApp.initDataUnsafe?.user
  };
};

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавляем перехватчик запросов для добавления Telegram данных
api.interceptors.request.use(config => {
  try {
    const { initData } = getTelegramData();
    config.headers['X-Telegram-Init-Data'] = initData;
    return config;
  } catch (error) {
    console.error('Ошибка при добавлении Telegram данных:', error);
    return config;
  }
});

// Получение списка моделей пользователя
export const getUserModels = async () => {
  try {
    const response = await api.get('/api/models');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении моделей:', error);
    throw error;
  }
};

// Получение баланса пользователя
export const getUserBalance = async () => {
  try {
    const response = await api.get('/api/user/balance');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении баланса:', error);
    throw error;
  }
};

// Генерация изображения
export const generateImage = async (modelId, prompt, numOutputs = 1) => {
  try {
    const response = await api.post('/api/generate', {
      model_id: modelId,
      prompt,
      num_outputs: numOutputs
    });
    return response.data.images;
  } catch (error) {
    console.error('Ошибка при генерации изображения:', error);
    throw error;
  }
};

export default api; 