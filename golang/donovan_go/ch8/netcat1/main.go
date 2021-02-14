package main

import (
	"io"
	"log"
	"net"
	"os"
)

func mustCopy(dist io.Writer, src io.Reader) {
	if _, err := io.Copy(dist, src); err != nil {
		log.Fatal(err)
	}
}

func main() {
	c, err := net.Dial("tcp", "localhost:8000")
	if err != nil {
		log.Fatal(err)
	}
	defer c.Close()
	mustCopy(os.Stdout, c)
}
