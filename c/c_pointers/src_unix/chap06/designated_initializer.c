#include <stdio.h>

typedef struct {
    int a;
    int b;
    int c;
    int array[10];
} Hoge;

typedef union {
    int int_value;
    double double_value;
} Piyo;

int main(void)
{
    // 構造体についてメンバを指定して初期化。
    // 配列についても、添字を指定して初期化。その後ろに並んだ数値は、
    // 添字で指定した要素の続きに割り当てられる。
    Hoge hoge = {.b = 3, .c = 5, {[3] = 10, 11, 12}};

    fprintf(stderr, "hoge.b..%d, hoge.c..%d\n", hoge.b, hoge.c);
    fprintf(stderr, "hoge.array[3..] %d, %d, %d\n",
	    hoge.array[3], hoge.array[4], hoge.array[5]);

    // 共用体について、メンバを指定して初期化
    Piyo piyo = {.double_value = 123.456};
    fprintf(stderr, "piyo.double_value..%f\n", piyo.double_value);

    return 0;
}
