package main

import "fmt"

// Celcius is temparature in C
type Celcius float64

// Fahreheit is temparature in F
type Fahreheit float64

// String()というメソッドは、fmtの中で自動的に呼ばれる
func (c Celcius) String() string {
	return fmt.Sprintf("%g°C", c)
}

func (f Fahreheit) String() string {
	return fmt.Sprintf("%g°F", f)
}

func ctof(c Celcius) Fahreheit {
	return Fahreheit(c*9/5 + 32)
}

func ftoc(f Fahreheit) Celcius {
	return Celcius((f - 32) * 5 / 9)
}

func main() {
	c := Celcius(100)
	fmt.Printf("c=%s (%s in Fahrenheit\n", c, ctof(c))
	f := Fahreheit(100)
	fmt.Printf("f=%s (%s in Celcius\n", f, ftoc(f))
}
