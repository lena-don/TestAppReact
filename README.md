# React Learning

Учебный репозиторий для изучения React.

Здесь собраны небольшие уроки, каждая отдельная тема находится в своём package внутри `packages/`. Основной учебный материал и план обучения [с сайта METANIT]​(https://metanit.com/web/react/)

## 📁 Структура проекта
```
TestAppReact/
├── packages/ — в этой папке отдельные папки-пакеты с мини-уроками
│   ├── 00-primal-app/
│   ├── 01-ts/
│   ├── 02-jsx/
│   ├── 03-render-components/
│   └── ...
│
├── LEARNINGPLAN.md — учебный план, темы и дедлайны
├── LEARNINGNOTES.md — заметки-конспекты по пройденным темам
├── package.json — конфигурация монорепозитория и npm workspaces
└── package-lock.json — зафиксированные версии зависимостей
```

[LEARNINGPLAN.md](./LEARNINGPLAN.md) — учебный план <br>
[LEARNINGNOTES.md](./LEARNINGNOTES.md) — заметки-конспекты

---

## 🧩 Monorepo

Проект организован как monorepo с использованием npm workspaces. Каждая папка внутри packages/ является отдельным workspace и каждый package имеет собственный package.json, а управление всеми пакетами происходит из корня репо.

## 🚀 Установка

Клонировать репозиторий: (поставить актуальные ссылки; мы на гитхабе или гиверсе или чё там?)

```
git clone <repository-url>
cd <repository-folder>
```

Установить зависимости:

```
npm install
```

## ▶️ Запуск проекта

Запустить конкретный package:

```
npm run dev -w 00-primal-app
```

Или для другого урока:

```
npm run dev -w 01-ts
```