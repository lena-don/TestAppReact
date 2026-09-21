import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
} from "react-router";


// 1. Общие страницы

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


// 2. Параметр :id
//
// В маршруте:
// /products/:id
//
// :id — динамический параметр.
// Например:
// /products/5
// /products/10

function ProductsList() {
  return (
    <section>
      <h2>Список товаров</h2>

      <p>
        Выберите конкретный товар:
      </p>

      <ul>
        <li>
          <Link to="/products/1">
            Товар №1
          </Link>
        </li>

        <li>
          <Link to="/products/5">
            Товар №5
          </Link>
        </li>

        <li>
          <Link to="/products/10">
            Товар №10
          </Link>
        </li>
      </ul>
    </section>
  );
}


// Компонент получает параметр через useParams()
function Product() {
  const params = useParams();

  // Получаем значение параметра id
  const prodId = params.id;

  return (
    <section>
      <h2>
        Товар № {prodId}
      </h2>
    </section>
  );
}


// Родительский компонент
function Products() {
  return (
    <section>
      <h2>Товары</h2>

      {/* 
        Сюда React Router вставит дочерний маршрут.
      */}
      <Outlet />
    </section>
  );
}


// 3. Классовые компоненты
//
// В классовом компоненте нельзя напрямую вызвать useParams(), потому что это React Hook.
//
// Поэтому сам Product остаётся функциональным.

class ClassProductsList extends React.Component {
  render() {
    return (
      <h2>
        Список товаров — классовый компонент
      </h2>
    );
  }
}

class ClassProducts extends React.Component {
  render() {
    return (
      <section>
        <h2>
          Товары — классовый компонент
        </h2>

        <Outlet />
      </section>
    );
  }
}


// Product остаётся функциональным и использует useParams()
function ClassProduct() {
  const params = useParams();

  return (
    <h2>
      Товар № {params.id}
    </h2>
  );
}


// 4. Несколько параметров
//
// Маршрут:
// /catalog/:id/:name
//
// Например:
// /catalog/5/phone

function CatalogProduct() {
  const { id, name } = useParams();

  return (
    <section>
      <h2>
        Товар
      </h2>

      <p>
        ID: {id}
      </p>

      <p>
        Название: {name}
      </p>
    </section>
  );
}


// 5. Параметры без вложенного маршрута
//
// Здесь Products сам является маршрутом:
// /items/:id/:cat

function Item() {
  const { id, cat } = useParams();

  return (
    <section>
      <h2>
        Информация о товаре
      </h2>

      <p>
        ID товара: {id}
      </p>

      <p>
        Категория: {cat}
      </p>
    </section>
  );
}


// 6. Необязательный параметр
//
// /users
// /users/2
//
// :id? означает, что id может отсутствовать.

const users = [
  {
    id: 1,
    name: "Алексей",
  },
  {
    id: 2,
    name: "Мария",
  },
  {
    id: 3,
    name: "Иван",
  },
];

function Users() {
  const { id } = useParams();

  // Если id передан, показываем конкретного пользователя
  if (id) {
    const user = users.find(
      (user) => user.id == id
    );

    if (user === undefined) {
      return (
        <h2>
          Пользователь не найден
        </h2>
      );
    }

    return (
      <section>
        <h2>
          Пользователь: {user.name}
        </h2>
      </section>
    );
  }

  // Если id не передан — показываем список
  return (
    <section>
      <h2>
        Список пользователей
      </h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <NavLink
              to={`/users/${user.id}`}
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}


// Доп задание:
// Параметр для книги; для проекта с биб-кой

const books = [
  {
    id: 1,
    title: "Государство",
  },
  {
    id: 2,
    title: "Дизайн привычных вещей",
  },
  {
    id: 3,
    title: "Завет воды",
  },
];

function Books() {
  const { id } = useParams();

  // Если id нет — показываем список книг
  if (!id) {
    return (
      <section>
        <h2>
          Список книг
        </h2>

        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link
                to={`/books/${book.id}`}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const book = books.find(
    (book) => book.id == id
  );

  if (!book) {
    return (
      <h2>
        Книга не найдена
      </h2>
    );
  }

  return (
    <section>
      <h2>
        Книга: {book.title}
      </h2>

      <p>
        ID: {book.id}
      </p>
    </section>
  );
}


function App() {
  return (
    <BrowserRouter>
      <main>

        {/* 
          Тестовая навигация, она нужна только для удобной проверки маршрутов
        */}
        <nav>
          <Link to="/">
            Главная
          </Link>
          {" | "}

          <Link to="/products">
            Товары
          </Link>
          {" | "}

          <Link to="/products/5">
            Товар №5
          </Link>
          {" | "}

          <Link to="/class-products/10">
            Class товар №10
          </Link>
          {" | "}

          <Link to="/catalog/25/phone">
            Два параметра
          </Link>
          {" | "}

          <Link to="/items/7/electronics">
            Параметры без вложенности
          </Link>
          {" | "}

          <Link to="/users">
            Пользователи
          </Link>
          {" | "}

          <Link to="/users/2">
            Пользователь №2
          </Link>
          {" | "}

          <Link to="/books">
            Книги
          </Link>
          {" | "}

          <Link to="/books/1">
            Книга №1
          </Link>
          {" | "}
          
        </nav>

        <hr />

        <Routes>

          {/* Главная */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* ==================================================
              1. Параметр :id
          ================================================== */}

          <Route
            path="/products"
            element={<Products />}
          >
            <Route
              index
              element={<ProductsList />}
            />

            <Route
              path=":id"
              element={<Product />}
            />
          </Route>


          {/* ==================================================
              2. Вариант с классовыми компонентами
          ================================================== */}

          <Route
            path="/class-products"
            element={<ClassProducts />}
          >
            <Route
              index
              element={<ClassProductsList />}
            />

            <Route
              path=":id"
              element={<ClassProduct />}
            />
          </Route>


          {/* ==================================================
              3. Несколько параметров
          ================================================== */}

          <Route
            path="/catalog/:id/:name"
            element={<CatalogProduct />}
          />


          {/* ==================================================
              4. Параметры без вложенного маршрута
          ================================================== */}

          <Route
            path="/items/:id/:cat"
            element={<Item />}
          />


          {/* ==================================================
              5. Необязательный параметр
          ================================================== */}

          <Route
            path="/users/:id?"
            element={<Users />}
          />


          {/* ==================================================
              6. Задание: книги
          ================================================== */}
          
          <Route
            path="/books/:id?"
            element={<Books />}
          />


          {/* 404 */}
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