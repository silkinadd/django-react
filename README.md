# Django + React Блог

Полнофункциональное веб-приложение для ведения блога, созданное с использованием Django REST Framework в качестве backend и React в качестве frontend.

## Функциональность

- ✅ Авторизация и регистрация пользователей
- ✅ JWT аутентификация
- ✅ Личный кабинет со списком постов
- ✅ Создание новых постов
- ✅ Редактирование собственных постов
- ✅ Удаление собственных постов
- ✅ Просмотр всех постов
- ✅ Адаптивный дизайн
- ✅ Выход из системы

## Технологии

**Backend:**
- Django 4.2.7
- Django REST Framework 3.14.0
- JWT Authentication (djangorestframework-simplejwt)
- CORS headers (django-cors-headers)
- SQLite база данных

**Frontend:**
- React 18.2.0
- React Router DOM 6.3.0
- Axios для HTTP запросов
- CSS3 для стилизации

## Установка и запуск

### Предварительные требования

- Python 3.8+
- Node.js 14+
- npm или yarn

### Backend (Django)

1. **Установите зависимости Python:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Выполните миграции базы данных:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Создайте суперпользователя (опционально):**
   ```bash
   python manage.py createsuperuser
   ```

4. **Запустите Django сервер:**
   ```bash
   python manage.py runserver
   ```

   Django сервер будет доступен по адресу: http://localhost:8000

### Frontend (React)

1. **Перейдите в папку frontend:**
   ```bash
   cd frontend
   ```

2. **Установите зависимости Node.js:**
   ```bash
   npm install
   ```

3. **Запустите React приложение:**
   ```bash
   npm start
   ```

   React приложение будет доступно по адресу: http://localhost:3000

## Использование

1. **Регистрация:** Откройте http://localhost:3000 и перейдите к форме регистрации
2. **Авторизация:** Войдите в систему с созданными учетными данными
3. **Личный кабинет:** Просматривайте все посты и управляйте своими
4. **Создание постов:** Нажмите "Добавить пост" для создания нового поста
5. **Редактирование:** Нажмите "Редактировать" на своем посте для изменения
6. **Удаление:** Нажмите "Удалить" для удаления своего поста
7. **Выход:** Нажмите "Выйти" в правом верхнем углу

## API Endpoints

### Авторизация
- `POST /api/auth/register/` - Регистрация нового пользователя
- `POST /api/auth/login/` - Вход в систему
- `GET /api/auth/profile/` - Получение профиля пользователя

### Посты
- `GET /api/posts/` - Получить все посты
- `POST /api/posts/` - Создать новый пост
- `GET /api/posts/{id}/` - Получить конкретный пост
- `PUT /api/posts/{id}/` - Обновить пост
- `DELETE /api/posts/{id}/` - Удалить пост
- `GET /api/posts/my/` - Получить посты текущего пользователя

## Структура проекта

```
django-react-blog/
├── blog/                 # Django приложение
│   ├── models.py        # Модели данных
│   ├── views.py         # API представления
│   ├── serializers.py   # DRF сериализаторы
│   ├── urls.py          # URL маршруты
│   └── admin.py         # Админ панель
├── django_project/      # Настройки Django
│   ├── settings.py      # Конфигурация
│   ├── urls.py          # Главные URL
│   └── wsgi.py          # WSGI конфигурация
├── frontend/            # React приложение
│   ├── public/          # Статические файлы
│   ├── src/
│   │   ├── components/  # React компоненты
│   │   ├── contexts/    # React контексты
│   │   ├── services/    # API сервисы
│   │   ├── App.js       # Главный компонент
│   │   └── index.js     # Точка входа
│   └── package.json     # Зависимости Node.js
├── requirements.txt     # Зависимости Python
├── manage.py           # Django управление
└── README.md           # Этот файл
```

## Безопасность

- JWT токены для аутентификации
- CORS настроен для разработки
- Валидация данных на backend
- Защита от несанкционированного доступа к чужим постам

## Разработка

### Запуск тестов

```bash
# Django тесты
python manage.py test

# React тесты
cd frontend
npm test
```

### Сборка для продакшн

```bash
cd frontend
npm run build
```

## Возможные улучшения

- Пагинация постов
- Поиск по постам
- Категории и теги
- Комментарии к постам
- Загрузка изображений
- Email подтверждение регистрации
- Сброс пароля

## Лицензия

MIT License 