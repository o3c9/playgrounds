import { title } from "../util";

{
    title("advanced types");

    console.log("subtyping", "assignability", "variance", "widening");
    console.log("TypeScript’s control-flow-based typechecking feature");
    console.log("    refinement and totality");
    console.log("advanced features such as");
    console.log("    keying into and mapping over object types");
    console.log("    using conditional types, defining your own type guards");
    console.log(
        "    and escape hatches like type assertions and definite assignment assertions"
    );
    console.log(
        "advanced patterns for squeezing more safety out of your types"
    );
    console.log("    the companion object pattern");
    console.log("    improving inference for tuple types");
    console.log("    simulating nominal types");
    console.log("    and safely extending the prototype");
}

{
    title("subtype and supertype");

    type ExistingUser = { id: string; name: string };
    type NewUser = { name: string };

    function deleteUser(u: { id?: string; name: string }) {
        if (u.id) {
            delete u.id;
        }
        console.log("deleted", u);
    }

    const user: ExistingUser = { id: "1", name: "Tom" };
    deleteUser(user);
    // ここでtypescriptはidがなくなっていることを検知できない
    console.log(user.id);
}

{
    title("function parameters are contravariant");

    class Animal {}
    class Bird extends Animal {
        public static from(a: Animal) {
            return new Bird();
        }

        public chirp() {
            console.log("chirp");
        }
    }

    class Crow extends Bird {
        public caw() {
            console.log("caw");
        }
    }

    function chirpBird(b: Bird): Bird {
        b.chirp();
        return b;
    }

    // `Bird`に，`Crow`は代入できるが，`Animal`はだめ
    // 子クラスなら許される．これをcovariantという
    chirpBird(new Crow());
    chirpBird(new Bird());
    // chirpBird(new Animal()); //TS2345 Argument of type 'Animal' is not assignable to parameter of type 'Bird'.

    function cloneBird(b1: Bird, f: (b: Bird) => Bird): void {
        f(b1);
    }

    const fSuper = (a: Animal) => Bird.from(a);
    const fSub = (c: Crow) => Bird.from(c);
    cloneBird(new Bird(), fSuper);

    // `(Bird) => Bird`に，`(Crow) => Bird`は代入できないが，反対に`(Animal) => Bird`はOK
    // 親クラスなら許される．contravariantという．
    // cloneBird(new Bird(), fSub); TS2345
}

{
    title("type widening");

    // constの場合は，type-wideningされない
    const a = "s"; // a: "s"

    let b = "s"; // b: string
    // type-wideningを避けるには，型を明示的に宣言する
    let c: "s" = "s"; // c: "s"

    // nullやundefinedは，anyへと拡張される
    // ただし，同じscope内で別の値が代入された場合には，その値を利用する
    let n = null; // n:any
}

{
    title("excess property checking => quiver");
    title("refinement => quiver");
    title("discriminated union types => quiver");
}

{
    title("totality");

    // 全部のパターンを網羅しているかコンパイラがチェックしてくれる

    type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

    // Error TS2366: Function lacks ending return
    //
    // function getDay(w: Weekday): number {
    //     switch (w) {
    //         case "Mon": return 0
    //     }
    // }
}

{
    title("advanced object types / key-in operator");

    // ある型から key inして，別の型を取り出すことができる

    type APIResponse = {
        user: {
            Id: string;
            friends: {
                count: number;
                friends: Array<{
                    first: string;
                    last: string;
                }>;
            };
        };
    };

    type FriendList = APIResponse["user"]["friends"];

    const renderFriends = (f: FriendList) => {
        console.log(f);
    };

    // individual Friendは，[number]で取り出すことができる
    type Friend = FriendList["friends"][number];
}

{
    title("advanced object types / key-of operator");

    type APIResponse = {
        user: {
            Id: string;
            friends: {
                count: number;
                friends: Array<{
                    first: string;
                    last: string;
                }>;
            };
        };
    };

    // 'user'
    type ResponseKeys = keyof APIResponse;
    // 'Id' | 'friends'
    type UserKeys = keyof APIResponse["user"];

    // key-inとkeyofを組み合わせればtype-safeなgetterがつくれる
    function get<O extends object, K extends keyof O>(o: O, k: K) {
        return o[k];
    }

    get({ name: "tom" }, "name");
    // get({ name: "tom" }, "phone"); error "phone" is not assignable to ...

    // javascriptでは，objectやarrayはstring, symbol キーをもち，かつarrayの場合は慣習的にnumberをつかうため，
    // keyof の戻り値は，string | symbol | number となる．

    // `keyofStringsOnly`オプションを使うと，これを変更できる
}

{
    title("Record");

    // Record Typeを使うと，objectに比べて，keyの範囲を，特定の文字列またはnumberに制限できる

    type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
    type Day = Weekday | "Sat" | "Sun";

    const nextDay: Record<Weekday, Day> = {
        Mon: "Tue",
        Tue: "Wed",
        Wed: "Thu",
        Thu: "Fri",
        Fri: "Sat",
    };

    const Mon = "Mon";

    console.log(nextDay[Mon]);
}

{
    title("Mapped Types");

    type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
    type Day = Weekday | "Sat" | "Sun";

    const nextDay: { [key in Weekday]: Day } = {
        Mon: "Tue",
        Tue: "Wed",
        Wed: "Thu",
        Thu: "Fri",
        Fri: "Sat",
    };

    const Mon = "Mon";
    console.log(nextDay[Mon]);

    // Record Type acutally uses this mapped types background
}

{
    title("Companion Object Pattern");
    // 型であると同時にObjectでもある．これによってclassのstaticメソッドのようなことができる

    type Unit = "EUR" | "GBP" | "JPY" | "USD";

    type Currency = {
        unit: Unit;
        value: number;
    };

    // Textにあるような
    //
    // let Currency = {
    //     DEFAULT: "USD",
    //     from(value: number, unit = Currency.DEFAULT): Currency {
    //         return { unit, value };
    //     },
    // };
    // だとnoImplicitAnyにひっかかってしまう

    const Currency = {
        from(value: number, unit: Currency["unit"] = "USD"): Currency {
            return { unit, value };
        },
    };

    const usd = Currency.from(10);
    console.log(`${usd.value} ${usd.unit}`);
}

{
    title("type inference for tuples");

    // tupleはarrayなので，長さも自由だし，ポジションごとの型も自由
    let a = [1, true]; // (number|boolean)[]
    a[0] = false; // ok
    a[2] = 3;

    // 厳格にするには，こうした関数を使って型をはめてしまう
    function tuple<T extends unknown[]>(...ts: T): T {
        return ts;
    }
    let b = tuple(1, true);
    // b[0] = false; // ng
    // b[2] = 3; // ng
}

{
    title("User-Defined Type Guards");

    // typeof を同じスコープで使うと，refinementがきく
    function parseInput(arg: string | number): number {
        if (typeof arg === "string") {
            return parseInt(arg, 10);
        } else {
            return arg;
        }
    }

    // typeof を別スコープで使うと，refinementがきかなくなる
    function isString_B(arg: unknown) {
        return typeof arg === "string";
    }

    // エラー
    // function parseInput_NG(arg: string | number): number {
    //     if (isString_B(arg)) {
    //         return parseInt(arg, 10);
    //     } else {
    //         return arg;
    //     }
    //

    // そこでuser-defined guardをつかう
    function isString(arg: unknown): arg is string {
        return typeof arg === "string";
    }
    function parseInput_Guard(arg: string | number): number {
        if (isString(arg)) {
            return parseInt(arg, 10);
        } else {
            return arg;
        }
    }
}

{
    title("Conditional Types");

    type IsString<T> = T extends string ? 1 : 0;

    type One = IsString<string>; // One: 1
    type Zero = IsString<number>; // One: 0

    type ToArray<T> = T[];
    type strings = ToArray<string>; // string[]
    type ns = ToArray<string | number>; // (string|number)[]

    // 条件付きTypeの分配法則を利用すると，Tがunionだった場合に，個別の型ごとに分解される
    // `(string|number)[]`
    // ではなく，
    // `string[] | number[]`
    // が定義できる
    type ToArrayDistribute<T> = T extends unknown ? T[] : T[];
    type ns2 = ToArrayDistribute<string | number>; // (string[] | number[])
}

{
    title("infer keyword");

    // Type Conditionの中でその他の情報から型推論を行い，型変数に入れる

    // 与えられた関数の最初の引数の型を返す
    type FuncFirstArg<F> = F extends (a: infer A) => any ? A : never;
    type F1 = FuncFirstArg<typeof Array["prototype"]["splice"]>; // number
}

{
    title("Builtin Conditional Types");

    type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    type Weekend = "Sat" | "Sun";
    type WeekDay = Exclude<Day, Weekend>;

    // const d: WeekDay = "Sat";// NG

    // Extract
    type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"

    // NotNullable
    type T04 = NonNullable<string | number | undefined>; // string | number
    type T05 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]

    // ReturnType
    type T12 = ReturnType<<T>() => T>; // {}

    // InstanceType
    class C {}
    type T20 = InstanceType<typeof C>; // C
}

{
    title("excape hatches");

    // as または <T>a を使うことで型を矯正させることができるが，なるべく使わないこと
    // !をつかうことで，Not-nullであることを宣言できるが，これは，そもそも元の型に`|null`がついているのを外すことを考慮すべきかも
}

{
    title("type branding");
    // Nominal typesをsimulate する

    type UserID = string;
    type OrderID = string;

    function fetchUser(id: UserID) {
        console.log(id);
    }

    const order: OrderID = "order-123";
    fetchUser(order); // !!!!

    // UserId型にOrderId型を紛れさせないようにするには，

    type UserID2 = string & { readonly brand: unique symbol };
    type OrderID2 = string & { readonly brand: unique symbol };

    function fetchUser2(id: UserID2) {
        console.log(id);
    }

    function OrderID2(id: string) {
        return id as OrderID2;
    }

    const order2: OrderID2 = OrderID2("order-123");
    // fetchUser2(order2); // Error
}

{
    title("exercises 6");

    // ok
    const l1: 1 = 1;
    const r1: number = l1;

    // ng
    const l2: number = 1;
    // const r2: 1 = l2;

    // const a4: number = true;

    const l7: { a: true } = { a: true };
    const r7: { a: boolean } = l7;

    const l8: { a: { b: [string] } } = { a: { b: ["hi"] } };
    const r8: { a: { b: [number | string] } } = l8;

    // OK 関数の引数に関しては，contravariantなので，広い型を持つ方を狭い方に入れることができる
    const l11: (a: number | string) => string = a => "a";
    const r11: (a: string) => string = l11;
    console.log(r11("hi"));

    type O = { a: { b: { c: string } } };
    type K_O = keyof O; // "a"
    type K_O_A = keyof O["a"]; // "b"
    type K_O_A_B = keyof O["a"]["b"]; // "c"

    type Exclusive<T, U> =
        | (T extends U ? never : T)
        | (U extends T ? never : U);

    type TEx = Exclusive<1 | 2 | 3, 2 | 3 | 4>;
}
