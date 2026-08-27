import { Component, useEffect, useState } from 'react'

// 1. Жизненный цикл class component
class ClickButton extends Component {

    constructor(props) { // 1ый этап — constructor(props): конструктор, в котором происходит начальная инициализация компонента
        super(props);

        // Начальное состояние компонента
        this.state = {
            class: "off",
            label: "Нажми (class component)"
        };

        // Привязываем обработчик к объекту компонента
        this.press = this.press.bind(this); // Это всегда сбивает с толку

        console.log("constructor");
    }


    // Вызывается перед рендерингом компонента.
    // Может вернуть объект для обновления state
    // или null, если обновлять state не нужно.
    static getDerivedStateFromProps(props, state) { // 2ой этап

        console.log("getDerivedStateFromProps()");

        return null;
    }


    // Вызывается после первого рендеринга.
    // Здесь можно выполнять действия после появления
    // компонента в DOM.
    componentDidMount() { // 4ий этап (3ий — рендеринг)

        console.log("componentDidMount()");
    }


    // Вызывается перед удалением компонента из DOM.
    // Здесь обычно освобождают ресурсы.
    componentWillUnmount() { // 5ый этап

        console.log("componentWillUnmount()");
    }


    // Вызывается при обновлении props или state.
    // true — компонент можно обновить.
    // false — обновление отменяется.
    shouldComponentUpdate() { // Доп этап, если в компоненте происходят обновления

        console.log("shouldComponentUpdate()");

        return true;
    }


    // Вызывается непосредственно перед обновлением.
    // Можно получить информацию о DOM до изменения.
    getSnapshotBeforeUpdate(prevProps, prevState) { // Доп этап, если в компоненте происходят обновления

        console.log("getSnapshotBeforeUpdate()");

        return null;
    }


    // Вызывается после обновления компонента.
    componentDidUpdate() { // Доп этап, если в компоненте происходят обновления

        console.log("componentDidUpdate()");
        console.log("=========================");
    }


    // Обработчик нажатия на кнопку:
    press() {

        const className =
            (this.state.class === "off")
                ? "on"
                : "off";

        // Меняем state → компонент обновится
        this.setState({
            class: className
        });
    }


    render() {

        console.log("render()"); // 3ий этап

        return (
            <button
                onClick={this.press}
                className={this.state.class}
            >
                {this.state.label}
            </button>
        );
    }
}


// 2. Жизненный цикл функционального компонента

function FunctionalClickButton() {

    const [buttonClass, setButtonClass] =
        useState("off");

    // Это состояние используется для имитации
    // конструктора class component.
    const [didMount, setDidMount] =
        useState(false);


    // Имитация constructor:
    if (!didMount) {

        console.log(
            "functional: constructor"
        );
    }


    // componentDidMount +
    // componentWillUnmount:

    useEffect(() => {

        console.log(
            "functional: componentDidMount"
        );

        // После первого запуска помечаем компонент как смонтированный
        setDidMount(true);


        // Cleanup выполняется перед удалением компонента из DOM
        return () => {

            console.log(
                "functional: componentWillUnmount"
            );
        };

    }, []);


    // Аналог componentDidUpdate:

    useEffect(() => {

        console.log(
            "functional: componentDidUpdate"
        );
        console.log("=========================");

    });


    // Обработчик кнопки
    function press() {

        const className =
            (buttonClass === "off")
                ? "on"
                : "off";

        setButtonClass(className);
    }


    return (
        <>
            {/* Аналог render(): код JSX выполняется
                при рендеринге компонента */}
            {console.log("functional: render()")}

            <button
                onClick={press}
                className={buttonClass}
            >
                Переключить
            </button>
        </>
    );
}

function App() {

    return (
        <>

            <h1>Жизненный цикл компонентов React</h1>

            <section>

                <h2>
                    1. Жизненный цикл class component
                </h2>

                <p>
                    Открыть консоль браузера и нажать кнопку, чтобы увидеть порядок вызова методов.
                </p>

                <ClickButton />

            </section>

            <section>

                <h2>
                    2. Жизненный цикл функционального
                    компонента
                </h2>

                <p>
                    Здесь аналогичные этапы отслеживаются
                    с помощью useEffect.
                </p>

                <FunctionalClickButton />

            </section>

        </>
    );
}

export default App