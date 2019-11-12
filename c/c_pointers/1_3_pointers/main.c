#include <stdio.h>

int main()
{
    int a = 3;
    int *a_p = &a;
    printf("a_p = %p\r\n", a_p);
    printf("a_p + 1 = %p\r\n", a_p + 1);
    printf("a_p + 4 = %p\r\n", a_p + 4);

    int *null_p = NULL;
    printf("null_p = %p\r\n", null_p);
}
