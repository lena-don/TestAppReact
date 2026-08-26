import { createRoot } from 'react-dom/client'
import './index.css'

// Props — объект со свойствами, которые передаются
// в компонент при его использовании.

// Функциональный подход:
function Person(props) {
  return (
    <div className="person">
      <p>Имя: {props.name}</p>
      <p>Возраст: {props.age}</p>
    </div>
  )
}

// Props можно деструктурировать прямо в параметрах функции.
// И Можно использовать стрелочную функцию:
const PersonDestructured = ({ name, age }) => {
  return (
    <div className="person">
      <p>Имя: {name}</p>
      <p>Возраст: {age}</p>
    </div>
  )
}

// Props могут содержать не только отдельные значения,
// но и целый объект.
function PersonWithUser({ user }) {
  return (
    <div className="person">
      <p>Имя: {user.name}</p>
      <p>Возраст: {user.age}</p>
    </div>
  )
}

// Props могут содержать функцию.
function PersonWithFunction(props) {
  return (
    <div className="person">
      <h2>{props.say(props.name)}</h2>
    </div>
  )
}

// Функция, которую передадим компоненту через prop.
function sayHello(name) {
  return `Привет, меня зовут ${name}`
}

// Значения по умолчанию можно задать
// непосредственно при деструктуризации параметров.
function PersonWithDefaults({
  name = 'Маша',
  age = 22,
}) {
  return (
    <div className="person">
      <p>
        <b>Имя:</b> {name}
      </p>
      <p>
        <b>Возраст:</b> {age}
      </p>
    </div>
  )
}

// Дополнительный компонент, чтобы вывести несколько разных товаров, используя один и тот же компонент.
function Product(props) {
  return (
    <div className="person">
      <p>Имя: {props.name}</p>
      <p>Цена: {props.price}</p>
      <p>Категория: {props.category}</p>
    </div>
  )
}

// Данные можно хранить в обычных переменных.
const personName = 'Ваня'
const personAge = 46

// Можно передавать вычисляемые выражения.
// Например, возраст вычисляется прямо в JSX.
const calculatedAge = 2026 - 1978

// Целый объект можно передать одним prop.
const masha = {
  name: 'Маша',
  age: 42,
}

createRoot(document.getElementById('root')).render(
  <div>
    <section>
      <h2>1. Передача отдельных значений</h2>

      <Person name="Маша" age="42" />
    </section>

    <section>
      <h2>2. Передача переменных</h2>

      <Person
        name={personName}
        age={personAge}
      />
    </section>

    <section>
      <h2>3. Деструктуризация props</h2>

      <PersonDestructured
        name="Элина"
        age={30}
      />
    </section>

    <section>
      <h2>4. Передача объекта</h2>

      <PersonWithUser user={masha} />
    </section>

    <section>
      <h2>5. Вычисляемое значение</h2>

      <Person
        name="Ваня"
        age={calculatedAge}
      />
    </section>

    <section>
      <h2>6. Передача функции</h2>

      <PersonWithFunction
        name="Маша"
        say={sayHello}
      />
    </section>

    <section>
      <h2>7. Значения по умолчанию</h2>

      <p>Переданы оба значения:</p>
      <PersonWithDefaults
        name="Ваня"
        age={46}
      />

      <p>age отсутствует → используется 22:</p>
      <PersonWithDefaults
        name="Ваня"
      />

      <p>name и age отсутствуют → используются значения по умолчанию:</p>
      <PersonWithDefaults />
    </section>

    <section>
      <h2>Дополнительно: переиспользование компонента с передачей ему разных пропсов</h2>

      <Product name="Огурцы" price="130" category="овощи"/>
      <Product name="Картошка" price="60" category="овощи"/>
      <Product name="ЯБлоки" price="100" category="фрукты"/>
      <Product name="Кабачки" category="овощи"/>
      <Product name="Бананы" price="110" color="желтый" category="фрукты"/>
    </section>
  </div>,
)