package main

import (
	"bufio"
	"fmt"
	"os"
)

var sc = bufio.NewScanner(os.Stdin)

func nextLine() string {
	sc.Scan()
	return sc.Text()
}

func main() {
	s, t := nextLine(), nextLine()
	fmt.Printf("[1] %s\n", s)
	fmt.Printf("[2] %s\n", t)
}
