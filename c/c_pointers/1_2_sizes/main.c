#include <stdio.h>

int main()
{
    printf("_Bool = %d\r\n", (int)sizeof(_Bool));
    printf("char = %d\r\n", (int)sizeof(char));
    printf("short = %d\r\n", (int)sizeof(short));
    printf("int = %d\r\n", (int)sizeof(int));
    printf("long = %d\r\n", (int)sizeof(long));
    printf("long long = %d\r\n", (int)sizeof(long long));
    printf("float = %d\r\n", (int)sizeof(float));
    printf("double = %d\r\n", (int)sizeof(double));

    printf("size_t = %zd\r\n", sizeof(size_t)); // c99
}
