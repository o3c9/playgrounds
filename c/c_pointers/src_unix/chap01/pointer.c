#include <stdio.h>

int main(void)
{
    int v1 = 5;
    int v2 = 10;
    int *v1_p;

    /* それぞれの変数のアドレスを表示する */
    printf("&v1..%p\n", (void *)&v1);
    // printf("&v2..%p\n", (void *)&v2);
    printf("&v1_p..%p\n", (void *)&v1_p);

    /* ポインタ変数v1_pにhogeのアドレスを代入する */
    v1_p = &v1;
    printf("v1_p..%p\n", (void *)v1_p);

    /* v1_pを経由してhogeの値を表示する */
    printf("*v1_p..%d\n", *v1_p);

    /* v1_pを経由してhogeの値を変更する */
    *v1_p = 10;
    printf("v1..%d\n", v1);

    return 0;
}
