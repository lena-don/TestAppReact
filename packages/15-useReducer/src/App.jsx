import { useReducer } from 'react'

// reducer определяет, как изменяется состояние;
// state — текущее состояние;
// action — объект с информацией о действии.
function reducer(state, action) {

  switch (action.type) { // action.type — свойство объекта action, в котором указано, какое именно действие нужно выполнить (или: С помощью свойства action.type можно определить тип переданного действия)

    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }

// Если action.type неизвестен — возвращаем текущее состояние без изменений.
    default:
      return state
  }
}

function Counter() {
  // useReducer возвращает:
  // state — текущее состояние
  // dispatch — функция для отправки действия reducer
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      {/* dispatch передаёт reducer действие decrement */}
      <button onClick={() => dispatch({ type: 'decrement' })}>
        −
      </button>
      <span>{state.count}</span>
      {/* dispatch передаёт reducer действие increment */}
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </div>
  )
}


// ДОП ЗАДАНИЕ 1:
// Добавить возможность сбросить счётчик обратно в 0.
//
// Добавляем новый case в reducer и кнопку, которая отправляет action с type: 'reset'.

function counterWithResetReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }

    case 'incrementFive':
      return { count: state.count + 5 }

    case 'decrementTwo':
      return { count: state.count - 2 }

    case 'reset':
      return { count: 0 }

    default:
      return state
  }
}

function CounterWithReset() {
  const [state, dispatch] = useReducer(
    counterWithResetReducer,
    { count: 0 }
  )

  return (
    <div><p>Значение: {state.count}</p>

      <button onClick={() => dispatch({ type: 'decrement' })}>
        -1
      </button>

      <button onClick={() => dispatch({ type: 'increment' })}>
        +1
      </button>

      <button onClick={() => dispatch({ type: 'incrementFive' })}>
        +5
      </button>

      <button onClick={() => dispatch({ type: 'decrementTwo' })}>
        -2
      </button>

      <button onClick={() => dispatch({ type: 'reset' })}>
        Сбросить
      </button>
    </div>
  )
}


// ДОП ЗАДАНИЕ 2:
// Рассматриваем action как объект с более чем одним свойством
function counterWithAmountReducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        count: state.count + action.amount
      }

    case 'reset':
      return {
        count: 0
      }

    default:
      return state
  }
}

function CounterWithAmount() {
  const [state, dispatch] = useReducer(
    counterWithAmountReducer,
    { count: 0 }
  )

  return (
    <div>
      <p>Значение: {state.count}</p>

      <button onClick={() => dispatch({ type: 'change', amount: 1}) }>
        +1
      </button>

      <button onClick={() => dispatch({ type: 'change', amount: 2 })}>
         +2
      </button>

      <button onClick={() => dispatch({ type: 'change', amount: 5 })}>
        +5
      </button>

      <button onClick={() => dispatch({ type: 'change', amount: -1 })}>
        -1
      </button>

      <button onClick={() => dispatch({ type: 'change', amount: -2 })}>
        -2
      </button>

      <button onClick={() => dispatch({ type: 'change', amount: -5})}>
        -5
      </button>

      <button onClick={() => dispatch({ type: 'reset' })}>
        Сбросить
      </button>
    </div>
  )
}


function App() {
  return (
    <>

      <section>
        <h2>Счётчик</h2>
        <Counter />
      </section>

      <section>
        <h2>Доп задание 1: счётчик со сбросом и доп действиями</h2>
        <CounterWithReset />
      </section>

      <section>
        <h2>Доп задание 2: счётчик с более чем одним свойством в объекте action</h2>
        <CounterWithAmount />
      </section>
    </>
  )
}

export default App