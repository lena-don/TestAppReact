console.log("Hello TS!");

// let x = 10;
// console.log(x);
 
// var y = 20;
// console.log(y);
 
// const t = 50;
// console.log(t);

//

// let sum: any;
// sum = 1200;
 
// if (typeof sum === "number") {
     
//     let result: number = sum / 12;
//     console.log(result);
// }
// else{
//     console.log("invalid operation");
// }

//

// let koef: number = 1.5;
 
// function add(a: number){
//     let result = a *koef;
//     console.log(result);
// }
 
// add(20);
// add(10);

//

// function add(a: number, b: number): number { // можно указывать типы данных параметров функции и результатов (возвращаемого функцией значения)
//     return a + b;
// }
// let result = add(1, 2);
// console.log(result);

//

// function getName(firstName: string, lastName?: string) { // в функцию должно передаваться ровно столько значений, сколько в ней определено параметров. Чтобы иметь возможность передавать различное число значений в функцию, в TS некоторые параметры можно объявить как необязательные. Необязательные параметры должны быть помечены вопросительным знаком ?. Причем необязательные параметры должны идти после обязательных
//     if (lastName)
//         return firstName + " " + lastName;
//     else
//         return firstName;
// }
  
// let name1 = getName("Иван", "Кузнецов");
// console.log(name1);
// let name2 = getName("Вася");
// console.log(name2);

//

// function sum (x: number, y: number): number {
//     return x + y;
// };
// function subtract (a: number, b: number): number {
//     return a - b;
// };
 
// let op: (x:number, y:number) => number;
 
// op = sum; // переменная op представляет любую функцию, которая принимает два числа и которая возвращает число
// console.log(op(2, 4));
 
// op = subtract;
// console.log(op(6, 4));

//

// const sum = (x: number, y: number) => x + y; // в TypeScript можно использовать стрелочные функции (arrow functions). Стрелочные функции представляют выражения типа (параметры) => тело функции
 
// const result = sum(15, 35); 
// console.log(result);

//

// const square = x => x * x; // Если передается только один параметр, то скобки можно опустить:
// const hello = () => "hello world" // Если стрелочная функция не требует параметров, то используются пустые круглые скобки
  
// console.log(square(5)); // 25
// console.log(hello());

//

// let id : number | string; // union позволяют комбинировать или объединить другие типы
// id = "1345dgg5";
// console.log(id); // 1345dgg5
// id = 234;
// console.log(id);  // 234

// function printSentence(words: string[]|string){
//       // если words - строка
//       if (typeof words === "string") {
//         console.log(words);
//       } else {
//         // Если words - массив string[]
//         console.log(words.join("-"));
//       }
// }
// printSentence(["Язык", "программирования", "TypeScript"]); // для массива применяется метод words.join(" "), который объединяет все элементы массива в одну строку, разделенные дефисом
// printSentence("Язык программирования JavaScript");

//

// let x: number = undefined; // мы можем присваивать значения undefined и null переменным других типов
// console.log(x);
// x = null;
// console.log(x);
// x = 5;
// console.log(x);

//

// let person: { name: string; age: number } = { name: "Tom", age: 23 };
// console.log(person.name);

//

// let person: { name: string; age?: number }; // Свойство age - необязательное
 
// person = { name: "Tom", age: 23 };
// console.log(person.name);   // Tom
// person = { name: "Bob"};    // Норм, свойство age - необязательное
// console.log(person.name);   // Bob

//

// let person: { name: string; age?: number } = { name: "Tom", age: 36};
// if (person.age !== undefined) {
     
//     console.log(person.age);
// }

//

// function printUser(user: { name: string; age: number}) {
//   console.log(`name: ${user.name}  age: ${user.age}`);
// }
// let tom = {age: 36, name: "Tom"};
 
// printUser(tom);

//

// let tom: { name: string; age?: number } = { name: "Tom", age: 23 };
// let bob: { name: string; age?: number } = { name: "Bob"};
 
 
// function printUser(user: { name: string; age?: number }){
 
//     if("age" in user){
//         console.log(`Name: ${user.name} Age: ${user.age}`);
//     }
//     else{
//         console.log(`Name: ${user.name}`);
//     }
// }
// printUser(tom);
// printUser(bob);

//

// type id = number | string; // — Псевдоним
 
// // параметр функции представляет псевдоним
// function printId(inputId: id){
//     console.log(`Id: ${inputId}`);
// }
// // тип результата - псевдоним
// function getId(isNumber:boolean): id{
//     if(isNumber)
//         return 1;
//     else
//         return "1";
//     }

//

// function printUsers(users: readonly string[]) {
//     for(const user of users){
//         console.log(user);
//     }
// }
 
// function usersToString(users: ReadonlyArray<string>): String{
     
//     return users.join(", ");
// }
 
// const people: readonly string[]= ["Tom", "Bob", "Sam"];
 
// printUsers(people);
// console.log(usersToString(people));

//

// class Person {
   
//     name: string;
//     constructor(name: string) {
   
//         this.name = name;
//     }

//     print(): void {      // void — специальный тип данных
//     в TS; отсутствие возвращаемого значения

//         console.log(`Имя: ${this.name}`);
//     }
// }
   
// class Employee extends Person {
   
//     company: string;
//     constructor(name: string, company: string) {
   
//         super(name);
//         this.company = company;
//     }
//     print(): void {
//         console.log(`Имя: ${this.name}`);
//         console.log(`Работает в компании: ${this.company}`);
//     }
// }
 
// let bob: Employee = new Employee("Bob", "Microsoft");
// bob.print();

//

// class Person {
//     name: string;
// 	private _age: number; // private _ — приватное поле класса, досутпа извне не будет
// 	private _name: string;
 
//     public get age(): number {
//         return this._age;
//     }
 
//     public set age(n: number) {
// 		if(n < 0 || n > 110){
// 			console.log("Недопустимый возраст!");
// 		}
// 		else{
// 			this._age = n;
// 		}
//     }
// }

// let tom = new Person();
// tom.name = "Tom";
// tom.age = 36;			
// console.log(tom.age);
// tom.age = -1243;   
// console.log(tom.age);

// ==================================

// class Person {
  
//     age: number;
//     name: string;
     
//     static retirementAge: number = 65;   // Ключевое слово static определяет
//     свойства и методы, которые принадлежат самому классу,
//     а не его отдельным экземплярам. У нас здесь в статик помещён
//     возраст выхода на пенсию, так как он будет единым для всех
//     экземпляров класса Person.

//     static calculateYears(age: number): number{
         
//         return Person.retirementAge - age;
//     }
     
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
// }
 
// let tom = new Person("Tom", 36);
// let years = Person.calculateYears(36);
// console.log(Person.retirementAge);
// console.log(`До пенсии осталось: ${years} лет`);

// ==================================

// interface IUser {
//     id: number;
//     name: string;
// }
// let employee: IUser = {
     
//     id: 1, 
//     name: "Alice"
// }
 
// function printUser(user: IUser): void {
 
//     console.log("id: ", user.id);
//     console.log("name: ",  user.name)
// }
 
// printUser(employee);

// ==================================

interface IUser {   // Интерфейс (interface) в TypeScript — это
// способ описания формы и структуры объекта, задающий набор
// обязательных или необязательных свойств и методов
    id: number;
    name: string;
    sayWords(words: string): void;
}
let employee: IUser = {
      
    id: 1, 
    name: "Alice",
    sayWords: function(words: string): void{
        console.log(`${this.name} говорит "${words}"`);
    }
}
  
employee.sayWords("Привет, как дела?");