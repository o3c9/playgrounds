package main

import (
	"fmt"
	"sync"
)

func main() {
	var cnt int
	var lock sync.Mutex

	inc := func() {
		lock.Lock()
		defer lock.Unlock()
		cnt++
		fmt.Printf("Inc: %d\n", cnt)
	}

	dec := func() {
		lock.Lock()
		defer lock.Unlock()
		cnt--
		fmt.Printf("Dec: %d\n", cnt)
	}
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			inc()
		}()
	}
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			dec()
		}()
	}
	wg.Wait()
	fmt.Printf("Calculated")
}
