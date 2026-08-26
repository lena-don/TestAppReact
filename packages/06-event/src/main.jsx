import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 1. Обычная функция-обработчик.
// Имя события пишется в camelCase: onClick.
function press() {
  console.log('Оп, нажали!')
}

// 2. Обработчик может быть написан прямо в JSX.
//
// Правильно:
// onClick={() => console.log('Clicked')}
//
// Неправильно:
// onClick={console.log('Clicked')}
function InlineButton() { // Inline-функция в React — это функция, которая создается прямо во время рендеринга внутри JSX
  return (
    <button onClick={() => console.log('Нажали!')}>
      Встроенный обработчик
    </button>
  )
}

// 3. Если обработчику нужно передать параметры,
// то используется стрелочная функция.
function pressMessage(message) {
  console.log(message)
}

function MessageButton() {
  return (
    <button onClick={() => pressMessage('Кликнуто!')}>
      Отправить сигнал кликнутости
    </button>
  )
}

// 4. Внутри функционального компонента:
function ClickButton() {
  function handleClick() {
    console.log('Кликнуто по функциональному компоненту')
  }

  return (
    <button onClick={handleClick}>
      Кликни
    </button>
  )
}

// 5. В обработчик React передаёт объект события.
//
// e — информация о произошедшем событии.
function EventButton() {
  function handleClick(e) {
    console.log(e)
    console.log('Event type:', e.type)
    console.log('Clicked element:', e.currentTarget)
  }

  return (
    <button onClick={handleClick}>
      Показать событие
    </button>
  )
}

// 6. Передача собственных параметров + события.
//
// Здесь у функции два аргумента:
// message — наш параметр,
// и. параметр e - это и есть информация о событии,
// которая передается в обработчик системой и которую
// мы можем использовать при обработке.
function print(message, e) {
  console.log(message)
  console.log(e)
}

function ParametersButton() {
  return (
    <button
      onClick={(e) => print('Кнопка была нажата', e)}
    >
      Параметры + Событие
    </button>
  )
}

// 7. Классовый компонент:
class ClassClickButton extends Component {
  constructor(props) {
    super(props)

    this.press = this.press.bind(this) // this — ключевое слово, указывающее на текущий объект
  }

  press() {
    console.log('Привет из классового компонента!')
  }

  render() {
    return (
      <button onClick={this.press}>
        Компонент-класс
      </button>
    )
  }
}

createRoot(document.getElementById('root')).render(
  <main>
    <section>
      <h2>1. Функция-обработчик</h2>

      {/* press передаётся как функция */}
      <button onClick={press}>
        Клик
      </button>
    </section>

    <section>
      <h2>2. Inline-обработчик</h2>

      <InlineButton />
    </section>

    <section>
      <h2>3. Передача параметров</h2>

      <MessageButton />
    </section>

    <section>
      <h2>4. Обработчик в функциональном компоненте</h2>

      <ClickButton />
    </section>

    <section>
      <h2>5. Объект события</h2>

      <EventButton />
    </section>

    <section>
      <h2>6. Свои параметры + событие</h2>

      <ParametersButton />
    </section>

    <section>
      <h2>7. Классовый компонент</h2>

      <ClassClickButton />
    </section>
  </main>,
)