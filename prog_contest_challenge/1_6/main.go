package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"

	"github.com/o3c9/playgrounds/prog_contest_challenge/utils"
)

var sc = bufio.NewScanner(os.Stdin)

func nextInt() int {
	sc.Scan()
	i, e := strconv.Atoi(sc.Text())
	if e != nil {
		panic(e)
	}
	return i
}

func solve(n int, x *[]int) int {
	ans := 0
	utils.Combination(*x, 3, func(px []int) {
		len := px[0] + px[1] + px[2]
		mx := utils.Max(px)
		if mx < len-mx {
			ans = utils.Max([]int{ans, len})
		}
	})
	return ans
}

func main() {
	sc.Split(bufio.ScanWords)
	n := nextInt()
	x := []int{}
	for i := 0; i < n; i++ {
		x = append(x, nextInt())
	}
	fmt.Println(solve(n, &x))
}
