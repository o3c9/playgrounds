#include <stdio.h>

void printarray(const char *label, int arr[][3])
{
    // TODO: どのようにしてarrの外側の大きさがわかるのか
    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            int *k = arr[i];
            printf("%s [%d][%d]: %d\n", label, i, j, *(k + j));
        }
    }
}

void printarray_with_array_pointer(const char *label, int (*arr)[3])
{
    // TODO: どのようにしてarrの大きさがわかるのか
    printf("sizeof(*arr)=%ld\n", sizeof(*arr));

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            int *k = arr[i];
            printf("%s [%d][%d]: %d\n", label, i, j, *(k + j));
        }
    }
}

int main()
{
    int a[3];
    int(*a_p)[3];

    a_p = &a;

    printf("&a: %p\n", &a);
    printf("a: %p\n", a); // aは先頭要素へのポインタで蟻、これは配列のアドレスである &a　と等しい
    printf("a_p: %p\n", a_p);

    // 先頭要素へのポインタをincrementすると +4して、次の要素を指す
    printf("a+1: %p\n", a + 1);
    // 配列[3]へのポインタをincrementすると + 4*3して、次の配列を指す（そんなものはないけど）
    printf("a_p+1: %p\n", a_p + 1);

    int bigarray[][3] = {
        {100, 101, 102},
        {200, 201, 202},
        {300, 301, 302},
        {400, 401, 402},
        {500, 501, 502}};
    printarray("\"[][3]\"", bigarray);

    printarray_with_array_pointer("\"(*a)[3]\"", (int(*)[3]) & bigarray);
}
