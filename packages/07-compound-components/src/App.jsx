import { Component } from 'react'

function App() {
    // Данные передаются в родительский компонент ItemsList.
    // Каждый элемент массива станет отдельным компонентом Item.
    const topics = {
    title: 'Темы React',
    items: [
        'JSX',
        'Компоненты',
        'Props',
        'События',
        'Состояние',
        'Хуки',
    ],
    }

    // для доп задания:
    const categories = {
    title: 'Категории',
    items: [
        'Коты',
        'Собаки',
        'Хомяки',
        'Попугаи',
    ],
    }

    // Дочерний компонент.
    //
    // Item отвечает только за отображение одного! элемента списка.
    // Данные получает от родительского компонента через props.
    function Item(props) {
    return <li>{props.name}</li>
    }

    // Родительский (составной) компонент.
    //
    // то есть ItemsList сам содержит другой компонент — Item,
    // поэтому такой компонент называется составным.
    function ItemsList(props) {
    return (
        <>
        <h2>{props.data.title}</h2>

        <ul>
            {
            // Для каждого элемента массива создаём
            // отдельный компонент Item.
            //
            // key нужен, чтобы отличать элементы
            // списка друг от друга.
            props.data.items.map((item) => (
                <Item
                key={item}
                name={item}
                />
            ))
            }
        </ul>
        </>
    )
    }

    // Для доп задания: Создать компонент CategoriesList,
    // который получает объект с категориями
    // и использует тот же компонент Item для отображения
    // каждого элемента.

    function CategoriesList(props) {
    return (
        <div>
        <h2>{props.data.title}</h2>

        <ul>
            {props.data.items.map((item) => (
            <Item
                key={item}
                name={item}
            />
            ))}
        </ul>
        </div>
    )
    }

    // ======================================================
    // Тут вариант с компонентами-классами
    // ======================================================

    class ItemClass extends Component {
    render() {
        // В классовом компоненте props находятся
        // в this.props:
        return <li>{this.props.name}</li>
    }
    }

    class ItemsListClass extends Component {
    render() {
        return (
        <>
            <h2>{this.props.data.title}</h2>

            <ul>
            {
                // Для каждого элемента массива создаём
                // отдельный компонент ItemClass:
                this.props.data.items.map(function (item) {
                return (
                    <ItemClass
                    key={item}
                    name={item}
                    />
                )
                })
            }
            </ul>
        </>
        )
    }
    }

    return (
    <div>
        <section>
        <h4>Функциональные компоненты</h4>
        {/* Передаём весь объект topics */}
        {/* в родительский компонент через prop data: */}
        <ItemsList data={topics} />
        </section>

        <section>
        <h4>Классовые компоненты</h4>
        <ItemsListClass data={topics} />
        </section>

        <section>
        <h4>И ещё список-составной-компонент</h4>
        <CategoriesList data={categories} />
        </section>
    </div>
    )
}

export default App