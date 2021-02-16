package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	c := sync.NewCond(&sync.Mutex{})
	queue := make([]interface{}, 0, 10)
	rem := func(delay time.Duration) {
		time.Sleep(delay)
		c.L.Lock()
		queue = queue[1:]
		fmt.Println("Removed from queue")
		c.L.Unlock()
		c.Signal()
	}
	for i := 0; i < 10; i++ {
		c.L.Lock()
		for len(queue) == 2 {
			c.Wait() // Continue when c.Signal called
		}
		fmt.Println("Adding to queue")
		queue = append(queue, struct{}{})
		go rem(1 * time.Second)
		c.L.Unlock()
	}
	fmt.Println("done")
}
