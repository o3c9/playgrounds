import { title } from "../util";

{
    title("ch 8. Async Programmming, concurrency and parallelism");
}

{
    title("promise");

    type Executor<T> = (
        resolve: (value: T) => void,
        reject: (error: unknown) => void
    ) => void;

    // class Promise<T> {
    //     constructor(private f: Executor<T>) {}

    //     public then<U>(g: (result: T) => Promise<U> | void): Promise<U> {
    //         console.log("then");
    //         const a = this.f(g);
    //         const pms = g/);
    //     }
    //     public catch<U>(g: (error: unknown) => Promise<U> | void): Promise<U> {
    //         console.log("then");
    //     }
    // }

    // const a = () =>
    //     new Promise<string>(
    //         (resolve: (v: string) => void, reject: (_: unknown) => void) => {
    //             resolve("ok");
    //         }
    //     );

    // const b = () =>
    //     new Promise<number>(
    //         (resolve: (v: number) => void, reject: (_: unknown) => void) => {
    //             resolve(3);
    //         }
    //     );

    // const c = () =>
    //     new Promise<boolean>(
    //         (resolve: (v: boolean) => void, reject: (_: unknown) => void) => {
    //             resolve(true);
    //         }
    //     );

    // a()
    //     .then(b)
    //     .catch(_ => c())
    //     .then((r: unknown) => console.log(`Done: ${r}`))
    //     .catch((e: unknown) => console.log(`Error: ${e}`));
}

{
    title("async await");
}

{
    title("multithreading with Web Workers");

    // see webworker dir
}

import { readFile } from "fs";

{
    title("promisify");

    function promisify<T>(
        func: (arg: any, callback: (error: unknown, data: T) => void) => void
    ) {
        return (arg: unknown) => {
            return new Promise<T>((resolve, reject) => {
                func(arg, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };
    }

    promisify<Buffer>(readFile)("src/util.ts")
        .then(r => console.log("success", r.toString()))
        .catch(e => console.error("failure", e.message));
}
