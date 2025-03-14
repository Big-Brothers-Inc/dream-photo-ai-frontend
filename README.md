# Dream Photo AI Frontend

Фронтенд-часть приложения Dream Photo AI для генерации изображений с использованием моделей AI.

## Локальная разработка

1. Установите зависимости:
```
npm install
```

2. Запустите приложение в режиме разработки:
```
npm start
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

```
npm run build
```

Результат сборки будет находиться в папке `build`.

## Деплой на Netlify

### Ручной деплой

1. Установите Netlify CLI:
```
npm install -g netlify-cli
```

2. Войдите в свой аккаунт Netlify:
```
netlify login
```

3. Соберите проект:
```
npm run build
```

4. Деплой на Netlify:
```
netlify deploy --prod
```

### Автоматический деплой через GitHub

1. Создайте репозиторий на GitHub и загрузите в него код
2. Зарегистрируйтесь/войдите на [Netlify](https://www.netlify.com/)
3. Нажмите "New site from Git" и выберите GitHub
4. Выберите репозиторий и настройте параметры сборки:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Нажмите "Deploy site"

### Настройка переменных окружения

В настройках сайта на Netlify (Site settings > Build & deploy > Environment) добавьте переменные окружения:

- `REACT_APP_API_URL` - URL вашего API, например, `https://dream-photo-ai-api.example.com`

## Технологии

- React.js
- Telegram Web App API
- Axios для работы с API 