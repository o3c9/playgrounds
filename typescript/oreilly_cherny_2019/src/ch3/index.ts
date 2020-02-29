{
    function sqrt(n: any) {
        return n * n;
    }

    console.log(sqrt(2));
    console.log(sqrt("z"));
}

{
    function sqrt(n: number) {
        return n * n;
    }

    console.log(sqrt(2));
    // This will cause a compiler error
    // console.log(sqrt("z"));
}

// unknown type
{
    const a: unknown = 30;
    const b = a === 123;

    // This line will cause a compiler error since a is 'unknown'
    // const c = a + 10;

    // You need to assert before you use unknown variable
    if (typeof a === "number") {
        console.log(a + 10);
    }
}

// number and bigint
{
    const a = 1234;
    const b = 1234n;

    // You cannot compare number and bigint with ===
    // console.log(a === b);

    // However, you can compare them with >
    console.log(a >= b);
}

// symbols
{
    let e = Symbol("e");

    // Unique symbol will never be equal to other unique sybmols
    const f: unique symbol = Symbol("f");
    // When you declare a new symbol and assign it to a const variable (not a let or var variable),
    // TypeScript will infer its type as unique symbol.
    const g = Symbol("e");
    console.log(e === g);
    e = Symbol("f");
    console.log(e === f);
}

// objects
{
    const obj: object = {
        k: "v",
    };
    // `object` type doesn't have a key named `k`
    // you can assign but you cannot safely read...
    // console.log(obj.k);

    const obj2: { k: string } = {
        k: "v",
    };
    console.log(obj2.k);

    let obj3: {
        a: number;
        b?: string;
        [key: number]: boolean; // [ley: T] is called "index signature"
        readonly id: number;
    };

    obj3 = { id: 1, a: 20, 20: false };
    obj3 = { id: 2, a: 20, b: "v", 20: false };
    // error
    // obj3 = { a: 20, b: "v", 20: "red" };

    // assigning
    obj3.a = 30;
    // error
    // obj3.id = 3;

    // class and objects
    let c: { first: string; last: string };
    class Person {
        constructor(public first: string, public last: string) {}
    }
    c = new Person("tom", "h");
    console.log("my name is", c.first, c.last);
}

{
    // Object literal notation has one special case:
    // empty object types ({}).
    // Every type—except null and undefined—is assignable to an empty object type,
    // which can make it tricky to use
    let danger: {};
    danger = {};
    danger = { x: 1 };
    danger = [];
    danger = 2;

    let danger2: object;
    danger2 = {};
    danger2 = { x: 1 };
    danger2 = [];
}

// Type Operations

{
    type Age = number;
    type Person = {
        name: string;
        age: Age;
    };
    const j: Person = { name: "james", age: 80 };
    console.log(`${j.name} is ${j.age} years old.`);
}

{
    type Cat = { name: string; purrs: boolean };
    type Dog = { name: string; barks: boolean; wags: boolean };
    type CatOrDogOrBoth = Cat | Dog;
    type CatAndDog = Cat & Dog;

    const tama: CatOrDogOrBoth = {
        barks: true,
        name: "tama",
        purrs: false,
        wags: true,
    };
    // error
    // console.log(`${tama.name} barks? ${tama.wags}`);
    console.log(`${tama.name} purrs? ${(tama as Cat).purrs}`);

    const pochi: CatAndDog = {
        barks: true,
        name: "pochi",
        purrs: false,
        wags: true,
    };
    console.log(`${pochi.name} barks? ${pochi.barks}`);
}

{
    const ids: number[] = [1, 2, 3];
    const identifiers: Array<string | number> = [1, "a"];
    // const identifiers: Array<string | number> = [1, "a"];
}

{
    function buildArray() {
        const a = []; // any[]
        a.push(1); // number[]
        a.push("x"); // (string | number)[]
        return a;
    }

    const myArray = buildArray(); // (string | number)[]
    // error
    // myArray.push(true); // Error 2345: Argument of type 'true' is not
}

// tuples
{
    const a: [number] = [1];
    const b: [string, string, number] = ["malcolm", "gladwell", 1963];

    // A list of strings with at least 1 element
    const friends: [string, ...string[]] = ["Sara", "Tali", "Chloe", "Claire"];
    // A heterogeneous list
    const list: [number, boolean, ...string[]] = [1, false, "a", "b", "c"];

    const fares: Array<[number, number?]> = [[1], [2, 3], [4]];
}

// readonly arrays and tuples
{
    const ids: readonly number[] = [1, 2, 3];
    // error
    // ids.push(4);
    // ids.pop();
    // ids[0] = 4;

    const a1: readonly string[] = ["john", "paul"];
    const a2: Readonly<string[]> = ["john", "paul"];
    const a3: ReadonlyArray<string> = ["john", "paul"];

    const pair: readonly [number, string] = [1, "tom"];
    // pair[1] = "jane";
    const pair2: Readonly<[number, string]> = [1, "tom"];
    // pair2[1] = "jane";
}

// Enums
{
    enum Language {
        English, // 0
        Spanish, // 1
        Russian, // 2
    }
    const l = Language.English;
    console.log(l);
    const l2 = Language[6];
    console.log(l2); // undefined
}

{
    const enum Language {
        English = "English",
        Spanish = "Spanish",
        Russian = "Russian",
    }
    const l = Language.English;
    console.log(l);
    // error
    // const l2 = Language[6];
    // console.log(l2);
}

{
    const enum Flippable {
        Burger,
        Chair,
        Cup,
        Skateboard,
        Table,
    }

    function flip(f: Flippable) {
        return `flipped it ${f}`;
    }

    console.log(flip(Flippable.Chair)); // 'flipped it'
    console.log(flip(Flippable.Cup)); // 'flipped it'
    console.log(flip(12)); // 'flipped it' (!!!)
}

{
    const enum Flippable {
        Burger = "Burger",
        Chair = "Chair",
        Cup = "Cup",
        Skateboard = "Skateboard",
        Table = "Table",
    }

    function flip(f: Flippable) {
        return `flipped it ${f}`;
    }

    console.log(flip(Flippable.Chair));
    console.log(flip(Flippable.Cup));
    // error
    // flip(12);
    // flip("Hat");
}

{
    // Exercise
    const a = [true, false, true];
    const e = { type: "focus" };
}
