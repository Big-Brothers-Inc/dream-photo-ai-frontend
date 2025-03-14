FROM node:16-alpine as build

WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Вторая стадия сборки - nginx для раздачи статического контента
FROM nginx:alpine

# Копирование собранного приложения из первой стадии
COPY --from=build /app/build /usr/share/nginx/html

# Копирование nginx конфигурации
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонирование порта
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"] 