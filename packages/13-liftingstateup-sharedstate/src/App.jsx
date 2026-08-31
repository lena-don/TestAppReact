import { useState, Component } from 'react'


// 1. Функциональные компоненты
// Поднятие состояния в общий родительский компонент

function User() {

  // Состояние хранится вот здесь — в общем родителе
  const [name, setName] = useState('Анна')

  return (
    <>
      {/* Передаём состояние дочернему компоненту */}
      <Message name={name} />

      {/* Передаём и значение, и функцию его изменения */}
      <UserEdit
        name={name}
        setName={setName}
      />
    </>
  )
}


// Компонент только отображает полученное состояние
function Message(props) {

  return (
    <div>
      <h3>
        Привет, {props.name}!
      </h3>
    </div>
  )
}


// Компонент получает:
// props.name   — текущее значение
// props.setName — функцию изменения состояния
function UserEdit(props) {

  return (
    <div>

      <input
        type="text"
        value={props.name}

        // Изменяем состояние родителя
        // при каждом изменении поля:
        onChange={(e) =>
          props.setName(e.target.value)
        }
      />

      <h3>
        Текущее имя: {props.name}
      </h3>

    </div>
  )
}


// 2. Классовые компоненты

class UserClass extends Component {

  constructor(props) {

    super(props) // Повторение: Вызов super(props)
    // в React нужен для того, чтобы инициализировать
    // родительский класс React.Component и получить
    // корректный доступ к this.props внутри
    // конструктора классового компонента

    // Общее состояние хранится
    // в родительском компоненте UserClass.
    this.state = {
      name: 'Мария'
    }

    this.setSharedState =
      this.setSharedState.bind(this) // Опять!!!!
  }


  // Метод изменяет общее состояние.
  setSharedState(value) {

    this.setState({
      name: value
    })
  }


  render() {

    return (
      <>
        {/* Передаём всё состояние */}
        <MessageClass
          state={this.state}
        />

        {/* Передаём состояние и функцию изменения */}
        <UserEditClass
          state={this.state}
          setState={this.setSharedState}
        />
      </>
    )
  }
}


// Компонент получает состояние через props.
class MessageClass extends Component {

  render() {

    return (
      <div>

        <h3>
          Привет, {this.props.state.name}!
        </h3>

      </div>
    )
  }
}


// Компонент редактирования:
class UserEditClass extends Component {

  constructor(props) {

    super(props)

    this.onStateChanged =
      this.onStateChanged.bind(this)
  }


  onStateChanged(e) {

    // Передаём введённое значение
    // обратно родительскому компоненту.
    this.props.setState(
      e.target.value
    )
  }


  render() {

    return (
      <div>

        <input
          type="text"
          value={this.props.state.name}
          onChange={this.onStateChanged}
        />

        <h3>
          Текущее имя: {this.props.state.name}
        </h3>

      </div>
    )
  }
}


// ДОП ЗАДАНИЕ:
//
// Сделать общее состояние для двух компонентов:
// ColorPreview — показывает выбранный цвет
// ColorEdit    — изменяет цвет.
// Состояние должно находиться в ближайшем общем
// родителе ColorApp.

function ColorApp() {

  const [color, setColor] = useState('синий')

  return (
    <div>

      <ColorPreview color={color} />

      <ColorEdit
        color={color}
        setColor={setColor}
      />

    </div>
  )
}


// Только отображает состояние:
function ColorPreview(props) {

  return (
    <p>
      Выбранный цвет: <strong>{props.color}</strong>
    </p>
  )
}


// Только изменяет состояние,
// которое принадлежит родителю:
function ColorEdit(props) {

  return (
    <select
      value={props.color}
      onChange={(e) =>
        props.setColor(e.target.value)
      }
    >
      <option value="синий">Синий</option>
      <option value="зелёный">Зелёный</option>
      <option value="красный">Красный</option>
    </select>
  )
}


function App() {

  return (
    <main>

      <section>

        <h2>
          1. Функциональные компоненты
        </h2>

        <p>
          Состояние находится в User,
          а Message и UserEdit получают его через props.
        </p>

        <User />

      </section>

      <section>

        <h2>
          2. Классовые компоненты
        </h2>

        <p>
          Та же идея реализована через state
          и методы class component.
        </p>

        <UserClass />

      </section>

      <section>

        <h2>
          Доп задание — общее состояние цвета
        </h2>

        <ColorApp />

      </section>

    </main>
  )
}


export default App