import { useState } from "react";
import React from "react";

// 1. Отдельный компонент InputField

// Вся логика одного поля вынесена из UserForm в отдельный переиспользуемый компонент.
//
// Через props передаём:
// - header — подпись поля
// - type — тип input
// - value — текущее значение
// - setValue — функция изменения state
// - validate — функция проверки значения

function InputField(props) {
  // Цвет границы зависит от результата валидации
  const [color, setColor] = useState(
    props.validate(props.value) ? "green" : "red"
  );

  const onChange = (e) => {
    const val = e.target.value;

    // Меняем state родительского компонента
    props.setValue(val);

    // Проверяем новое значение
    setColor(
      props.validate(val) ? "green" : "red"
    );
  };

  return (
    <p>
      <label>{props.header}:</label>
      <br />

      <input
        type={props.type}
        value={props.value}
        onChange={onChange}
        style={{ borderColor: color }}
      />
    </p>
  );
}


// 2. UserForm
//
// Сам UserForm теперь отвечает только за:
// - состояние имени и возраста
// - функции валидации
// - отправку формы
//
// Работа конкретного input находится в InputField.

function UserForm() {
  const validateAge = (val) => val > 0;
  const validateName = (val) => val.length > 2;

  const [name, setName] = useState("");
  const [age, setAge] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перед отправкой ещё раз проверка обоих значений
    if (
      validateName(name) &&
      validateAge(age)
    ) {
      console.log(
        `Имя: ${name}, возраст: ${age}`
      );
    } else {
      console.log("Некорректные данные");
    }
  };

  return (
    <section>
      <h2>1. Форма с отдельным компонентом поля</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          header="Имя"
          validate={validateName}
          type="text"
          value={name}
          setValue={setName}
        />

        <InputField
          header="Возраст"
          validate={validateAge}
          type="number"
          value={age}
          setValue={setAge}
        />

        <input
          type="submit"
          value="Отправить"
        />
      </form>

      <p>
        Один InputField используется для разных полей.
      </p>
    </section>
  );
}


// 3. Классовый компонент InputField
//
// Вариант из урока на class-компонентах.
// Здесь цвет границы хранится в this.state.

class ClassInputField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.validate(props.value) ? "green" : "red",
    };
  }

  onChange = (e) => {
    const val = e.target.value;

    const isValid = this.props.validate(val);

    // Меняем state родительского компонента
    this.props.setValue(val);

    // И state дочернего компонента
    this.setState({
      color: isValid ? "green" : "red",
    });
  };

  render() {
    return (
      <p>
        <label>{this.props.header}:</label>
        <br />

        <input
          type={this.props.type}
          value={this.props.value}
          onChange={this.onChange}
          style={{
            borderColor: this.state.color,
          }}
        />
      </p>
    );
  }
}


// 4. UserForm на классовом компоненте

class ClassUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: 0,
    };
  }

  validateAge(val) {
    return val > 0;
  }

  validateName(val) {
    return val.length > 2;
  }

  setName = (val) => {
    this.setState({
      name: val,
    });
  };

  setAge = (val) => {
    this.setState({
      age: val,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.validateName(this.state.name) &&
      this.validateAge(this.state.age)
    ) {
      console.log(
        `Имя: ${this.state.name}, возраст: ${this.state.age}`
      );
    } else {
      console.log("Некорректные данные");
    }
  };

  render() {
    return (
      <section>
        <h2>2. Классовые компоненты</h2>

        <form onSubmit={this.handleSubmit}>
          <ClassInputField
            header="Имя"
            validate={this.validateName}
            type="text"
            value={this.state.name}
            setValue={this.setName}
          />

          <ClassInputField
            header="Возраст"
            validate={this.validateAge}
            type="number"
            value={this.state.age}
            setValue={this.setAge}
          />

          <input
            type="submit"
            value="Отправить"
          />
        </form>
      </section>
    );
  }
}


// 5. NameField — отдельный классовый компонент
//
// Здесь каждый компонент сам хранит:
// - value
// - valid
//
// А родитель получает доступ к ним через ref.

class NameField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      valid: this.validate(props.value),
    };
  }

  validate(val) {
    return val.length > 2;
  }

  onChange = (e) => {
    const val = e.target.value;
    const isValid = this.validate(val);

    this.setState({
      value: val,
      valid: isValid,
    });
  };

  render() {
    return (
      <p>
        <label>Имя:</label>
        <br />

        <input
          value={this.state.value}
          onChange={this.onChange}
          style={{
            borderColor: this.state.valid
              ? "green"
              : "red",
          }}
        />
      </p>
    );
  }
}

// 6. AgeField — отдельный классовый компонент

class AgeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      valid: this.validate(props.value),
    };
  }

  validate(val) {
    return val > 0;
  }

  onChange = (e) => {
    const val = e.target.value;
    const isValid = this.validate(val);

    this.setState({
      value: val,
      valid: isValid,
    });
  };

  render() {
    return (
      <p>
        <label>Возраст:</label>
        <br />

        <input
          type="number"
          value={this.state.value}
          onChange={this.onChange}
          style={{
            borderColor: this.state.valid
              ? "green"
              : "red",
          }}
        />
      </p>
    );
  }
}


// 7. UserForm с createRef
//
// Здесь родитель не хранит значения полей.
//
// Вместо этого он создаёт ссылки на дочерние
// классовые компоненты и получает через ref их state.

class RefUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.nameField = React.createRef();
    this.ageField = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Получаем состояние дочерних компонентов
    const nameField = this.nameField.current;
    const ageField = this.ageField.current;

    const nameIsValid = nameField.state.valid;
    const ageIsValid = ageField.state.valid;

    if (nameIsValid && ageIsValid) {
      const name = nameField.state.value;
      const age = ageField.state.value;

      console.log(
        `Имя: ${name}, возраст: ${age}`
      );
    } else {
      console.log("Некорректные данные");
    }
  };

  render() {
    return (
      <section>
        <h2>3. createRef и дочерние компоненты</h2>

        <form onSubmit={this.handleSubmit}>
          {/* ref указывает на экземпляр дочернего компонента */}
          <NameField
            value=""
            ref={this.nameField}
          />

          <AgeField
            value="1"
            ref={this.ageField}
          />

          <input
            type="submit"
            value="Отправить"
          />
        </form>

        <p>
          UserForm получает состояние NameField и AgeField через ref.
        </p>
      </section>
    );
  }
}


export default function App() {
  return (
    <main>

      <UserForm />

      <ClassUserForm />

      <RefUserForm />

    </main>
  );
}