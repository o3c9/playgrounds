package main

import (
	"fmt"
)

// Calc is a number struct
type Calc struct{ lhs, rhs int }

// Add is a top-level function to add members of Calc
func Add(c Calc) int {
	return c.lhs + c.rhs
}

// Add is a receiver method to add members of Calc
func (c Calc) Add() int {
	return c.lhs + c.rhs
}

func main() {
	x := Calc{1, 3}
	fmt.Println(Add(x))

	y := Calc{3, 5}
	fmt.Println(y.Add())
}
