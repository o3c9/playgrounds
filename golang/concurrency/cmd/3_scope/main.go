package main

import (
	"fmt"
	"sync"
)

func scope1() {
	var wg sync.WaitGroup
	for _, m := range []string{"Hello", "Good day", "Greeting"} {
		wg.Add(1)
		go func() {
			defer wg.Done()
			fmt.Println(m)
		}()
	}
	wg.Wait()
}

func scope2() {
	var wg sync.WaitGroup
	for _, m := range []string{"Hello", "Good day", "Greeting"} {
		wg.Add(1)
		go func(message string) {
			defer wg.Done()
			fmt.Println(message)
		}(m)
	}
	wg.Wait()
}

func main() {
	scope1()
	scope2()
}
