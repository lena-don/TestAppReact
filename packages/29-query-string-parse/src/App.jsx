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

    //setSearchParams уже возвращается
    // из useSearchParams() и прямо описывается как функция для изменения
    // параметров строки запроса, но в основном примере на Метаните показано
    // только чтение через get(). Пример использования setSearchParams приведён
    // в доп задании ChangeQueryTask нижее.

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

        <Link to="/2/?name=Игорь&age=38">
          Игорь
        </Link>
        {" | "}

        <Link to="/2/?name=Катя&age=19">
          Катя
        </Link>
        {" | "}

        <Link to="/3/?name=Мария&age=31">
          Мария
        </Link>
      </nav>
    </section>
  );
}


// Доп задание
// Изменение query string через setSearchParams

function ChangeQueryTask() {
  // searchParams — читаем текущие параметры
  // setSearchParams — изменяем их
  const [searchParams, setSearchParams] =
    useSearchParams();

  // Текущее значение параметра name
  const name = searchParams.get("name") || "";

  const handleChange = (e) => {
    // Меняем query string прямо при вводе
    setSearchParams({
      name: e.target.value,
    });
  };

  const clearQuery = () => {
    // Удаляем все параметры строки запроса
    setSearchParams({});
  };

  return (
    <section>
      <h2>Дополнительное задание: изменить query string</h2>

      <p>
        Текущее имя из URL: {name || "—"}
      </p>

      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Введите имя"
      />

      <button onClick={clearQuery}>
        Очистить query string
      </button>

      <p>
        Попробуйте ввести имя и посмотрите на адресную строку браузера.
      </p>
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

        <ChangeQueryTask />

      </main>
    </BrowserRouter>
  );
}