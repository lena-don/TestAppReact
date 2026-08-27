import { Component, useEffect, useState } from 'react'


// 1. Class Component
// Управление ресурсом через componentDidMount /
// componentWillUnmount

class Clock extends Component {

  constructor(props) {
    super(props)

    // Начальное состояние — текущая дата и время:
    this.state = {
      date: new Date()
    }

    // Привязываем метод к экземпляру компонента:
    this.unmount = this.unmount.bind(this)
  }


  // Удаляем компонент.
  // Это приведёт к вызову componentWillUnmount() ! Сделать проверку через логи там, где нужна наглядность жизненного цикла компонента (из урока 11)
  unmount() {
    this.unmount()
  }


  // Компонент уже добавлен в DOM
  // Здесь создаём ресурс часы
  componentDidMount() {

    this.timerId = setInterval(
      () => this.tick(),
      1000
    )

    console.log('componentDidMount()')
  }


  // Компонент удаляется из DOM.
  // Здесь обязательно освобождаем созданный ресурс.
  componentWillUnmount() {

    clearInterval(this.timerId)

    console.log('componentWillUnmount()')
  }


  // Каждую секунду обновляем state.
  tick() {

    this.setState({
      date: new Date()
    })
  }


  render() {

    return (
      <div>
        <h2>
          Текущее время:{' '}
          {this.state.date.toLocaleTimeString()}
        </h2>
      </div>
    )
  }
}

function App() {
  const [show, setShow] = useState(true) // Это отдельно разобрать и вынести,
  // в учебных материалах сделано по-другому, так как там другая структура проекта,
  // а у меня на базе стандартного Реакт-приложения из Вита.

  return (
    <>
      {show && <Clock />}

      <button onClick={() => setShow(false)}>
        Удалить часики
      </button>
    </>
  )
}

export default App