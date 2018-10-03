package main

import "fmt"

func main() {
	a := 'a'
	ma := '魔'

	fmt.Printf("%d %[1]c %[1]q\n", a)
	fmt.Printf("%d %[1]c %[1]q\n", ma)
}
