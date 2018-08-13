package main

import (
	"bytes"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
)

func postString() {
	data := strings.NewReader(`{hello: "world"}`)
	resp, err := http.Post("http://localhost:18888", "application/json", data)
	if err != nil {
		panic(err)
	}
	renderResponse(resp)
}

func postFile() {
	file, _ := os.Open("main.go")
	resp, err := http.Post("http://localhost:18888", "text/plain", file)
	if err != nil {
		panic(err)
	}
	renderResponse(resp)
}

func postMultipart() {
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)
	writer.WriteField("name", "Michael Jackson")
	fileWriter, err := writer.CreateFormFile("image", "photo.png")
	if err != nil {
		panic(err)
	}
	readFile, err := os.Open("photo.png")
	if err != nil {
		panic(err)
	}
	defer readFile.Close()
	io.Copy(fileWriter, readFile)

	// FormDataContentType() = boundary string
	resp, _ := http.Post("http://localhost:18888", writer.FormDataContentType(), &buffer)
	if err != nil {
		panic(err)
	}
	log.Println("Status:", resp.Status)
}

func renderResponse(resp *http.Response) {
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println(string(body))
}

func main() {
	postFile()
	postString()
	postMultipart()
}
