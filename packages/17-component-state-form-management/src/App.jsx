import { useState } from 'react'
import React from 'react'


// 1. Управление значением input через state

function UserForm() {
  const [name, setName] = useState('')

  // onChange срабатывает при изменении поля
  function onChange(e) {
    setName(e.target.value)
  }

  return (
    <section>
      <h2>1. Управление полем через state</h2>

      <input
        type="text"
        value={name}
        onChange={onChange}
      />

      <p>Имя: {name}</p>

      <p>
        <small>
          Значение input хранится в state и обновляется через onChange.
        </small>
      </p>
    </section>
  )
}


// 2. Аналогичный пример через class-компонент

class ClassUserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }

    // Привязываем метод к компоненту
    this.onChange = this.onChange.bind(this)
  }

  // Обработчик изменения поля
  onChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  render() {
    return (
      <section>
        <h2>2. Управление формой в class-компоненте</h2>

        <input
          type="text"
          value={this.state.name}
          onChange={this.onChange}
        />

        <p>Имя: {this.state.name}</p>

        <p>
          <small>
            Здесь вместо useState используется this.state и setState().
          </small>
        </p>
      </section>
    )
  }
}


// 3. Отправка формы

function SubmitForm() {
  const [name, setName] = useState('')

  // Изменяем state при вводе
  function onChange(e) {
    setName(e.target.value)
  }

  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем обычную отправку HTML-формы
    e.preventDefault()

    console.log('Имя:', name)
  }

  return (
    <section>
      <h2>3. Отправка формы</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Имя:
            <br />

            <input
              type="text"
              value={name}
              onChange={onChange}
            />
          </label>
        </p>

        <input
          type="submit"
          value="Отправить"
        />
      </form>

      <p>
        <small>
          handleSubmit перехватывает отправку формы и получает
          текущее значение name (в консоль).
        </small>
      </p>
    </section>
  )
}


// Доп задание
//
// Сделать форму с именем и отправкой.
// После submit вывести сообщение на странице.

function GreetingTask() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    // Не даём браузеру перезагрузить страницу
    e.preventDefault()

    setMessage(`Здравствуйте, ${name}!`)
  }

  return (
    <section>
      <h2>Доп задание: приветствие</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Имя:
            <br />

            <input
              type="text"
              value={name}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">
          Поприветствовать
        </button>
      </form>

      {message && (
        <p>{message}</p>
      )}

      <p>
        <small>
          Решение использует state для имени и отдельный
          state для сообщения после отправки.
        </small>
      </p>
    </section>
  )
}

export default function App() {
  return (
    <main>
      <h1>17. Состояние компонентов и управление формами</h1>

      <UserForm />

      <ClassUserForm />

      <SubmitForm />

      <GreetingTask />
    </main>
  )
}