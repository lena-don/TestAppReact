import { useState } from "react";
import React from "react";


// 1. Функциональная пошаговая форма

// В одном объекте formData хранятся:
// - currentStep — текущий шаг
//- username — имя
// - email — email
// - password — пароль

function UserForm() {
  const [formData, setFormData] = useState({
    currentStep: 1,
    username: "",
    email: "",
    password: "",
  });

  // Общий обработчик всех полей формы.
  // name input совпадает с именем свойства в formData.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      username,
      password,
    } = formData;

    alert(
      `Введённые данные:
      Имя: ${username}
      Email: ${email}
      Пароль: ${password}`
    );
  };

  // Переход вперёд
  const _next = () => { // ??? В примерах кода часто ставят _ в начале имени,
  // чтобы визуально отделить внутренний вспомогательный метод
  // от других методов.
  // _ в начале не делает функцию приватной!!!
  // и не даёт JavaScript какого-то особого поведения.
  // Это только часть имени.
    let currentStep = formData.currentStep;

    currentStep =
      currentStep >= 2
        ? 3
        : currentStep + 1;

    setFormData({
      ...formData, //оператор spread (...)
      // В текущем контексте означает: взять все свойства
      // существующего объекта и скопировать их в новый объект.
      currentStep,
    });
  };

  // Переход назад
  const _prev = () => {
    let currentStep = formData.currentStep;

    currentStep =
      currentStep <= 1
        ? 1
        : currentStep - 1;

    setFormData({
      ...formData,
      currentStep,
    });
  };

  // Кнопка Назад показывается не на первом шаге
  const previousButton = () => {
    const currentStep = formData.currentStep;

    if (currentStep !== 1) {
      return (
        <button
          type="button"
          onClick={_prev}
        >
          Назад
        </button>
      );
    }

    return null;
  };

  // Кнопка Вперёд показывается до последнего шага
  const nextButton = () => {
    const currentStep = formData.currentStep;

    if (currentStep < 3) {
      return (
        <button
          type="button"
          onClick={_next}
        >
          Вперёд
        </button>
      );
    }

    return null;
  };

  // Кнопка отправки появляется только на третьем (последнем) шаге
  const sendButton = () => {
    const currentStep = formData.currentStep;

    if (currentStep === 3) {
      return (
        <button type="submit">
          Отправить
        </button>
      );
    }

    return null;
  };

  return (
    <section>
      <h2>1. Пошаговая форма — функциональный компонент</h2>

      <p>
        Шаг {formData.currentStep} из 3
      </p>

      <form onSubmit={handleSubmit}>
        <UserNameStep
          currentStep={formData.currentStep}
          handleChange={handleChange}
          username={formData.username}
        />

        <EmailStep
          currentStep={formData.currentStep}
          handleChange={handleChange}
          email={formData.email}
        />

        <PasswordStep
          currentStep={formData.currentStep}
          handleChange={handleChange}
          password={formData.password}
        />

        <p>
          {previousButton()}
          {" "}
          {nextButton()}
          {" "}
          {sendButton()}
        </p>
      </form>
    </section>
  );
}


// Этап 1. Имя

function UserNameStep(props) {
  // На других шагах компонент ничего не рендерит
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div>
      <label>Имя</label>

      <br />

      <input
        name="username"
        type="text"
        placeholder="Введите имя"
        value={props.username}
        onChange={props.handleChange}
      />
    </div>
  );
}


// Этап 2. Email

function EmailStep(props) {
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <div>
      <label>Email</label>

      <br />

      <input
        name="email"
        type="text"
        placeholder="Введите email"
        value={props.email}
        onChange={props.handleChange}
      />
    </div>
  );
}


// Этап 3. Пароль

function PasswordStep(props) {
  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <div>
      <label>Пароль</label>

      <br />

      <input
        name="password"
        type="password"
        placeholder="Введите пароль"
        value={props.password}
        onChange={props.handleChange}
      />
    </div>
  );
}


// 2. Классовый компонент: пошаговая форма

class ClassUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      username,
      password,
    } = this.state;

    alert(
      `Введённые данные:
      Имя: ${username}
      Email: ${email}
      Пароль: ${password}`
    );
  };

  _next = () => {
    let currentStep = this.state.currentStep;

    currentStep =
      currentStep >= 2
        ? 3
        : currentStep + 1;

    this.setState({
      currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;

    currentStep =
      currentStep <= 1
        ? 1
        : currentStep - 1;

    this.setState({
      currentStep,
    });
  };

  previousButton() {
    if (this.state.currentStep !== 1) {
      return (
        <button
          type="button"
          onClick={this._prev}
        >
          Назад
        </button>
      );
    }

    return null;
  }

  nextButton() {
    if (this.state.currentStep < 3) {
      return (
        <button
          type="button"
          onClick={this._next}
        >
          Вперёд
        </button>
      );
    }

    return null;
  }

  sendButton() {
    if (this.state.currentStep === 3) {
      return (
        <button type="submit">
          Отправить
        </button>
      );
    }

    return null;
  }

  render() {
    return (
      <section>
        <h2>2. Пошаговая форма — классовый компонент</h2>

        <p>
          Шаг {this.state.currentStep} из 3
        </p>

        <form onSubmit={this.handleSubmit}>
          <UserNameStep
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            username={this.state.username}
          />

          <EmailStep
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
          />

          <PasswordStep
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            password={this.state.password}
          />

          <p>
            {this.previousButton()}
            {" "}
            {this.nextButton()}
            {" "}
            {this.sendButton()}
          </p>
        </form>
      </section>
    );
  }
}


// 4. Доп задание:
// Добавляем кнопку "Начать сначала".
// Она возвращает форму на первый шаг и очищает данные.

function ResettableForm() {
  const [formData, setFormData] = useState({
    currentStep: 1,
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      currentStep: 1,
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <section>
      <h2>3. Доп задание: начать сначала</h2>

      <p>
        Шаг {formData.currentStep} из 3
      </p>

      {formData.currentStep === 1 && (
        <input
          name="username"
          placeholder="Введите имя"
          value={formData.username}
          onChange={handleChange}
        />
      )}

      {formData.currentStep === 2 && (
        <input
          name="email"
          placeholder="Введите email"
          value={formData.email}
          onChange={handleChange}
        />
      )}

      {formData.currentStep === 3 && (
        <input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={handleChange}
        />
      )}

      <p>
        {formData.currentStep > 1 && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                currentStep:
                  formData.currentStep - 1,
              })
            }
          >
            Назад
          </button>
        )}

        {" "}

        {formData.currentStep < 3 && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                currentStep:
                  formData.currentStep + 1,
              })
            }
          >
            Вперёд
          </button>
        )}

        {" "}

        <button
          type="button"
          onClick={resetForm}
        >
          Начать сначала
        </button>
      </p>
    </section>
  );
}


export default function App() {
  return (
    <main>

      <UserForm />

      <ClassUserForm />

      <ResettableForm />
    </main>
  );
}