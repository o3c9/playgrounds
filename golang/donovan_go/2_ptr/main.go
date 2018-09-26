package main

import "fmt"

func f() *int {
	v := 0
	v++
	return &v
}

func incr(v *int) *int {
	*v++
	return v
}

func main() {
	fmt.Println(f() == f())
	v := 99
	ret := incr(&v)
	fmt.Printf("incr: %d (%p)\n", v, ret)
}
