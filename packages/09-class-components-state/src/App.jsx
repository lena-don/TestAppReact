import { Component } from 'react'

function App() {
    // Простое состояние класса:
    class Hello extends Component {
    constructor(props) {    // state задаётся в constructor класса
        super(props)          //js-напоминание: super(props) нужен для того, чтобы инициализировать конструктор базового класса React.Component и получить корректный доступ к this.props внутри конструктора классового компонента.
        this.state = {
        message: 'Привет, React!',
        }
    }

    render() {
        return (
        <section>
            <h2>1. Простое состояние</h2>
            {/* Получаем состояние через this.state */}
            <h3>{this.state.message}</h3>
        </section>
        )
    }
    }

    // При определении конструктора компонента в нем
    // должен вызываться конструктор базового класса, 
    // в который передается объект props.
    class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
        name: 'Анна',
        age: 30,      // можно определять любое кол-во переменных состояния
        }
    }

    render() {
        return (
        <section>
            <h2>2. Несколько переменных состояния</h2>

            <h3>Имя: {this.state.name}</h3>
            <h3>Возраст: {this.state.age}</h3>
        </section>
        )
    }
    }

    // Для обновления состояния вызывается функция setState():
    class EditableHello extends Component {
    constructor(props) {
        super(props)

        this.state = {
        message: 'Привет, React!',
        }

        // Привязываем метод к экземпляру класса.
        // Благодаря этому внутри messageChange
        // this будет указывать на компонент.
        this.messageChange = this.messageChange.bind(this) // много this и bind — приходиться напрячься, чтобы вникнуть в такую строку
    }

    messageChange(event) {
        // event.target.value — значение input (данные извне).
        //
        // функция setState изменяет state и вызывает
        // повторный рендер компонента.
        this.setState({
        message: event.target.value,
        })
    }

    render() {
        return (
        <section>
            <h2>3. Изменение состояния</h2>

            <h3>{this.state.message}</h3>

            <input
            type="text"
            value={this.state.message}
            onChange={this.messageChange}
            />
        </section>
        )
    }
    }

    // Несколько последовательных setState

    class ClickButtonWrong extends Component {  // наглядный ошибочный вариант
    constructor(props) {
        super(props)

        this.state = {
        counter: 0,
        }

        this.press = this.press.bind(this)
    }

    press() {
        // В этом варианте два setState используют
        // одно и то же текущее значение this.state.counter.
        //
        // Поэтому при одном клике значение фактически
        // увеличивается только на 1.
        this.setState({
        counter:
            this.state.counter +
            parseInt(this.props.increment),
        })

        this.setState({
        counter:
            this.state.counter +
            parseInt(this.props.increment),
        })
    }

    render() {
        return (
        <section>
            <h2>4. (неверное решение)</h2>

            <button onClick={this.press}>
            Увеличить
            </button>

            <div>
            Счётчик: {this.state.counter}
            <br />
            Инкремент: {this.props.increment}
            {/* Инкремент — увеличение числа на единицу */}
            </div>
        </section>
        )
    }
    }

    // Функциональная форма setState
    class ClickButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
        counter: 0,
        }

        this.press = this.press.bind(this)
    }

    // Эта функция получает:
    // prevState — предыдущее состояние
    // props     — текущие props
    //
    // Возвращает новое состояние.
    incrementCounter(prevState, props) {
        return {
        counter:
            prevState.counter +
            parseInt(props.increment),
        }
    }

    press() {
        this.setState(this.incrementCounter)
        this.setState(this.incrementCounter) // это повтрение — функция setState() вызывается два раза
    }

    render() {
        return (
        <section>
            <h2>5. Функциональная форма setState</h2>

            <button onClick={this.press}>
            Увеличить дважды
            </button>

            <div>
            Счётчик: {this.state.counter}
            <br />
            Инкремент: {this.props.increment}
            </div>
        </section>
        )
    }
    }

    return (
    <>

        <Hello />

        <User />

        <EditableHello />

        <ClickButtonWrong
        increment="1"
        />

        <ClickButton
        increment="1"
        />

    </>
    )
}

export default App