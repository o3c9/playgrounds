package main

import (
	"fmt"
	"time"
)



func main() {
	var data int
	go func() { data++ }()
	time.Sleep(1 * time.Microsecond)
	if data == 0 {
		fmt.Println("the value is 0")
	} else {
		fmt.Printf("the value is %v.\n", data)
	}
}