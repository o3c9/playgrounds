/** Lists **/
let nums: number[] = [1, 2, 3];
// error
// nums.push("s")
nums.push(4);
console.log(nums);

/** Array **/
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

let users: Array<Student> = [];
users.push(new Student("Jane", "Gould"));
users.push(new Student("George", "Mitchell"));
console.log(users.map(u => u.fullname).join(" <=> "));

/** Enum **/
enum Color {
  Red = 1,
  Green,
  Blue
}
let c: Color = Color.Red;

console.log(`Selected value is ${c} and its name is ${Color[c]}`);

/** Functions **/
const sum = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;
const concat = (a: string, b: string): string => a + b;
const diff = (a: string, b: string): string => {
  const b_ary = b.split("");
  const diff = a.split("").filter(i => b_ary.indexOf(i) == -1);
  return diff.join("");
};

const calc = <T>(a: T, b: T, func: (x: T, y: T) => T): T => func(a, b);

// Error
// calc(10, 20, concat);
console.log(calc(10, 20, sum));
console.log(calc(20, 10, sub));

console.log(calc("abc", "AbC", concat));
console.log(calc("AbC", "abc", diff));

/** Classes **/
abstract class Animal {
  protected _name: string;

  get name(): string {
    return this._name;
  }
  set name(val: string) {
    if (val.length <= 2) {
      console.error("too short");
    } else {
      this._name = val;
    }
  }

  abstract makeSound(): void;

  move() {
    if (!this._name) {
      console.error("name not found");
      return;
    }
    console.log(this.moveMessage());
  }

  protected moveMessage(): string {
    return `Animal ${this._name} moved`;
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("bow wow");
  }

  moveMessage(): string {
    return `Dog ${this._name} moved`;
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("meow meow");
  }

  moveMessage(): string {
    return `Cat ${this._name} moved`;
  }
}

let cat = new Cat();
cat.name = "Chap";
cat.makeSound();
cat.move();

let dog = new Dog();
dog.name = "Posh";
dog.makeSound();
dog.move();
