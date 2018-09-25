package	main;

import "fmt"

func main() {
	var a = new(int)
	fmt.Printf("a is %d\n", *a)
	fmt.Printf("the address of a is %#x\n", a)
}
