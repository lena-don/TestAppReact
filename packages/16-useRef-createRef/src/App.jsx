import { useEffect, useRef, useState, createRef } from 'react'
import React from 'react'


//1. useRef — ссылка на HTML-элемент

function UserForm() {
  const nameField = useRef(null)

  const send = () => {
    // current указывает на DOM-элемент input
    const inputElement = nameField.current

    console.log('Имя: ' + inputElement.value)
  }

  return (
    <section>
      <h2>1. useRef и ссылка на HTML-элемент input</h2>

      <p>
        useRef позволяет получить сам DOM-элемент через свойство current.
      </p>

      <input ref={nameField} />

      <button onClick={send}>
        Отправить
      </button>
    </section>
  )
}



// 2. useEffect + useRef
// Сохраняем актуальное значение state

// - name хранится в state;
// - nameRef хранит последнее значение name;
// - первый useEffect обновляет nameRef;
// - второй useEffect запускается один раз;
// - cleanup-функция при размонтировании сохраняет актуальное значение nameRef в localStorage.


function UserFormStorage() {
  const [name, setName] = useState('Том')
  const nameRef = useRef(name)

  useEffect(() => {
    // При изменении name записываем актуальное значение в ref
    nameRef.current = name
  }, [name])

  useEffect(() => {
    // Извлекаем данные из localStorage
    const userName = localStorage.getItem('userNameRefDemo')

    // Если данные существуют — загружаем их
    if (userName !== null) {
      setName(userName)
      console.log('Данные получены!')
    }

    // cleanup выполняется при размонтировании компонента
    return () => {
      console.log(nameRef.current)

      localStorage.setItem(
        'userNameRefDemo',
        nameRef.current
      )

      console.log('Данные сохранены!')
    }
  }, []) // Эффект срабатывает только один раз - при самом первом рендеринге

  const changeName = (event) => {
    setName(event.target.value)
  }

  return (
    <section>
      <h2>2. useRef и актуальное значение state</h2>

      <h3>Имя: {name}</h3>

      <p>
        Имя:
        {' '}
        <input
          value={name}
          onChange={changeName}
        />
      </p>

      <p>
          Значение хранится в state, а актуальное значение для
          cleanup — в nameRef.current.
      </p>
    </section>
  )
}


// 3. Дополнение к localStorage
// На Metanit компонент сам вызывает root.unmount(),
// нам это не подходит, поэтому родительский компонент
// управляет монтированием: кнопка ниже убирает только этот пример.
// Сleanup внутри UserFormStorage срабатывает так же.

function StorageExample() {
  const [showForm, setShowForm] = useState(true)

  return (
    <section>
      {showForm ? (
        <>
          <UserFormStorage />

          <button onClick={() => setShowForm(false)}>
            Убрать этот пример
          </button>
        </>
      ) : ( // Prettier раскидал тернарник по строкам
        <>
          <p>
            Компонент размонтирован.
            Проверь console.log() и localStorage.
          </p>

          <button onClick={() => setShowForm(true)}>
            Вернуть пример
          </button>
        </>
      )}
    </section>
  )
}


// 4. createRef — ссылка для class-компонента

// В функциональных компонентах используется useRef().
// В class-компонентах из используется createRef().


class ClassUserForm extends React.Component {
  constructor(props) {
    super(props)

    this.nameField = createRef()
  }

  send = () => {
    // current указывает на DOM-элемент input
    const inputElement = this.nameField.current

    console.log('Имя: ' + inputElement.value)
  }

  render() {
    return (
      <section>
        <h2>3. createRef и class-компонент</h2>

        <input
          defaultValue="Том" 
          ref={this.nameField} // Мы не можем установить
          // значение по умолчанию с помощью стандартного
          // атрибута value: при использовании атрибута
          // value опять придется задавать обработчик
          // события change; альтернатива — специальный
          // атрибут defaultValue, который задает для
          // поля ввода значение по умолчанию.
        />

        <button onClick={this.send}>
          Отправить
        </button>

        <p>
          Для классовых компонентов используется createRef(), а не useRef().
        </p>
      </section>
    )
  }
}


export default function App() {
  return (
    <>
      <UserForm />

      <StorageExample />

      <ClassUserForm />
    </>
  )
}