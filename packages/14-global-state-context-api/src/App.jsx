import { useState, createContext, useContext } from 'react'

// 1. Простой Context

// Создаём контекст:
// Через него UserProfile сможет получить данные, не получая их через props.
const UserContext = createContext()


function User() {

  // Состояние пользователя находится в родительском компоненте User:
  const [user, setUser] = useState({
    name: 'Анна',
    age: 32
  })


  return (
    // Provider передаёт user всем компонентам внутри него:
    <UserContext.Provider value={user}>

      <UserProfile />

    </UserContext.Provider>
  )
}


function UserProfile() {

  // Получаем данные из контекста.
  // Props здесь не нужны!
  const user = useContext(UserContext)

  return (
    <p>
      Имя: {user.name}
      <br />
      Возраст: {user.age}
    </p>
  )
}


// 2. Context для состояния аутентификации

// Создаём отдельный контекст для авторизации:
const AuthContext = createContext()


function AuthApp() {

  // false — пользователь пока не авторизован:
  const [isAuthenticated, setIsAuthenticated] =
    useState(false)


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >

      {/* Текст зависит от состояния */}
      <h3>
        {isAuthenticated
          ? 'Вы авторизованы'
          : 'Доступ запрещён'
        }
      </h3>

      <Login />

    </AuthContext.Provider>
  )
}


function Login() {

  // Получаем из контекста и состояние, и функцию его изменения:
  const {
    isAuthenticated,
    setIsAuthenticated
  } = useContext(AuthContext)


  return (
    <button
      onClick={() =>
        setIsAuthenticated(!isAuthenticated)
      }
    >
      {isAuthenticated
        ? 'Выйти'
        : 'Войти'
      }
    </button>
  )
}


// ДОП ЗАДАНИЕ:
// Создай ThemeContext (возможность смены темы на светлую/тёмную)
// Состояние theme должно находиться в ThemeApp.
// Компонент ThemeButton должен получать theme
// и setTheme через useContext(), а не через props.

// ЗАДАНИЕ 2: переключение темы через Context
// ======================================================

const ThemeContext = createContext()

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
    </button>
  )
}

function ThemeTask() {
  // Состояние темы хранится в компоненте-родителе:
  const [theme, setTheme] = useState('light')

  // Меняем значение состояния с light на dark и обратно:
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <section className={`theme theme-${theme}`}>
        <h2>Доп задание: переключение темы</h2>

        <p>
          Текущая тема:{' '}
          {theme === 'light' ? 'светлая' : 'тёмная'}
        </p>

        {/* Компонент получает theme и toggleTheme через Context */}
        <ThemeButton />
      </section>
    </ThemeContext.Provider>
  )
}



function App() {

  return (
    <main>

      <section>

        <h2>
          1. Данные пользователя через Context
        </h2>

        <p>
          UserProfile получает данные пользователя
          непосредственно из контекста.
        </p>

        <User />

      </section>

      <section>

        <h2>
          2. Состояние авторизации
        </h2>

        <AuthApp />

      </section>

      <ThemeTask />

    </main>
  )
}


export default App