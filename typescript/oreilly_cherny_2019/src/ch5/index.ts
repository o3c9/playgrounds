import { title } from "../util";

{
    title("classes and interfaces");

    type Color = "Black" | "White";

    // chessでは横マスをFile、縦マスをRankという
    type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
    type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    class Position {
        constructor(private file: File, private rank: Rank) {}

        public getDistanceTo(other: Position) {
            return {
                file: Math.abs(
                    other.file.charCodeAt(0) - this.file.charCodeAt(0)
                ),
                rank: Math.abs(other.rank - this.rank),
            };
        }
    }
    abstract class Piece {
        // accessible from instances of this class and its subclass
        protected pos: Position;
        constructor(private readonly color: Color, file: File, rank: Rank) {
            this.pos = new Position(file, rank);
        }

        // abstract function should be implemented by subclasses
        public abstract canMoveTo(pos: Position): boolean;

        public get name() {
            return "Piece";
        }
    }

    class King extends Piece {
        // can move everywhere within 1 distance
        public canMoveTo(pos: Position): boolean {
            const distance = this.pos.getDistanceTo(pos);
            return distance.rank < 2 && distance.file < 2;
        }

        // superは親のメソッドの呼び出しに使える
        public get name() {
            return `King < ${super.name}`;
        }
    }
    class Queen extends Piece {
        public canMoveTo(pos: Position): boolean {
            return false;
        }
    }
    class Bishop extends Piece {
        public canMoveTo(pos: Position): boolean {
            return false;
        }
    }
    class Knight extends Piece {
        public canMoveTo(pos: Position): boolean {
            return false;
        }
    }
    class Rook extends Piece {
        public canMoveTo(pos: Position): boolean {
            return false;
        }
    }
    class Pawn extends Piece {
        public canMoveTo(pos: Position): boolean {
            return false;
        }
    }

    class Game {
        private static makePieces() {
            return [
                new King("White", "E", 1),
                new King("Black", "E", 8),

                // Queens
                new Queen("White", "D", 1),
                new Queen("Black", "D", 8),

                // Bishops
                new Bishop("White", "C", 1),
                new Bishop("White", "F", 1),
                new Bishop("Black", "C", 8),
                new Bishop("Black", "F", 8),
            ];
        }

        private pieces = Game.makePieces();
    }

    console.log(new King("White", "E", 1).name);
}

{
    title("using this as Return Type");

    class Set {
        protected val: number;

        constructor() {
            this.val = 0;
        }

        public add(val: number): this {
            this.val += val;
            return this;
        }

        public toString(): string {
            return this.val.toString();
        }
    }

    console.log(
        new Set()
            .add(3)
            .add(4)
            .toString()
    );

    // もしここでSetの派生クラスを作っても、addは、thisタイプなので問題ない

    class StringSet extends Set {
        private valStr: string;

        constructor() {
            super();
            this.valStr = "";
        }

        public add(val: number | string): this {
            this.valStr += val.toString();
            return this;
        }

        public toString(): string {
            return this.valStr;
        }
    }

    console.log(
        new StringSet()
            .add(3)
            .add(4)
            .toString()
    );
}

{
    title("interfaces");

    // Type aliases and interfaces are mostly two syntaxes for the same thing
    // (like function expressions and function declarations),
    // but there are a few small differences

    interface IFood {
        calories: number;
        taste: boolean;
    }
    interface ISushi extends IFood {
        salty: boolean;
    }
    interface ICake extends IFood {
        sweety: boolean;
    }

    type TFood = {
        calories: number;
        taste: boolean;
    };

    type TSushi = TFood & { salty: boolean };
    type TCake = TFood & { sweety: boolean };

    const ebi: ISushi = {
        calories: 3,
        salty: true,
        taste: false,
    };
    const salmon: TSushi = {
        calories: 4,
        salty: false,
        taste: false,
    };
    let sushi: TSushi = ebi;
    sushi = salmon;
}

{
    title("destination merging");

    // User has a single field, name
    interface IUser {
        name: string;
    }

    // User now has two fields, name and age
    interface IUser {
        age: number;
    }

    const a: IUser = {
        age: 30,
        name: "Ashley",
    };
}

{
    title("implementations");

    // クラスは、interfaceをimplementできる
    interface IAnimal {
        eat(food: string): void;
        sleep(hours: number): void;
    }

    class Cat implements IAnimal {
        public eat(food: string) {
            console.info("Ate some", food, ". Mmm!");
        }
        public sleep(hours: number) {
            console.info("Slept for", hours, "hours");
        }
    }
}

{
    title("polymorphism / generics");

    class Multiplier<K> {
        constructor(private ins: K) {}

        public run(n: number) {
            const ar: K[] = [];
            for (let i = 0; i < n; i++) {
                ar.push(this.ins);
            }
            return ar;
        }
    }

    console.log(new Multiplier<string>("a").run(2));
}

{
    title("mixins");

    // TS版Mixinのつくりかた
    // 1. まずクラスのコンストラクタの型を定義する
    type ClassContructor<T> = new (...args: any[]) => T;

    // 2. クラスを受け取り、ある属性やメソッドを追加したクラスを返す関数を定義する
    function withEZDebug<C extends ClassContructor<{ inspect(): any }>>(
        klass: C
    ) {
        // returns anonymous class contructor
        return class extends klass {
            // このように通常のコンストラクタの挙動なら宣言不要
            constructor(...args: any[]) {
                super(...args);
            }

            // ここにmixinがもつ固有のメソッドを実装
            public debug() {
                const name = this.constructor.name;
                const val = this.inspect();
                return { name, val };
            }
        };
    }

    class User {
        constructor(
            private id: number,
            private firstName: string,
            private lastName: string
        ) {}

        public inspect() {
            return {
                firstName: this.firstName,
                id: this.id,
                lastName: this.lastName,
            };
        }
    }

    // `{ inspect(): any }`を満たしていれば、`withEZDebug`を使って、debug()メソッドをはやせる
    const u = new (withEZDebug(User))(3, "emma", "goldman");
    console.log(u.debug());

    title("decorators");

    @withEZDebug
    class DecoratedUser extends User {}

    // 現時点では、Typescriptは、decoratorがclassのshapeを変えたことを気づけないので、`debug()`がコンパイルエラー
    // console.log(new DecoratedUser(3, "emma", "goldman").debug());
}

{
    title("simulating final class");

    // クラスを派生させないようにするには、privateコンストラクタを使用する
    class MessageQueue {
        // ただしもちろんこれでは自分自身のインスタンスも作れなくなるので、代わりにfactoryメソッドを用意する
        public static create(msg: string): MessageQueue {
            return new MessageQueue(msg);
        }

        private constructor(private msg: string) {}
    }
    // class BadQueue extends MessageQueue {} // Error TS2675: Cannot extend a class
    MessageQueue.create("hello");
}

{
    title("design patterns - factory");

    type Shoe = { purpose: string };

    // interfaceとtypeは交換可能なので、typeもimplementsできる
    class BalletFlat implements Shoe {
        // 型はShoeで定義されているので省略可能
        public purpose = "dancing";
    }
    class Boot implements Shoe {
        public purpose = "woodcutting";
    }
    class Sneaker implements Shoe {
        public purpose = "walking";
    }

    const Shoe = {
        create(type: "ballet" | "boot" | "sneaker"): Shoe {
            switch (type) {
                case "ballet":
                    return new BalletFlat();
                case "boot":
                    return new Boot();
                case "sneaker":
                    return new Sneaker();
            }
        },
    };
    const shoe = Shoe.create("ballet");
    console.log(shoe);

    {
        title("improved factory pattern");

        type ShoeFactory = {
            (type: "ballet"): BalletFlat;
            (type: "boot"): Boot;
            (type: "sneaker"): Sneaker;
        };

        const shoe2Create: ShoeFactory = (
            type: "ballet" | "boot" | "sneaker"
        ) => {
            switch (type) {
                case "ballet":
                    return new BalletFlat();
                case "boot":
                    return new Boot();
                case "sneaker":
                    return new Sneaker();
            }
        };
        const shoe2 = shoe2Create("ballet");
        console.log(shoe2);
    }
}

{
    title("design patterns - builder");

    class RequestBuilder {
        private url: string | null = null;
        private method: string | null = null;

        public setURL(url: string) {
            this.url = url;
            return this;
        }

        public setMethod(method: string) {
            this.method = method;
            return this;
        }

        public send() {
            console.log(`go!:`, this);
        }
    }

    new RequestBuilder()
        .setURL("http://example.com")
        .setMethod("POST")
        .send();

    // ただしこのtraditionalなbuilderパターンはurlをセットする前にsendが呼べるので安全ではない
}

{
    title("protected constructor");

    class OurClass {
        protected constructor(protected name: string) {}
        public hello() {
            return `Hello, ${this.name}`;
        }
    }

    // new OurClass("black"); // TS2674 error
    class CatClass extends OurClass {
        public constructor(protected name: string) {
            super(name);
        }

        public hello() {
            return `Meow, ${this.name}`;
        }
    }

    console.log(new CatClass(`white`).hello());
}

{
    title("design patterns - type-safe builder");

    type Builder<Props, Result> = ({} extends Props
        ? { build(): Result }
        : {}) &
        { [P in keyof Props]-?: SetFunction<Props, P, Result> };

    type BuildFunction<Props, Result> = (props: Props) => Result;

    type SetFunction<Props, K extends keyof Props, Result> = (
        value: Exclude<Props[K], undefined>
    ) => Builder<Pick<Props, Exclude<keyof Props, K>>, Result>;

    const propsObject = Symbol();
    const buildFunction = Symbol();

    class BuilderImpl<Props, Result> {
        constructor(bf: BuildFunction<Props, Result>) {
            return new Proxy(
                {
                    [propsObject]: {},
                    [buildFunction]: bf,
                },
                {
                    get(target: any, prop: any, receiver: any) {
                        if (prop === "build") {
                            return () =>
                                target[buildFunction](target[propsObject]);
                        } else {
                            // それ以外はsetter関数
                            return (value: any) => {
                                target[propsObject][prop] = value;
                                return receiver;
                            };
                        }
                    },
                }
            );
        }
    }

    function builderFactory<Props, Result>(
        bf: BuildFunction<Props, Result>
    ): new () => Builder<Props, Result> {
        return class {
            constructor() {
                return new BuilderImpl(bf);
            }
        } as any;
    }

    const RequestBuilder = builderFactory<
        {
            url: string;
            method: string;
            data: any;
        },
        string
    >(
        ({ url, method, data }) =>
            `url = ${url}, method = ${method}, data = ${JSON.stringify(data)}`
    );

    const req = new RequestBuilder()
        .data({ a: "b" })
        .url("http://example.com")
        .method("POST")
        .build();

    console.log(req);
}
