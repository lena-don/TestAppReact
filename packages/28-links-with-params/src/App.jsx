import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  NavLink,
  Link, // Добавлено для удобства отображения функциональных и классовых компонентов в одной htmlьке
} from "react-router";


const users = [
  { id: 1, name: "Алексей" },
  { id: 2, name: "Мария" },
  { id: 3, name: "Иван" },
];


// 1. Список пользователей
//
// Для каждого пользователя создаём ссылку.
// В URL подставляется его id:
//
// /users/1
// /users/2
// /users/3

function UserList() {
  return (
    <>
      <h2>Список пользователей</h2>

      {/* С метанита: Для эмуляции хранилища данных
      здесь определен массив users. Для доступа к данным
      этого массива выводятся ссылки: */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <NavLink to={`/users/${user.id}`}> 
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}


// 2. Конкретный пользователь

// useParams() получаетпараметр из URL.

// Для /users/2:
// params.id === "2"

function User() {
  const { id } = useParams();

  // Ищем пользователя по id из URL
  const user = users.find(
    (user) => user.id == id
  );

  // Если пользователя нет
  if (user === undefined) {
    return <h2>Пользователь не найден</h2>;
  }

  return (
    <h2>
      Пользователь: {user.name}
    </h2>
  );
}


// 3. Родительский компонент Users
//
// Outlet — место, куда React Router вставит дочерний маршрут: либо UserList, либо User.

function Users() {
  return (
    <div>
      <h1>Пользователи</h1>

      <Outlet />
    </div>
  );
}


// 4. Пример через классовые компоненты

class ClassUserList extends React.Component {
  render() {
    return (
      <>
        <h2>Список пользователей</h2>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <NavLink to={`/class-users/${user.id}`}>
                {user.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }
}


class ClassUsers extends React.Component {
  render() {
    return (
      <div>
        <h1>Пользователи — классовый компонент</h1>

        <Outlet />
      </div>
    );
  }
}


// User остаётся функциональным, потому что в нём используется useParams().
function ClassUser() {
  const { id } = useParams();

  const user = users.find(
    (user) => user.id == id
  );

  if (user === undefined) {
    return <h2>Пользователь не найден</h2>;
  }

  return (
    <h2>
      Пользователь: {user.name}
    </h2>
  );
}


// Главная для удобства навигации и примера

function Home() {
  return (
    <section>
      <h2>Главная</h2>

      <p>
        Выберите в навигации: функциональный или классовый пример.
      </p>
    </section>
  );
}


function NotFound() {
  return (
    <h2>Не найдено!</h2>
  );
}


function App() {
  return (
    <BrowserRouter>
      <main>

        <nav>
          <Link to="/">Главная</Link>
          {" | "}

          <Link to="/users">
            Пользователи через функциональный
          </Link>
          {" | "}

          <Link to="/class-users">
            Пользователи через классовый
          </Link>
          
        </nav>

        <hr />

        <Routes>

          {/* Главная */}
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/users"
            element={<Users />}
          >
            {/* /users */}
            <Route
              index
              element={<UserList />}
            />

            {/* /users/:id */}
            <Route
              path=":id"
              element={<User />}
            />
          </Route>


          {/* ==================================================
              Через классовые компоненты
          ================================================== */}

          <Route
            path="/class-users"
            element={<ClassUsers />}
          >
            <Route
              index
              element={<ClassUserList />}
            />

            <Route
              path=":id"
              element={<ClassUser />}
            />
          </Route>


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