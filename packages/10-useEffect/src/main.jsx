import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import './index.css'

// 1. useEffect без массива зависимостей
//
// По умолчанию эффект выполняется после каждого рендера.
// В этом примере он изменяет заголовок вкладки браузера.

function User() {
  const [name, setName] = useState('Анна')

  useEffect(() => {
    // Побочный эффект: изменяем title HTML-страницы.
    document.title = `Привет, ${name}`
  })

  function changeName(event) {
    setName(event.target.value)
  }

  return (
    <section>
      <h2>1. useEffect без зависимостей</h2>

      <h3>Имя: {name}</h3>

      <p>
        Имя:{' '}
        <input
          type="text"
          value={name}
          onChange={changeName}
        />
      </p>

      <p>
        Можно открыть вкладку браузера и изменить имя —
        заголовок страницы тоже изменится.
      </p>
    </section>
  )
}

// 2. useEffect без ограничения
//
// Здесь два состояния: name и age.
// но эффект использует только name.
//
// Несмотря на это, без массива зависимостей эффект
// будет выполняться и при изменении age.

function UserAllEffects() {
  const [name, setName] = useState('Анна')
  const [age, setAge] = useState(30)

  useEffect(() => {
    document.title = `Привет, ${name}`

    // Для наглядности — смотреть в консоль.
    console.log('(2) useEffect: сработал')
  })

  const changeName = (event) => {
    setName(event.target.value)
  }

  const changeAge = (event) => {
    setAge(event.target.value)
  }

  return (
    <section>
      <h2>2. Эффект после каждого рендера</h2>

      <h3>Имя: {name}</h3>
      <h3>Возраст: {age}</h3>

      <div>
        <p>
          Имя:{' '}
          <input
            type="text"
            value={name}
            onChange={changeName}
          />
        </p>

        <p>
          Возраст:{' '}
          <input
            type="number"
            value={age}
            onChange={changeAge}
          />
        </p>
      </div>

      <p>
        При изменении только возраста посмотреть консоль:
        useEffect всё равно сработает.
      </p>
    </section>
  )
}

// 3. useEffect с зависимостью [name]
//
// Теперь эффект зависит только от name.
// При изменении age эффект НЕ срабатывает.

function UserNameEffect() {
  const [name, setName] = useState('Анна')
  const [age, setAge] = useState(30)

  useEffect(() => {
    document.title = `Привет, ${name}`

    console.log('(3) useEffect: изменилось имя')
  }, [name])
  // Эффект срабатывает при изменении name.

  const changeName = (event) => {
    setName(event.target.value)
  }

  const changeAge = (event) => {
    setAge(event.target.value)
  }

  return (
    <section>
      <h2>3. Эффект только при изменении name</h2>

      <h3>Имя: {name}</h3>
      <h3>Возраст: {age}</h3>

      <div>
        <p>
          Имя:{' '}
          <input
            type="text"
            value={name}
            onChange={changeName}
          />
        </p>

        <p>
          Возраст:{' '}
          <input
            type="number"
            value={age}
            onChange={changeAge}
          />
        </p>
      </div>

      <p>
        При изменении возраста — эффект не должен сработать.
        При изменении имени — сработает.
      </p>
    </section>
  )
}

// 4. useEffect с пустым массивом []
//
// Пустой массив означает, что эффект выполняется только при первом рендеринге

function UserOnce() {
  const [name, setName] = useState('Анна')

  useEffect(() => {
    document.title = `Привет, ${name}`

    console.log('(4) useEffect: первый рендер')
  }, [])
  // [] — эффект выполняется только один раз при первом рендеринге!!

  return (
    <section>
      <h2>4. Эффект только один раз</h2>

      <h3>Имя: {name}</h3>

      <p>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </p>

      <p>
        При изменении имени проверить консоль:
        эффект повторно не вызывается.
      </p>
    </section>
  )
}

// 5. Очистка ресурса
//
// useEffect может вернуть функцию очистки.
//
// В статье на метанит пример подписки на click
// внешней кнопки и последующей отписки.

function UserCleanup() {
  const [name, setName] = useState('Анна')

  useEffect(() => {
    const unmountBtn =
      document.getElementById('unmountBtn')

    // Подписываемся на click внешней кнопки.
    unmountBtn.addEventListener(
      'click',
      unmount
    )

    console.log('(5) EventListener добавлен')

    // Функция внутри return выполняется при очистке эффекта.
    return () => {
      unmountBtn.removeEventListener(
        'click',
        unmount
      )

      console.log('EventListener удалён')
    }
  }, [])

  function unmount() {
    root.unmount() // Функция unmount() удаляет данный компонент с веб-страницы, то есть здесь она удаляет вообще всё в root
  }

  return (
    <section>
      <h2>5. Очистка ресурса</h2>

      <h3>Имя: {name}</h3>

      <p>
        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />
      </p>

      <p>
        Кнопка «Удалить React-компоненты» находится в самом низу,
        за пределами React-приложения.
      </p>
    </section>
  )
}

// ДОП ЗАДАНИЕ 1:
// Создание эффекта, который при изменении имени записывает в консоль:
// "Имя изменилось на: ...".
// При этом эффект должен срабатывать ТОЛЬКО при изменении name.

function NameLogger() {
  const [name, setName] = useState('Мария')

  useEffect(() => {
    console.log(`(доп 1) Имя изменилось на: ${name}`)
  }, [name])

  return (
    <section>
      <h2>Доп задание 1</h2>

      <h3>Имя: {name}</h3>

      <input
        type="text"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />
    </section>
  )
}

// ДОП ЗАДАНИЕ 2:
// Сделать таймер, который
// - при первом рендере запускает setInterval;
// - каждую секунду выводит сообщение в консоль;
// - при удалении компонента очистит interval.
//
// Наглядно показать, зачем useEffect
// может возвращать функцию очистки

function Timer() {
  useEffect(() => {
    console.log('(доп 2) Таймер запущен')

    const timerId = setInterval(() => {
      console.log('Прошла 1 секунда')
    }, 1000)

    // Очистка ресурса
    // Вызывается при удалении компонента.
    return () => {
      clearInterval(timerId)

      console.log('Таймер остановлен')
    }
  }, [])

  return (
    <section>
      <h2>Доп задание 2</h2>

      <p>
        Чтобы проверить, работает ли таймер — открыть консоль браузера.
      </p>
    </section>
  )
}

const root = createRoot(
  document.getElementById('root')
)

root.render(
  <>
    <h1>Хук useEffect</h1>

    <User />

    <UserAllEffects />

    <UserNameEffect />

    <UserOnce />

    <UserCleanup />

    <NameLogger />

    <Timer />
  </>
)

// Ниже внешняя кнопка 
//
// Она находится НЕ внутри React, это специально сделано
// для демонстрации очистки ресурса в useEffect.

const unmountButton =
  document.createElement('button')

unmountButton.id = 'unmountBtn'
unmountButton.textContent =
  'Удалить React-компоненты' // Когда компонент удаляется, React выполняет функцию очистки useEffect; это будет видно в консоле на примере таймера

document.body.appendChild(unmountButton)