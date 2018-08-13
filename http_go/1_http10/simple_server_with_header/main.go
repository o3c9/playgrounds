package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
)

func handler(w http.ResponseWriter, r *http.Request) {
	dump, err := httputil.DumpRequest(r, true)
	if err != nil {
		http.Error(w, fmt.Sprint(err), http.StatusInternalServerError)
		return
	}
	fmt.Println(string(dump))
	w.Header().Set("Content-Type", "text/html; charset=ascii")
	w.Header().Set("Set-Cookie", "SID=12345; Path=/; HttpOnly")
	fmt.Fprintf(w, "<html><body>Hello</body></html>")
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("start http listening :18888")
	log.Println(http.ListenAndServe(":18888", nil))
}
