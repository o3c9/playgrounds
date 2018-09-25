package main

import (
	"fmt"
)

/**
 * https://skatsuta.github.io/2015/12/29/value-receiver-pointer-receiver/
**/

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

// Sub is a receiver method to add members of Calc with a pointer
func (c *Calc) Sub() int {
	return c.lhs - c.rhs
}

func main() {
	x := Calc{1, 3}
	fmt.Println(Add(x))

	y := Calc{3, 5}
	fmt.Println(y.Add())
	fmt.Println((&y).Add()) // implicit type conversion from *Calc to Calc

	z := Calc{100, 1}
	fmt.Println(z.Sub()) // implicit type conversion from Calc to *Calc
	fmt.Println((&z).Sub())
}
