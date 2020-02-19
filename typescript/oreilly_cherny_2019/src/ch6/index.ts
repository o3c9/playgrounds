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
