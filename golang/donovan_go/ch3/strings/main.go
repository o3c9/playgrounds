package main

import (
	"fmt"
)

func main() {
	s := "あけましておめでとう"
	fmt.Printf("len(%s) == %d\n", s, len(s))
	fmt.Printf("\"%s\"[0] == %v\n", s, s[0])

	t := "hello, world"
	fmt.Printf("the address of t is %v\n", &t)
	t0 := t
	fmt.Printf("the address of t0 is %v\n", &t0)
	t1 := t[7:]
	fmt.Printf("the address of t1 is %v\n", &t1)
	t2 := t[:5]
	fmt.Printf("the address of t2 is %v\n", &t2)
	fmt.Println("\a")
	fmt.Println(`\a`) // raw string literal, where all the escape sequences are disalloed
}
