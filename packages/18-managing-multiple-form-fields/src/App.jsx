import { useState } from 'react'
import React from 'react'


// 1. Несколько полей формы в одном объекте state

function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    userage: 18,
  })

  // Общий обработчик для всех полей формы
  // name поля должен соответствовать ключу в formData
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <section>
      <h2>1. Несколько полей в одном state</h2>

      <p>
        Имя: {formData.username}
        <br />
        Возраст: {formData.userage}
      </p>

      <p>
        <label>Имя</label>
        <br />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </p>

      <p>
        <label>Возраст</label>
        <br />

        <input
          type="number"
          name="userage"
          value={formData.userage}
          onChange={handleChange}
        />
      </p>
    </section>
  )
}


// 2. Аналогичный пример с class-компонентом

class ClassUserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      userage: '',
    }
  }

  // Общий обработчик полей формы
  handleChange = (e) => {
    const { name, value } = e.target

    this.setState((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  render() {
    return (
      <section>
        <h2>2. Несколько полей в class-компоненте</h2>

        <p>
          Имя: {this.state.username}
          <br />
          Возраст: {this.state.userage}
        </p>

        <p>
          <label>Имя</label>
          <br />

          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </p>

        <p>
          <label>Возраст</label>
          <br />

          <input
            type="number"
            name="userage"
            value={this.state.userage}
            onChange={this.handleChange}
          />
        </p>
      </section>
    )
  }
}

// Доп задание:
//
// Очистить сразу все поля.
// Так как все значения находятся в одном объекте,
// можно заменить весь объект одним вызовом setFormData.

function ResetFormTask() {
  const [formData, setFormData] = useState({
    username: '',
    userage: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      username: '',
      userage: '',
    })
  }

  return (
    <section>
      <h2>4. Задание: сбросить все поля</h2>

      <p>
        Имя: {formData.username}
        <br />
        Возраст: {formData.userage}
      </p>

      <p>
        <label>Имя</label>
        <br />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </p>

      <p>
        <label>Возраст</label>
        <br />

        <input
          type="number"
          name="userage"
          value={formData.userage}
          onChange={handleChange}
        />
      </p>

      <button onClick={resetForm}>
        Сбросить форму
      </button>

      <p>
        <small>
          Здесь один объект state позволяет сбросить сразу
          несколько связанных полей.
        </small>
      </p>
    </section>
  )
}


export default function App() {
  return (
    <main>
      <UserForm />

      <ClassUserForm />

      <ResetFormTask />
    </main>
  )
}