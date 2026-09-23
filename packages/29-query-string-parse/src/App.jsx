import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router";

// 1. Основной пример с юзерами

// Например, URL выглядит так:
// /2/?name=Алексей&age=25

// 2                 → параметр маршрута id
// name=Алексей      → параметр строки запроса
// age=25            → параметр строки запроса

function User() {
  // Получаем параметр из маршрута
  const params = useParams();

  // Получаем параметры строки запроса
  const [searchParams, setSearchParams] =
    useSearchParams();

  return (
    <section>
      <h2>Пользователь</h2>

      <p>
        ID: {params.id}
      </p>

      <p>
        Имя: {searchParams.get("name")}
      </p>

      <p>
        Возраст: {searchParams.get("age")}
      </p>

      <p>
        id получен из маршрута, а name и age — из строки запроса.
      </p>
    </section>
  );
}

function Home() {
  return (
    <section>
      <h2>Главная</h2>

      <p>
        Выберите пользователя:
      </p>

      {/* 
        В URL одновременно передаются:
        - id маршрута
        - name и age в query string
      */}
      <nav>
        <Link to="/2/?name=Алексей&age=25">
          Алексей
        </Link>
        {" | "}

        <Link to="/3/?name=Мария&age=31">
          Мария
        </Link>
      </nav>
    </section>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <main>

        <nav>
          <Link to="/">
            Главная
          </Link>
        </nav>

        <hr />

        <Routes>
          {/* Главная */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* 
            :id — параметр маршрута; name и age находятся после ?.
          */}
          <Route
            path="/:id"
            element={<User />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}