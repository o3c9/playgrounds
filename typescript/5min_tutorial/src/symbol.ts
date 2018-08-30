const key = Symbol("key");

const obj = {
  [key]: "value",
  key: "dummy"
};

console.log([obj[key], obj["key"]]);

const fib = {
  initialVals: [0, 1],
  [key]: (): void => {},
  [Symbol.iterator]: function*() {
    let [i, j] = this.initialVals;
    yield i;
    yield j;
    while (j < 100) {
      const t = i;
      i = j;
      j = t + j;
      yield j;
    }
  }
};

for (let e in fib) console.log(e); // list up properties
for (let i of fib) console.log(i); // call iterator
