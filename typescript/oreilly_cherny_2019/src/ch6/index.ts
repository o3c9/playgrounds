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
