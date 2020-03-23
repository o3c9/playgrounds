package main

import "fmt"

func main() {
	sum := 3 + 5 + 6
	avg := float32(sum / 3)
	// avg := sum / 3
	if avg > 4.5 {
		fmt.Println("good")
	}
}
