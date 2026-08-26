import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// ============================================================
// 1. Простое состояние: счётчик
// ============================================================

function Counter() {
  // useState() возвращает массив из двух элементов:
  //
  // count     — текущее значение состояния
  // setCount  — функция для изменения состояния
  //
  // 0 — начальное значение count.
  const [count, setCount] = React.useState(0)

  return (
    <section>
      <h2>Счётчик</h2>

      <h3>Количество: {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>

      <button onClick={() => setCount(count - 1)}>
        Уменьшить
      </button>

      <button onClick={() => setCount(0)}>
        Сбросить
      </button>
    </section>
  )
}

// ============================================================
// 2. Несколько переменных состояния
// ============================================================

function User() {
  // Один компонент может иметь несколько состояний.
  const [name, setName] = React.useState('Том')
  const [age, setAge] = React.useState(36)

  return (
    <section>
      <h2>2. Несколько переменных состояния</h2>

      <h3>Имя: {name}</h3>
      <h3>Возраст: {age}</h3>
    </section>
  )
}

// ============================================================
// 3. Обновление состояния
// ============================================================

function EditableUser() {
  const [name, setName] = React.useState('Том')
  const [age, setAge] = React.useState(36)

  // При изменении поля name:
  // event.target.value содержит введённое значение.
  function handleNameChange(event) {
    setName(event.target.value)
  }

  // Аналогично изменяем возраст
  function handleAgeChange(event) {
    setAge(event.target.value)
  }

  return (
    <section>
      <h2>3. Изменение состояния</h2>

      <h3>Имя: {name}</h3>
      <h3>Возраст: {age}</h3>

      <div>
        <p>
          Имя:{' '}
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </p>

        <p>
          Возраст:{' '}
          <input
            type="number"
            min="0"
            max="110"
            value={age}
            onChange={handleAgeChange}
          />
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 4. Объект в state
// ============================================================

function UserObject() {
  // useState может хранить не только примитивное значение,
  // но и целый объект:
  const [user, setUser] = React.useState({
    name: 'Том',
    age: 36,
  })

  function handleNameChange(event) {
    // setUser полностью заменяет значение state.
    //
    // Поэтому сохраняем старое значение age,
    // а name заменяем новым:
    setUser({
      name: event.target.value,
      age: user.age,
    })
  }

  function handleAgeChange(event) {
    setUser({
      name: user.name,
      age: event.target.value,
    })
  }

  return (
    <section>
      <h2>4. Объект в state</h2>

      <h3>Имя: {user.name}</h3>
      <h3>Возраст: {user.age}</h3>

      <div>
        <p>
          Имя:{' '}
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
          />
        </p>

        <p>
          Возраст:{' '}
          <input
            type="number"
            min="0"
            max="110"
            value={user.age}
            onChange={handleAgeChange}
          />
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 5. Объект в state + spread operator ...
// ============================================================

function UserObjectSpread() {
  const [user, setUser] = React.useState({
    name: 'Том',
    age: 36,
  })

  function handleNameChange(event) {
    // ...user копирует существующие свойства объекта,
    // а потом name заменяется новым значением.
    setUser({
      ...user,
      name: event.target.value,
    })
  }

  function handleAgeChange(event) {
    setUser({
      ...user,
      age: event.target.value,
    })
  }

  return (
    <section>
      <h2>5. Объект + spread</h2>

      <h3>Имя: {user.name}</h3>
      <h3>Возраст: {user.age}</h3>

      <div>
        <p>
          Имя:{' '}
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
          />
        </p>

        <p>
          Возраст:{' '}
          <input
            type="number"
            min="0"
            max="110"
            value={user.age}
            onChange={handleAgeChange}
          />
        </p>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(
  <>

    <Counter />

    <User />

    <EditableUser />

    <UserObject />

    <UserObjectSpread />
  </>,
)