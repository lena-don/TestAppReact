import { useState } from "react";
import React from "react";

// 1. Чекбокс

function Terms() {
  // Состояние чекбокса false = не отмечен
  const [isChecked, setIsChecked] = useState(false);

  // Меняем состояние на противоположное !
  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <section>
      <h2>1. Чекбокс</h2>

      <label>
        Принять условия:
      </label>

      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />

      <p>
        {isChecked
          ? "Условия приняты"
          : "Необходимо принять условия"}
      </p>
    </section>
  );
}


// 2. Чекбокс в классовом компоненте
class ClassTerms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  handleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    return (
      <section>
        <h2>2. Чекбокс в классовом компоненте</h2>

        <label>
          Принять условия:
        </label>

        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleChange}
        />

        <p>
          {this.state.isChecked
            ? "Условия приняты"
            : "Необходимо принять условия"}
        </p>
      </section>
    );
  }
}

export default function App() {
  return (
    <main>

      <Terms />

      <ClassTerms />

    </main>
  );
}