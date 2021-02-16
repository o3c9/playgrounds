package main

import (
	"fmt"
	"sync"
)

func main() {
	var numCalcs int
	pool := &sync.Pool{
		New: func() interface{} {
			numCalcs++
			mem := make([]byte, 1024)
			return &mem
		},
	}
	pool.Put(pool.New())
	pool.Put(pool.New())
	pool.Put(pool.New())
	pool.Put(pool.New())
	const workers = 1024 * 1024
	var wg sync.WaitGroup
	wg.Add(workers)
	for i := workers; i > 0; i-- {
		go func() {
			defer wg.Done()
			mem := pool.Get().(*[]byte)
			defer pool.Put(mem)
		}()
	}
	wg.Wait()
	fmt.Printf("%d calculatros were created", numCalcs)
}
