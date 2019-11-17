#include <stdio.h>

int main()
{
    printf("sizeof(int[10]): %ld\n", sizeof(int[10]));
    printf("sizeof(double[10]): %ld\n", sizeof(double[10]));
    printf("sizeof(int(*)[10]): %ld\n", sizeof(int(*)[10]));
    printf("sizeof(double(*)[10]): %ld\n", sizeof(double(*)[10]));
    printf("sizeof(int(*[10])): %ld\n", sizeof(int(*[10])));
    printf("sizeof(double(*[10])): %ld\n", sizeof(double(*[10])));

    // array of 5 pointers to function(double) returning int
    // = 5 * sizeof(pointer) = 5 * 8 = 40
    printf("sizeof(int (*[5])(double)): %ld\n", sizeof(int (*[5])(double)));
}
