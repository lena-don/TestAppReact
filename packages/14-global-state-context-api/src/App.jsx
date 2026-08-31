import { useState, createContext, useContext } from 'react'

// 1. Простой Context

// Создаём контекст.
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

    </main>
  )
}


export default App