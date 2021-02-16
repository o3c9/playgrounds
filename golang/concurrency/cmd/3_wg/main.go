package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	hello := func() {
		defer wg.Done()
		fmt.Println("Hello!")
	}
	wg.Add(1)
	go hello()
	wg.Wait()
}
