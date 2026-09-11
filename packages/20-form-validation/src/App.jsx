import { useState } from "react";
import React from "react";

// 1. Валидация почты

function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Сохраняем введённое значение
    setEmail(e.target.value);

    // Проверяем введённый email
    if (!emailRegex.test(e.target.value)) {
      setError("Некорректный email");
    } else {
      setError(""); // Сбрасываем ошибку, если всё в порядке
    }
  };

  return (
    <section>
      <h2>1. Валидация почты</h2>

      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
      />

      {/* Выводит ошибку, если она есть */}
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "green" }}>{email}</p>
      )}
    </section>
  );
}


// 2. Валидация почты в клссовом

class ClassEmailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: "",
    };
  }

  handleChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(e.target.value)) {
      this.setState({
        error: "Некорректный email",
        email: e.target.value,
      });
    } else {
      this.setState({
        error: "",
        email: e.target.value,
      });
    }
  };

  render() {
    return (
      <section>
        <h2>2. Валидация почты в классовом компоненте</h2>

        <input
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email"
        />

        {this.state.error ? (
          <p style={{ color: "red" }}>
            {this.state.error}
          </p>
        ) : (
          <p style={{ color: "green" }}>
            {this.state.email}
          </p>
        )}
      </section>
    );
  }
}


// 3. Валидация всей формы

function UserForm(props) {
  // Функции проверки отдельных полей
  const validateAge = (age) => age >= 0;
  const validateName = (name) => name.length > 2;

  // Значения формы
  const [name, setName] = useState(props.name);
  const [age, setAge] = useState(props.age);

  // Результаты валидации
  const [nameValid, setNameValid] = useState(
    validateName(props.name)
  );

  const [ageValid, setAgeValid] = useState(
    validateAge(props.age)
  );

  // Проверяем возраст при изменении
  const onAgeChange = (e) => {
    setAge(e.target.value);
    setAgeValid(validateAge(e.target.value));
  };

  // Проверяем имя при изменении
  const onNameChange = (e) => {
    setName(e.target.value);
    setNameValid(validateName(e.target.value));
  };

  // Отправляем форму, только если оба поля валидны
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameValid && ageValid) {
      console.log(
        `Имя: ${name} Возраст: ${age}`
      );
    } else {
      console.log("Данные некорректны");
    }
  };

  return (
    <section>
      <h2>3. Валидация всей формы</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Имя:</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={onNameChange}
            style={{
              borderColor: nameValid
                ? "green"
                : "red",
            }}
          />
        </p>

        <p>
          <label>Возраст:</label>
          <br />

          <input
            type="number"
            value={age}
            onChange={onAgeChange}
            style={{
              borderColor: ageValid
                ? "green"
                : "red",
            }}
          />
        </p>

        <input
          type="submit"
          value="Отправить"
        />
      </form>
    </section>
  );
}


// 4. Валидация всей формы в классовом компоненте

class ClassUserForm extends React.Component {
  constructor(props) {
    super(props);

    // Проверяем первоначальные значения
    const nameIsValid = this.validateName(props.name);
    const ageIsValid = this.validateAge(props.age);

    this.state = {
      name: props.name,
      age: props.age,
      nameValid: nameIsValid,
      ageValid: ageIsValid,
    };
  }

  validateAge = (age) => age >= 0;

  validateName = (name) => name.length > 2;

  onAgeChange = (e) => {
    const valid = this.validateAge(
      e.target.value
    );

    this.setState({
      age: e.target.value,
      ageValid: valid,
    });
  };

  onNameChange = (e) => {
    const valid = this.validateName(
      e.target.value
    );

    this.setState({
      name: e.target.value,
      nameValid: valid,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.nameValid &&
      this.state.ageValid
    ) {
      console.log(
        `Имя: ${this.state.name} Возраст: ${this.state.age}`
      );
    } else {
      console.log("Данные некорректны");
    }
  };

  render() {
    // Цвет границ зависит от результата проверки
    const nameColor = this.state.nameValid
      ? "green"
      : "red";

    const ageColor = this.state.ageValid
      ? "green"
      : "red";

    return (
      <section>
        <h2>4. Валидация всей формы в классовом компоненте</h2>

        <form onSubmit={this.handleSubmit}>
          <p>
            <label>Имя:</label>
            <br />

            <input
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              style={{ borderColor: nameColor }}
            />
          </p>

          <p>
            <label>Возраст:</label>
            <br />

            <input
              type="number"
              value={this.state.age}
              onChange={this.onAgeChange}
              style={{ borderColor: ageColor }}
            />
          </p>

          <input
            type="submit"
            value="Отправить"
          />
        </form>
      </section>
    );
  }
}


// 5. Доп задание:
// Пароль должен содержать минимум 6 символов

function PasswordTask() {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] =
    useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    setPassword(value);
    setPasswordValid(value.length >= 6);
  };

  return (
    <section>
      <h2>5. Доп задание: проверка пароля</h2>

      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Пароль"
        style={{
          borderColor: passwordValid
            ? "green"
            : "red",
        }}
      />

      <p>
        {passwordValid
          ? "Пароль подходит"
          : "Минимум 6 символов"}
      </p>
    </section>
  );
}


export default function App() {
  return (
    <main>

      <EmailForm />

      <ClassEmailForm />

      <UserForm name="" age="0" />

      <ClassUserForm name="" age="0" />

      <PasswordTask />

    </main>
  );
}