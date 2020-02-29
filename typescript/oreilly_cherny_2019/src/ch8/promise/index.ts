import { title } from "../../util";

{
    title("promise");

    type Thenable = {
        then: (callback: (ret: any) => void) => Thenable;
        catch: (callback: (err: any) => void) => Thenable;
        finally: (callback: (ret: any) => void) => Thenable;
    };

    type PromiseStatus = "pending" | "fulfilled" | "rejected";
    type ThenCallback<T> = (ret: T) => void;
    type CatchCallback = (error: any) => void;

    type Nullable<T> = T | null | undefined;

    class MyPromise<T> implements Thenable {
        public static resolve<T>(value: T): MyPromise<T> {
            return new MyPromise<T>(r => {
                r(value);
            });
        }

        public static reject<T>(err: any): MyPromise<T> {
            return new MyPromise<T>((_, reject) => {
                reject(err);
            });
        }

        private status: PromiseStatus;
        private value?: T = undefined;
        private thenCallbacks: Array<ThenCallback<T>> = [];
        private catchCallbacks: CatchCallback[] = [];
        private finalCallback?: ThenCallback<Nullable<T>>;

        constructor(
            action: (
                resolve: (value: T) => void,
                reject: (error: any) => void
            ) => void
        ) {
            this.status = "pending";
            setTimeout(
                () => action(this.resolve.bind(this), this.reject.bind(this)),
                0
            );
        }

        public then(
            onFuifilled: ThenCallback<T>,
            onRejected?: CatchCallback
        ): Thenable {
            this.thenCallbacks.push(onFuifilled);
            if (onRejected) {
                this.catchCallbacks.push(onRejected);
            }
            return this;
        }

        public catch(callback: CatchCallback): Thenable {
            this.catchCallbacks.push(callback);
            return this;
        }

        public finally(callback: ThenCallback<Nullable<T>>): Thenable {
            this.finalCallback = callback;
            return this;
        }

        private resolve(arg: T) {
            this.status = "fulfilled";
            this.value = arg;
            let promise: MyPromise<T> = this;
            for (const th of this.thenCallbacks) {
                th.call(promise, this.value);
                promise = MyPromise.resolve<T>(this.value);
            }
            this.final();
        }

        private reject(err: any) {
            this.status = "rejected";
            for (const ct of this.catchCallbacks) {
                ct(err);
            }
            this.final();
        }

        private final() {
            if (typeof this.finalCallback === "function") {
                this.finalCallback(this.value);
            }
        }
    }

    const p = new MyPromise<number>((resolve, reject) => {
        setTimeout(() => {
            const t = new Date().getTime();
            if (t % 2 === 0) {
                resolve(t);
            } else {
                reject(`${t} is not even!`);
            }
        }, 1000);
    });

    p.then(t => console.log(`got even number! ${t}`))
        .catch(e => console.log("error", e))
        .finally(() => console.log("bye"));

    MyPromise.resolve(42).then(value => {
        console.log(value);
    });
}
