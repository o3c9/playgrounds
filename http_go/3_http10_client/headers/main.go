package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

func main() {
	client := &http.Client{}
	request, err := http.NewRequest("GET", "http://localhost:18888", nil)
	if err != nil {
		panic(err)
	}
	request.Header.Add("Content-Type", "image/jpeg")
	request.Header.Add("User-Agent", "Mozzila;")
	request.SetBasicAuth("user", "pass")
	resp, _ := client.Do(request)
	dump, _ := httputil.DumpResponse(resp, true)
	log.Println(string(dump))
}
