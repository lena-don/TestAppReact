import { useState } from "react";
import React from "react";

const propsValues = {
  title: "Языки программирования",
  items: [
    "JavaScript",
    "C++",
    "TypeScript",
    "Java",
    "C#",
    "Python",
  ],
};


// 1. SearchPlugin
//
// Компонент отвечает только за поле поиска, но не знает, как фильтровать список.
// Функцию filter получает от родительского компонента через props.

function SearchPlugin(props) {
  function onTextChanged(e) {
    const text = e.target.value.trim(); // Удаляем пробелы
    props.filter(text); // Передаем введенный текст в родительский компонент
  }

  return (
    <input
      placeholder="Поиск"
      onChange={onTextChanged}
    />
  );
}


// 2. ItemsList

// Родительский компонент:
// - получает исходный список через props;
// - хранит текущий отфильтрованный список в state;
// - передаёт SearchPlugin функцию filterList.

function ItemsList(props) {
  // Сначала отображаем весь исходный список
  const [items, setItems] = useState(
    props.data.items
  );

  const filterList = (text) => {
    const filteredList = props.data.items.filter(
      (item) =>
        item
          .toLowerCase()
          .search(text.toLowerCase()) !== -1
    );

    // Обновляем список на странице
    setItems(filteredList);
  };

  return (
    <section>
      <h2>{props.data.title}</h2>

      <SearchPlugin filter={filterList} />

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li> // ??? key={item} — идентификатор элемента для React; {item} — что реально показать пользователю !!!
        ))}
      </ul>
    </section>
  );
}


// 3. Class Item

class Item extends React.Component {
  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
}


// 4. Class SearchPlugin

class ClassSearchPlugin extends React.Component {
  onTextChanged = (e) => {
    const text = e.target.value.trim(); // Убираем пробелы

    // Передаём текст в родительский компонент
    this.props.filter(text);
  };

  render() {
    return (
      <input
        placeholder="Поиск"
        onChange={this.onTextChanged}
      />
    );
  }
}


// 5. Class ItemsList

class ClassItemsList extends React.Component {
  constructor(props) {
    super(props);

    // В state сначала находится весь список
    this.state = {
      items: this.props.data.items,
    };
  }

  filterList = (text) => {
    const filteredList =
      this.props.data.items.filter(
        (item) =>
          item
            .toLowerCase()
            .search(text.toLowerCase()) !== -1
      );

    this.setState({
      items: filteredList,
    });
  };

  render() {
    return (
      <section>
        <h2>{this.props.data.title}</h2>

        <ClassSearchPlugin
          filter={this.filterList}
        />

        <ul>
          {this.state.items.map((item) => (
            <Item
              key={item}
              name={item}
            />
          ))}
        </ul>
      </section>
    );
  }
}


// 6. Доп задание №1
//
// Поиск книг. Используется та же схема: SearchPlugin → функция родителя → фильтрация state.

function BookSearchTask() {
  const books = [
    "Война и мир",
    "Преступление и наказание",
    "Государство",
    "Мастер и Маргарита",
    "Отцы и дети",
    "Анна Каренина",
  ];

  const [items, setItems] = useState(books);

  const filterBooks = (text) => {
    const filteredList = books.filter(
      (book) =>
        book
          .toLowerCase()
          .search(text.toLowerCase()) !== -1
    );

    setItems(filteredList);
  };

  return (
    <section>
      <h2>3. Доп задание: поиск книг</h2>

      <SearchPlugin filter={filterBooks} />

      <ul>
        {items.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>

      <p>
        Поиск использует ту же схему, что и основной пример.
      </p>
    </section>
  );
}


// 7. Доп задание 2
//
// Фильтрация по автору.
// Пользователь вводит имя автора, а список содержит название + автора.

function AuthorSearchTask() {
  const books = [
    {
      title: "Война и мир",
      author: "Лев Толстой",
    },
    {
      title: "Преступление и наказание",
      author: "Фёдор Достоевский",
    },
    {
      title: "Государство",
      author: "Платон",
    },
    {
      title: "Мастер и Маргарита",
      author: "Михаил Булгаков",
    },
  ];

  const [items, setItems] = useState(books);

  const filterBooks = (text) => {
    const filteredList = books.filter(
      (book) =>
        book.author
          .toLowerCase()
          .search(text.toLowerCase()) !== -1
    );

    setItems(filteredList);
  };

  return (
    <section>
      <h2>4. Доп задание: поиск по автору</h2>

      <SearchPlugin filter={filterBooks} />

      <ul>
        {items.map((book) => (
          <li key={book.title}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>

      <p>
        Здесь фильтруется уже не строка, а свойство объекта.
      </p>
    </section>
  );
}


export default function App() {
  return (
    <main>

      <ItemsList data={propsValues} />

      <ClassItemsList data={propsValues} />

      <BookSearchTask />

      <AuthorSearchTask />
    </main>
  );
}