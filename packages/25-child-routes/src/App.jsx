import React from "react";

import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router";


// Общие компоненты

function Home() {
  return (
    <section>
      <h2>Главная</h2>

      <p>
        Главная страница приложения.
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <h2>Ресурс не найден</h2>

      <p>
        Такого маршрута нет.
      </p>
    </section>
  );
}


// Товары

function Phone() {
  return (
    <h3>Смартфоны</h3>
  );
}

function Tablet() {
  return (
    <h3>Планшеты</h3>
  );
}


// 1. Routes находятся внутри Products

// Родительский маршрут:
// /products/*

// Звёздочка означает, что после /products
// могут находиться дополнительные сегменты.

// Внутри Products определены дочерние Routes.

function Products() {
  return (
    <div>
      <h2>Товары</h2>

      {/* 
        Здесь отображается дочерний маршрут.
        Основной маршрут остаётся /products.
      */}
      <Routes>
        <Route
          path="phones"
          element={<Phone />}
        />

        <Route
          path="tablets"
          element={<Tablet />}
        />
      </Routes>
    </div>
  );
}


// 2. Классовые компоненты для первого примера

class ClassPhone extends React.Component {
  render() {
    return (
      <h3>Смартфоны — классовый компонент</h3>
    );
  }
}

class ClassTablet extends React.Component {
  render() {
    return (
      <h3>Планшеты — классовый компонент</h3>
    );
  }
}

class ClassProducts extends React.Component {
  render() {
    return (
      <div>
        <h2>Товары — классовый компонент</h2>

        <Routes>
          <Route
            path="phones"
            element={<ClassPhone />}
          />

          <Route
            path="tablets"
            element={<ClassTablet />}
          />
        </Routes>
      </div>
    );
  }
}


// 3. Дочерние маршруты + Outlet

// Теперь Routes определяются снаружи Products.

// Products содержит:
//   <Outlet />
//
// Именно в это место React вставит компонент соответствующего дочернего маршрута.

function OutletProducts() {
  return (
    <div>
      <h2>Каталог товаров</h2>

      {/* Здесь появится дочерний маршрут */}
      <Outlet />
    </div>
  );
}


// 4. Главный дочерний маршрут
// index означает: "показать этот компонент при точном пути /catalog"

function CatalogHome() {
  return (
    <div>
      <h3>Каталог товаров</h3>

      <p>
        Вы на главной странице каталога.
      </p>
    </div>
  );
}


// 5. Дополнительный дочерний маршрут

function Laptops() {
  return (
    <h3>Ноутбуки</h3>
  );
}


// 6. Вариант Outlet с классовыми компонентами

class ClassOutletProducts extends React.Component {
  render() {
    return (
      <div>
        <h2>Каталог — классовый компонент</h2>

        <Outlet />
      </div>
    );
  }
}

class ClassCatalogHome extends React.Component {
  render() {
    return (
      <h3>Главная каталога — классовый компонент</h3>
    );
  }
}


function App() {
  return (
    <BrowserRouter>
      <main>

        <nav>
          <Link to="/">Главная</Link>
          {" | "}

          <Link to="/products">
            Товары
          </Link>
          {" | "}

          <Link to="/products/phones">
            Товары / смартфоны
          </Link>
          {" | "}

          <Link to="/products/tablets">
            Товары / планшеты
          </Link>
          {" | "}

          <Link to="/class-products/phones">
            Class / смартфоны
          </Link>
          {" | "}

          <Link to="/catalog">
            Каталог
          </Link>
          {" | "}

          <Link to="/catalog/phones">
            Каталог / смартфоны
          </Link>
          {" | "}

          <Link to="/catalog/tablets">
            Каталог / планшеты
          </Link>
          {" | "}

          <Link to="/catalog/laptops">
            Каталог / ноутбуки
          </Link>
          {" | "}

          <Link to="/class-catalog">
            Class / каталог
          </Link>
        </nav>

        <hr />

        <Routes>

          {/* ==================================================
              Главная
          ================================================== */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* ==================================================
              Первый способ: дочерние Routes внутри Products
          ================================================== */}

          <Route
            path="/products/*"
            element={<Products />}
          />


          {/* вариант с классовыми копмонентами */}
          <Route
            path="/class-products/*"
            element={<ClassProducts />}
          />


          {/* ==================================================
              Второй способ: Outlet
          ================================================== */}

          <Route
            path="/catalog"
            element={<OutletProducts />}
          >
            {/* 
              index — содержимое самого /catalog
            */}
            <Route
              index
              element={<CatalogHome />}
            />

            {/* 
              В дочернем path нет "/". Он автоматически прибавляется к /catalog.
            */}
            <Route
              path="phones"
              element={<Phone />}
            />

            <Route
              path="tablets"
              element={<Tablet />}
            />

            {/* Дополнительное задание */}
            <Route
              path="laptops"
              element={<Laptops />}
            />
          </Route>


          {/* ==================================================
            Outlet с классовыми компонентами
          ================================================== */}

          <Route
            path="/class-catalog"
            element={<ClassOutletProducts />}
          >
            <Route
              index
              element={<ClassCatalogHome />}
            />

            <Route
              path="phones"
              element={<ClassPhone />}
            />

            <Route
              path="tablets"
              element={<ClassTablet />}
            />
          </Route>


          {/* ==================================================
              404 не найдено
          ================================================== */}

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