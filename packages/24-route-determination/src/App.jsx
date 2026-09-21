import React from "react"; // Для классовых компонентов нужен React
import { BrowserRouter, Routes, Route, Link } from "react-router";

// 1. Компоненты для маршрутов

function Main() {
  return (
    <div>
      <h2>Главная</h2>

      <p>
        Это компонент для маршрута "/".
      </p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>О сайте</h2>

      <p>
        Это компонент для маршрута "/about".
      </p>
    </div>
  );
}

function Contacts() {
  return (
    <div>
      <h2>Контакты</h2>

      <p>
        Это компонент для маршрута "/сontacts".
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>Ресурс не найден</h2>

      <p>
        Такого маршрута нет.
      </p>
    </div>
  );
}


// 2. Классовые компоненты

class ClassMain extends React.Component {
  render() {
    return <h2>Главная — классовый компонент</h2>;
  }
}

class ClassAbout extends React.Component {
  render() {
    return <h2>О сайте — классовый компонент</h2>;
  }
}

class ClassNotFound extends React.Component {
  render() {
    return <h2>Ресурс не найден — классовый компонент</h2>;
  }
}

// 3. Пример с динамическим element
// Route может получить не только компонент, но и любой JSX.

function DynamicRoutes() {
  return (
    <section>
      <h2>Маршруты с JSX в element</h2>

      <Routes>
        <Route
          path="/dynamic"
          element={<h2>Динамическая страница</h2>}
        />

        <Route
          path="/contacts"
          element={<h2>Контакты</h2>}
        />
      </Routes>
    </section>
  );
}


function App() {
  return (
    <BrowserRouter>
      <main>

        {/* Простая навигация для проверки маршрутов */}
        <nav>
          <Link to="/">Главная</Link>
          {" | "}
          <Link to="/about">О сайте</Link>
          {" | "}
          <Link to="/dynamic">Динамическая страница</Link>
          {" | "}
          <Link to="/contacts">Контакты</Link>
          {" | "}
          <Link to="/unknown">Несуществующий маршрут</Link>
        </nav>

        <hr />

        <Routes>
          {/* Корневой маршрут */}
          <Route
            path="/"
            element={<Main />}
          />

          {/* Маршрут /about */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* JSX непосредственно внутри element */}
          <Route
            path="/dynamic"
            element={<h2>Динамическая страница</h2>}
          />

          <Route
            path="/contacts"
            element={<Contacts />}
          />

          {/* Все неизвестные маршруты */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;