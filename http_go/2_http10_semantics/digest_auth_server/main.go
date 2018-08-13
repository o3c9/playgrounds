package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/k0kubun/pp"
)

func handler(w http.ResponseWriter, r *http.Request) {
	pp.Printf("URL: %s\n", r.URL.String())

	defer r.Body.Close()
	body, _ := ioutil.ReadAll(r.Body)
	fmt.Printf("--body--\n%s\n", string(body))
	if _, ok := r.Header["Authorization"]; !ok {
		w.Header().Add("WWW-Authenticate", `Digest realm="Secret Zone", nonce="1234567890", algorithm=MD5, qop=auth`)
		w.WriteHeader(http.StatusUnauthorized)
	} else {
		fmt.Fprintf(w, "<html><body>Secret page</body></html>\n")
	}
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("start http listening :18888")
	log.Println(http.ListenAndServe(":18888", nil))
}
