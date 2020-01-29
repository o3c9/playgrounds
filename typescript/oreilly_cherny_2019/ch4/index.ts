{
    const add = (a: number, b: number) => a + b;
    console.log(add(2, 5));
}

{
    type T = number | string;
    // error
    // const add = (a: T, b: T) => a + b;
    // console.log(add(2, 5));
}

// optional and default parameters
{
    const log = (message: string, userId?: number, date = new Date()) => {
        console.log(`${date.toISOString()}: ${userId}: ${message}`);
    };
    log("hello");
    log("good morning", 100);
    log("bye", 101, new Date(2018, 7, 27, 9, 0, 0));
    // error
    // log("bye", new Date(2018, 7, 27, 9, 0, 0));
}

// rest parameters
{
    const sum = (...numbers: number[]) => numbers.reduce((t, n) => t + n, 0);
    console.log(sum(1, 2));
    console.log(sum(1, 2, 3));
    console.log(sum(1, 2, 3, 4));
    console.log(sum(...[1, 2, 3, 4, 5])); // spread the given array

    const sum10and20and = sum.bind(null, 10, 20);
    console.log(sum10and20and(30));
}

// typing this
// thisに型制約を与える。function(...)の文脈内において、thisは予約後になっている。
// arrow functionではつかえない。
{
    const fancyDate = function(this: Date) {
        return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
    };
    console.log(fancyDate.call(new Date()));
    // error
    // fancyDate();
    // fancyDate.call();
}

// objectに生えたthisについては、`strict: true`では、typeを強制されない
{
    type A = { name: string };
    const a = {
        name: "Adam",
        say() {
            return `hello, I'm ${this.name}`;
        },
    };
    console.log(a.say());

    // error: thisのtypeがないのでエラーになる
    // const say = function() {
    //     return `hello, I'm ${this.name}`;
    // };

    const say = function(this: A) {
        return `hello, I'm ${this.name}`;
    };
    console.log(say.call(a));
}

// generators
// genFib() returns IterableIterator<number>
{
    function* genFib() {
        let a = 0;
        let b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
    const fib = genFib();
    for (let i = 0; i < 10; i++) {
        console.log(fib.next().value);
    }
}

// iterators
{
    const evens = {
        *[Symbol.iterator]() {
            for (let i = 0; i < 20; i += 2) {
                yield i;
            }
        },
    };
    for (const a of evens) {
        console.log(a);
    }
}

// call signature and function implementation
{
    type Log = (message: string, userId?: string) => void;

    const log: Log = (message, userId = "guest") => {
        const t = new Date();
        console.log(`${t} - ${userId} - ${message}`);
    };
    log("system start");
    log("system boot", "tom");
}

{
    // TypeScript cannot infer the type of n in this f
    // const f = (n) => n * 2

    const times = (f: (n: number) => number, n: number) => {
        for (let i = 0; i < n; i++) {
            f(i);
        }
    };
    // In this case, since the function is given to `times`, TypeScript can infer the type of parameter `n`
    times((n) => n * 2, 4);
}

// Full call signature and overloading functions
