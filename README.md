# Подбор автозапчастей (Favorit Parts)

Отдельное клиентское приложение рядом с `frontend/`. Стек: React + TypeScript + Redux Toolkit + Bootstrap. Структура ближе к remote (`features` / `shared`), без лишнего хостового обвеса.

Документация API: [wsprice.pdf](https://lk.favorit-parts.ru/static/wsprice.pdf)

## Как работает

1. Пользователь вводит артикул → `GET /hs/hsprice/?key=…&number=…` → список уникальных производителей.
2. Выбор бренда → `GET /hs/hsprice/?key=…&number=…&brand=…&analogues=on` → таблица исходной позиции и аналогов.

В таблице: название и производитель, цена со склада (`warehouses.price`), остаток.

Пустой ответ API, ошибка `error` и сбой сети показываются отдельными сообщениями. Пока идёт запрос — лоадер.

## Запуск

```bash
cd parts-search
copy .env.example .env
npm install
npm run dev
```

Приложение: http://localhost:5174

Ключ покупателя — `VITE_FAVORIT_API_KEY`.
