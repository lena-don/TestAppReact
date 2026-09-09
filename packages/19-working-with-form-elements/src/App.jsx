import { useState } from "react";
import React from "react";

// 1. Чекбокс

function Terms() {
  // Состояние чекбокса: false — не отмечен
  const [isChecked, setIsChecked] = useState(false);

  // Меняем состояние на противоположное
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


// 3. Радио-кнопка

function Language() {
  // Здесь хранится value выбранной радиокнопки
  const [selectedOption, setSelectedOption] = useState("");

  // Сохраняем выбранное значение
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <section>
      <h2>3. Радиокнопки</h2>

      <label>
        <input
          type="radio"
          value="JavaScript"
          checked={selectedOption === "JavaScript"}
          onChange={handleChange}
        />
        JavaScript
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="TypeScript"
          checked={selectedOption === "TypeScript"}
          onChange={handleChange}
        />
        TypeScript
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="Python"
          checked={selectedOption === "Python"}
          onChange={handleChange}
        />
        Python
      </label>

      <p>
        Выбранный язык: {selectedOption || "Не выбрано"}
      </p>
    </section>
  );
}


// 4. Радиокнопка в классовом компоненте

class ClassLanguage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  render() {
    return (
      <section>
        <h2>4. Радиокнопка в классовом компоненте</h2>

        <label>
          <input
            type="radio"
            value="JavaScript"
            checked={this.state.selectedOption === "JavaScript"}
            onChange={this.handleChange}
          />
          JavaScript
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="TypeScript"
            checked={this.state.selectedOption === "TypeScript"}
            onChange={this.handleChange}
          />
          TypeScript
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="Python"
            checked={this.state.selectedOption === "Python"}
            onChange={this.handleChange}
          />
          Python
        </label>

        <p>
          Выбранный язык: {this.state.selectedOption || "Не выбрано"}
        </p>
      </section>
    );
  }
}


// 5. Селект

function SelectLanguage() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <section>
      <h2>5. Выпадающий список (селект)</h2>

      <select
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">
          Выберите язык
        </option>

        <option value="JavaScript">
          JavaScript
        </option>

        <option value="TypeScript">
          TypeScript
        </option>

        <option value="Python">
          Python
        </option>
      </select>

      <p>
        Выбранный язык:{" "}
        {selectedOption === ""
          ? "Не выбрано"
          : selectedOption}
      </p>
    </section>
  );
}


// 6. Селект в классовом компоненте

class ClassSelectLanguage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  render() {
    return (
      <section>
        <h2>6. Селект в классовом компоненте</h2>

        <select
          value={this.state.selectedOption}
          onChange={this.handleChange}
        >
          <option value="">
            Выберите язык
          </option>

          <option value="JavaScript">
            JavaScript
          </option>

          <option value="TypeScript">
            TypeScript
          </option>

          <option value="Python">
            Python
          </option>
        </select>

        <p>
          Выбранный язык:{" "}
          {this.state.selectedOption === ""
            ? "Не выбрано"
            : this.state.selectedOption}
        </p>
      </section>
    );
  }
}


// 7. Доп задание №1 — для проекта библиотеки в т.ч.
// Переключатель "Показывать подробности"

function DetailsTask() {
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <section>
      <h2>7. Доп задание: показать подробности</h2>

      <label>
        <input
          type="checkbox"
          checked={showDetails}
          onChange={handleChange}
        />
        Показать подробнее
      </label>

      {/* Условный рендеринг! */}
      {showDetails && (
        <p>
          Дополнительная информация показана.
        </p>
      )}
    </section>
  );
}


// 8. Доп задание №2 — для проекта библиотеки
// Выбор типа обложки книги

function CoverTask() {
  const [coverType, setCoverType] = useState("");

  const handleChange = (e) => {
    setCoverType(e.target.value);
  };

  return (
    <section>
      <h2>8. Доп щадание: тип обложки</h2>

      <select
        value={coverType}
        onChange={handleChange}
      >
        <option value="">
          Выберите тип обложки
        </option>

        <option value="Твёрдая">
          Твёрдая
        </option>

        <option value="Мягкая">
          Мягкая
        </option>

        <option value="Суперобложка">
          Суперобложка
        </option>
      </select>

      <p>
        Тип обложки: {coverType || "Не выбран"}
      </p>
    </section>
  );
}


export default function App() {
  return (
    <main>

      <Terms />

      <ClassTerms />

      <Language />

      <ClassLanguage />

      <SelectLanguage />

      <ClassSelectLanguage />

      <DetailsTask />

      <CoverTask />
    </main>
  );
}