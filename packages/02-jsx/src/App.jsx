function App() {
  // JSX позволяет писать HTML-подобную разметку прямо внутри JavaScript,
  // то есть JSX — это по сути синтаксический сахар 
  const title = <h1>02 – Основы JSX</h1>

  // JavaScript-значения можно вставлять в JSX через фигурные скобки {}
  const a = 2
  const b = 2

  // Обычный JavaScript-объект тоже можно использовать в JSX
  const user = {
    id: 5,
    firstName: 'Anna',
    lastName: 'Smith',
    age: 30,
  }

  // Метод объекта можно вызвать прямо внутри JSX
  const getFullName = () => `${user.firstName} ${user.lastName}`

  // Для вывода массива элементов обычно используется map()
  const languages = ['JavaScript', 'TypeScript', 'React']

  // Условие можно записать через тернарный оператор:
  // прямое использование классического оператора if/else
  // внутри разметки JSX невозможно, так как JSX поддерживает
  // только выражения JavaScript, а if/else является
  // инструкцией (statement), а не выражением
  const isLoggedIn = true

  // В JSX используется className вместо class
  const userClassName = 'user-info'

  // style принимает JavaScript-объект
  // CSS-свойства записываются в camelCase: fontFamily, а не font-family
  const userStyle = {
    color: 'navy',
    fontFamily: 'Verdana',
  }

  return (
    // У меня для шаблонов мини уроков за основу берётся
    // исходное приложение с такой структурой, и в return
    // всегда должен быть один родительский элемент, поэтому
    // всё содержимое обёрнуто в main (можно было просто взять
    // пустые угловые скобки)
    <main>
      {/* JSX-элемент */}
      {title}

      <section>
        <h2>1. JavaScript внутри JSX</h2>

        {/* В {} можно помещать JavaScript-выражения */}
        <p>
          {a} + {b} = {a + b}
        </p>
      </section>

      <section>
        <h2>2. Данные JavaScript-объекта</h2>

        <div id={user.id} className={userClassName} style={userStyle}>
          <p>Полное имя: {getFullName()}</p>
          <p>Возраст: {user.age}</p>
        </div>
        <p>Эти данные отображаются именно так, потому что им установлен класс через className и прописаны стили</p>
      </section>

      <section>
        <h2>3. Цикл. Список через map()</h2>

        <ul>
          {languages.map((language) => (
            // key помогает React идентифицировать элементы списка
            <li key={language}>{language}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>4. Условный рендеринг</h2>

        {/* Тернарный оператор выбирает, что отобразить */}
        {isLoggedIn ? (
          <p>Добро пожаловать!</p>
        ) : (
          <p>Необходимо выполнить авторизацию.</p>
        )}
        <p>(Мы видим именно этот текст, потому что ранее в коде были заданы условия его отображения)</p>
      </section>

      <section>
        <h2 style={{ marginBottom: "5px" }}>5. Стилизация</h2> 
          Пример inline-стилей. 
          Нужно обратить внимание на двойные фигурные скобки: внешние - для JSX-выражения, 
          внутренние - для объекта JavaScript с CSS-свойствами в camelCase.
          
          <p
              style={{
                  color: "white",
                  backgroundColor: "teal",
                  padding: "10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
              }}
          >
              Этот абзац стилизован с помощью inline-стилей в JSX.
          </p>
      </section>
    </main>
  )
}

export default App