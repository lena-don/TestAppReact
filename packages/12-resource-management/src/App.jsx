import { Component, useEffect, useState } from 'react'


// 1. Class Component
// Управление ресурсом через componentDidMount /
// componentWillUnmount

class Clock extends Component {

  constructor(props) {
    super(props)

    // Начальное состояние — текущая дата и время.
    this.state = {
      date: new Date()
    }

    // Привязываем метод к экземпляру компонента.
    this.unmount = this.unmount.bind(this)
  }


  // Удаляем компонент.
  // Это приведёт к вызову componentWillUnmount()? Сделать проверку через логи там, где нужна наглядность жизненного цикла компонента (из урока 11)
  unmount() {
    this.unmount()
  }


  // Компонент уже добавлен в DOM.
  // Здесь создаём ресурс — часы.
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

        <button onClick={this.unmount}> 
          {/* Адаптировать под мой проект с шаблоном от Vite */}
          Удалить компонент
        </button>
      </div>
    )
  }
}

function App() {

  return (
    <>
      <section>

        <h2>
          1. Class Component
        </h2>

        <p>
          Часы создаются в componentDidMount(),
          а удаляются в componentWillUnmount().
        </p>

        <Clock />

      </section>
    </>
  )
}

export default App