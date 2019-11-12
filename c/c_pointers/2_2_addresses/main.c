#include <stdio.h>
#include <stdlib.h>

int g1;
static int g_st1;

void func1()
{
    int f1_v;
    static int f1_st_v;

    printf("&f1_v: %p\n", (void *)&f1_v);
    printf("&f1_st_v: %p\n", (void *)&f1_st_v);
}

void func2()
{
    int f2_v;
    printf("&f2_v: %p\n", (void *)&f2_v);
}

void d_add1(double d)
{
    printf("d_add1: d + 1.0 = %f\n", d + 1.0);
}

void d_add2(double d)
{
    printf("d_add2: d + 2.0 = %f\n", d + 2.0);
}

int main()
{
    int *p;

    // Display function addresses
    // 厳密には関数へのポインタを(void*)にキャストすることはできず、printfに渡す方法は定義されていないのであるが、
    // たいていの処理系では警告は出ても動作する
    printf("func1: %p\n", (void *)func1);
    printf("func2: %p\n", (void *)func2);

    printf("string literal: %p\n", (void *)"abc");
    printf("string literal2: %p\n", (void *)"abc");

    printf("global variable: %p\n", (void *)&g1);
    printf("file static variable: %p\n", (void *)&g_st1);

    func1();
    func2();

    p = (int *)malloc(sizeof(int));
    printf("malloc address: %p\n", (void *)p);
    free(p);

    // 関数へのポインタ
    // アドレス値を入れ替えると挙動が変わる
    void (*d_func_p)(double);

    d_func_p = d_add1;
    d_func_p(1.0);

    d_func_p = d_add2;
    d_func_p(1.0);

    return 0;
}
