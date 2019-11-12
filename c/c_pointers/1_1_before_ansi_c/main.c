#include <stdio.h>

int func(a, b) int a;
int b;
{
    return a + b;
}

int main()
{
    int ans = func(3, 4);
    printf("The answer is %d\r\n", ans);
    return 0;
}
