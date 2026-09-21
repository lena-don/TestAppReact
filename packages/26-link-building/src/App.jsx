import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router";


// 1. Компоненты страниц

function Home() {
  return (
    <section>
      <h2>Главная</h2>

      <p>
        Это главная страница приложения.
      </p>
    </section>
  );
}

function About() {
  return (
    <section>
      <h2>О сайте</h2>

      <p>
        Здесь находится информация о сайте.
      </p>
    </section>
  );
}

function Products() {
  return (
    <section>
      <h2>Товары</h2>

      <p>
        Здесь находится список товаров.
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <h2>Ресурс не найден</h2>

      <p>
        Такой страницы нет.
      </p>
    </section>
  );
}


// 2. Обычный Link

// Link используется для перехода между маршрутами.
// Атрибут to указывает путь.

function LinkNavigation() {
  return (
    <section>
      <h2>1. Обычные ссылки Link</h2>

      <nav className="navigation">
        <Link to="/">
          Главная
        </Link>

        <Link to="/about">
          О сайте
        </Link>

        <Link to="/products">
          Товары
        </Link>
      </nav>

      <p>
        Link просто выполняет переход по указанному маршруту.
      </p>
    </section>
  );
}


// 3. Аналогичный пример через классовые компонент

class ClassHome extends React.Component {
  render() {
    return (
      <h2>Главная — классовый компонент</h2>
    );
  }
}

class ClassAbout extends React.Component {
  render() {
    return (
      <h2>О сайте — классовый компонент</h2>
    );
  }
}

class ClassProducts extends React.Component {
  render() {
    return (
      <h2>Товары — классовый компонент</h2>
    );
  }
}

class ClassNotFound extends React.Component {
  render() {
    return (
      <h2>Ресурс не найден — классовый компонент</h2>
    );
  }
}

class ClassLinkNavigation extends React.Component {
  render() {
    return (
      <section>
        <h2>2. Link в классовый компоненте</h2>

        <nav className="navigation">
          <Link to="/">
            Главная
          </Link>

          <Link to="/about">
            О сайте
          </Link>

          <Link to="/products">
            Товары
          </Link>
        </nav>
      </section>
    );
  }
}


// 4. NavLink

// NavLink похож на Link, но дополнительно получает информацию о том, является ли ссылка активной.
// isActive === true, если ссылка соответствует текущему маршруту.

function setActive({ isActive }) {
  return isActive ? "active" : "";
}

function NavLinkNavigation() {
  return (
    <section>
      <h2>3. Активные ссылки NavLink</h2>

      <nav className="navigation">
        <NavLink
          to="/"
          className={setActive}
        >
          Главная
        </NavLink>

        <NavLink
          to="/about"
          className={setActive}
        >
          О сайте
        </NavLink>

        <NavLink
          to="/products"
          className={setActive}
        >
          Товары
        </NavLink>
      </nav>

      <p>
        Активная ссылка получает класс <code>active</code>.
      </p>
    </section>
  );
}


// 5. NavLink со стилями
//
// Вместо className можно использовать style.
// Здесь цвет зависит от isActive.

function StyledNavLinkNavigation() {
  return (
    <section>
      <h2>4. NavLink с динамическим style</h2>

      <nav className="navigation">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "lightgreen" : "blue",
          })}
        >
          Главная
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            color: isActive ? "lightgreen" : "blue",
          })}
        >
          О сайте
        </NavLink>

        <NavLink
          to="/products"
          style={({ isActive }) => ({
            color: isActive ? "lightgreen" : "blue",
          })}
        >
          Товары
        </NavLink>
      </nav>

      <p>
        Здесь активная ссылка становится зелёной,
        остальные — синими.
      </p>
    </section>
  );
}


// Доп задание:
// Вынести выбор активного цвета в отдельную функцию.

function setActiveStyle({ isActive }) {
  return {
    color: isActive ? "darkred" : "gray",
    fontWeight: isActive ? "700" : "400",
  };
}



function App() {
  return (
    <BrowserRouter>
      <main>

        <LinkNavigation />

        <ClassLinkNavigation />

        <NavLinkNavigation />

        <StyledNavLinkNavigation />

        <hr />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          {/* 
            Эти маршруты нужны, чтобы увидеть,
            что обычные Link и NavLink ведут
            к реальным компонентам.
          */}
          <Route
            path="/class-home"
            element={<ClassHome />}
          />

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