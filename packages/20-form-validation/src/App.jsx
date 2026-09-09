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
      setError("");
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


export default function App() {
  return (
    <main>

      <EmailForm />

      <ClassEmailForm />

    </main>
  );
}