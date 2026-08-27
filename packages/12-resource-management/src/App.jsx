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


  // Удаляем компонент
  unmount() {
    this.props.root.unmount()
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

// 2. Functional Component + useEffect
function FunctionalClock({ root }) {

  const [state, setState] = useState({
    date: new Date()
  })


  // Удаляем React root.
  // Удаление root = удаление всего на странице
  function unmount() {
    root.unmount()
  }


  useEffect(() => {

    // useEffect с [] выполняется один раз после монтирования компонента
    //
    // Создаём ресурс — часы
    const timerId = setInterval(
      () => setState({
        date: new Date()
      }),
      1000
    )

    console.log('componentDidMount()')


    // Cleanup-функция выполняется при удалении компонента
    return () => {

      clearInterval(timerId)

      console.log(
        'componentWillUnmount()'
      )
    }

  }, []) // эффект выполняется только один раз


  return (
    <div>

      <h2>
        Текущее время:{' '}
        {state.date.toLocaleTimeString()}
      </h2>

      <button onClick={unmount}>
        Удалить компонент
      </button>

    </div>
  )
}

// 3. Доп пример без root.unmount(),
// так как в настоящем Реакт приложении
// вряд ли понадобится размонтировать
// весь React root
class Clock3 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date: new Date()
    }

    this.unmount = this.unmount.bind(this)
  }

  unmount() {
    this.props.root.unmount()
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId)

    console.log('componentWillUnmount()')
  }

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


function App({ root }) {

  const [show, setShow] = useState(true) // Для третьего примера, в котором происходит удаление только одного компонента, а не очищение всего React root.

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

        <Clock root={root} />

      </section>

      <section>

        <h2>
          2. Functional Component
        </h2>

        <p>
          В функциональном компоненте создание
          и освобождение ресурса выполняется
          через useEffect().
        </p>

        <FunctionalClock root={root} />

      </section>

      <section>

      {show && <Clock3 />}

      <button onClick={() => setShow(false)}>
        Удалить только эти часы
      </button>

    </section>
    </>
  )
}

export default App