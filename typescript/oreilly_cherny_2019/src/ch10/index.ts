import { title } from "../util";

{
    title("ch 10. Namespaces");
}

{
    // CommonJS
    const fs = require("fs");
    module.exports.foo = () => console.log("foo");

    // 問題点は，CommonJSはNodeJSから生まれ，requireはsynchronousであったため，ブラウザへの移植が難しかったこと

    // さらには，`require`, 'module.exports`はコードのどこにでも書ける（たとえけして実行されない分岐の中でも）ため，どのmoduleに依存があるのか静的解析が難しかった
}

// そこで，es2015スタイルが生まれる
// これらはトップレベルでしか宣言できない
// 特にそうする必要がないのであれば，es2015スタイルに従うべき

import * as path from "path";
export const hoge = "HOGE";

path.join("a", "b");

// Namespaceの場合，定義が複数のファイルに分かれていても，明示的にimportしなくても使えてしまう
// 気軽だが，通常は普通のmoduleの仕組みを使うべき
//
// Prefer modules over namespaces when possible
namespace Network {
    export namespace HTTP {
        export function get(url: string) {
            return new Promise<string>((resolve, reject) => resolve("done"));
        }
    }
}

Network.HTTP.get("hello").then((d: string) =>
    console.log(`Network.HTTP.get()`, d)
);

{
    title("exercise 2. add static method to enum");
}

enum Language {
    English, // 0
    Spanish, // 1
    Russian, // 2
}

namespace Language {
    export function get(name: string): Language {
        switch (name) {
            case "English":
                return Language.English;
            case "Spanish":
                return Language.Spanish;
            default:
                return Language.Russian;
        }
    }
}

console.log(Language.get("English"));
