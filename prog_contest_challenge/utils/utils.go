package utils

func Max(a []int) int {
	max := a[0]
	for _, i := range a {
		if i > max {
			max = i
		}
	}
	return max
}

func comb(n, m int, emit func([]int)) {
	s := make([]int, m)
	last := m - 1
	var rc func(int, int)
	rc = func(i, next int) {
		for j := next; j < n; j++ {
			s[i] = j
			if i == last {
				emit(s)
			} else {
				rc(i+1, j+1)
			}
		}
		return
	}
	rc(0, 0)
}

func Combination(x []int, m int, emit func([]int)) {
	comb(len(x), m, func(px []int) {
		nx := []int{}
		for _, e := range px {
			nx = append(nx, x[e])
		}
		emit(nx)
	})
}
