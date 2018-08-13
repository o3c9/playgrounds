package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

func main() {
	params := url.Values{
		"query": {"hello world"},
	}
	resp, err := http.Get("http://localhost:18888" + "?" + params.Encode())
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	log.Println("Status:", resp.Status)
	log.Println("StatusCode:", resp.StatusCode)
	for h, v := range resp.Header {
		log.Println(h+":", v[0])
	}
	log.Println(string(body))
}
