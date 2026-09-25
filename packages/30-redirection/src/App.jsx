import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  useNavigate,
} from "react-router";

// 1. Просто сами страницы

function Home() {
  return (
    <section>
      <h2>Главная</h2>

      <p>
        Вы попали на главную страницу.
      </p>

      <p>
        Здесь будет находиться краткое описание примеров этой учебной темы.
      </p>
    </section>
  );
}

function New() {
  return (
    <section>
      <h2>Новая страница</h2>

      <p>
        Сюда выполняется переадресация с /old.
      </p>
    </section>
  );
}


// 2. Обычный редирект
//
// Был старый адрес:
// /old

// Теперь он перенаправляет:
// /old → /new
//
// Navigate получает путь через prop to.

function SimpleRedirectInfo() {
  return (
    <section>
      <h2>1. Обычный редирект</h2>

      <p>
        Откройте маршрут <code>/old</code>.
      </p>

      <p>
        Он автоматически перенаправит вас на
        <code> /new</code>.
      </p>

      <Link to="/old">
        Перейти на старый адрес
      </Link>
    </section>
  );
}


// 3. Редирект с параметром
//
// Старый адрес:
// /old/123
//
// Новый:
// /new/123

function NewWithId() {
  const { id } = useParams();

  return (
    <section>
      <h2>Новая страница</h2>

      <p>
        ID: {id}
      </p>
    </section>
  );
}

function OldWithId() {
  const { id } = useParams();

  // Получаем id из старого URL и вставляем его в новый URL.
  return (
    <Navigate to={`/new/${id}`} />
  );
}

function ParameterRedirectInfo() {
  return (
    <section>
      <h2>2. Редирект с параметром</h2>

      <p>
        Старый адрес передаёт параметр новому маршруту.
      </p>

      <Link to="/old/123">
        Открыть /old/123
      </Link>
    </section>
  );
}


// 4. Условный редирект
//
// Логика из примера на метаните:
//
// если пользователь авторизован,
// показываем Home;
// если нет — перенаправляем на /login.

let logged = false;

function Login() {
  // В учебном примере после открытия Login
  // считаем пользователя авторизованным
  logged = true;

  return (
    <section>
      <h2>Вход</h2>

      <p>
        Теперь logged = true.
      </p>

      <p>
        Можно вернуться на главную.
      </p>
    </section>
  );
}

function ConditionalHome() {
  if (logged) {
    return (
      <section>
        <h2>Добро пожаловать!</h2>

        <p>
          Пользователь уже авторизован.
        </p>
      </section>
    );
  }

  // Если logged === false,
  // React Router сразу отправляет на Login.
  return (
    <Navigate to="/login" />
  );
}

function ConditionalRedirectInfo() {
  return (
    <section>
      <h2>3. Условный редирект</h2>

      <p>
        При переходе на /private проверяется logged.
      </p>

      <Link to="/private">
        Открыть закрытую страницу
      </Link>
    </section>
  );
}


// 5. Программная навигация
//
// Здесь вместо <Navigate /> используется хук
// useNavigate().
//
// Переход выполняется после клика на кнопку.

function Old() {
  const { id } = useParams();

  // Получаем функцию навигации
  const navigate = useNavigate();

  return (
    <section>
      <h2>Старый маршрут</h2>

      <p>
        ID: {id}
      </p>

      <button
        onClick={() => {
          // Переходим на новый маршрут
          navigate(`/new/${id}`);
        }}
      >
        Перейти на новый маршрут
      </button>
    </section>
  );
}

function ProgrammaticRedirectInfo() {
  return (
    <section>
      <h2>4. Программная навигация</h2>

      <p>
        Здесь переход выполняется функцией
        <code> navigate() </code>.
      </p>

      <Link to="/navigate/123">
        Открыть пример
      </Link>
    </section>
  );
}


// 6. Доп задание, свзязанное со сторонним
// проектом билиотеки, но в самой биб-ке использовать
// вроде как бессмысленно, пусть будет тут для практики.
//
// Старый адрес раздела библиотеки
// должен перенаправлять на новый.

function Books() {
  return (
    <section>
      <h2>Библиотека</h2>

      <p>
        Новый адрес библиотеки.
      </p>
    </section>
  );
}

function RedirectToBooks() {
  // старый маршрут автоматически отправляет пользователя на новый
  return (
    <Navigate to="/books" />
  );
}

function BooksTaskInfo() {
  return (
    <section>
      <h2>Доп задание: переименованный маршрут</h2>

      <p>
        Старый маршрут:
        <code> /library </code>
      </p>

      <p>
        Новый маршрут:
        <code> /books </code>
      </p>

      <Link to="/library">
        Проверить редирект
      </Link>
    </section>
  );
}


function App() {
  return (
    <BrowserRouter>
      <main>

        <nav>
          <Link to="/">
            Главная
          </Link>
          {" | "}

          <Link to="/redirect-demo">
            Обычный редирект
          </Link>
          {" | "}

          <Link to="/parameter-demo">
            Редирект с параметром
          </Link>
          {" | "}

          <Link to="/conditional-demo">
            Условный редирект
          </Link>
          {" | "}

          <Link to="/navigate-demo">
            Программная навигация
          </Link>
          {" | "}

          <Link to="/books-task">
            Доп задание с биб-кой
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


          {/* 1. Обычный редирект */}

          <Route
            path="/redirect-demo"
            element={<SimpleRedirectInfo />}
          />

          <Route
            path="/new"
            element={<New />}
          />

          <Route
            path="/old"
            element={<Navigate to="/new" />}
          />


          {/* 2. Редирект с параметром */}

          <Route
            path="/parameter-demo"
            element={<ParameterRedirectInfo />}
          />

          <Route
            path="/new/:id"
            element={<NewWithId />}
          />

          <Route
            path="/old/:id"
            element={<OldWithId />}
          />


          {/* 3. Условный редирект */}

          <Route
            path="/conditional-demo"
            element={<ConditionalRedirectInfo />}
          />

          <Route
            path="/private"
            element={<ConditionalHome />}
          />

          <Route
            path="/login"
            element={<Login />}
          />


          {/* 4. Программная навигация */}

          <Route
            path="/navigate-demo"
            element={<ProgrammaticRedirectInfo />}
          />

          <Route
            path="/navigate/:id"
            element={<Old />}
          />


          {/* Дополнительное задание по биб-ке */}

          <Route
            path="/books-task"
            element={<BooksTaskInfo />}
          />

          <Route
            path="/books"
            element={<Books />}
          />

          <Route
            path="/library"
            element={<RedirectToBooks />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;