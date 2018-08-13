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

	resp, err := http.PostForm("http://localhost:18888", params)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println(string(body))
}
