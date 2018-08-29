interface Person {
  firstName: string;
  lastName: string;
}

class Student implements Person {
  fullname: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullname = firstName + " " + lastName;
  }
}

const greeting = (person: Person) =>
  `Hello, ${person.firstName}. How's ${person.lastName} doing?`;
let user = new Student("Jane", "Gould");
// let page = document.getElementById("page");
console.log(greeting(user));
