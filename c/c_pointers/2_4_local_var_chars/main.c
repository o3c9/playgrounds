#include <stdio.h>

char *i2s(int i)
{
    char buf[20];
    sprintf(buf, "%d", i);
    return buf;
}

int main()
{
    const char *s1 = i2s(2000);
    const char *s2 = i2s(13000);

    printf("s1 = %s and s2 = %s", s1, s2);
}
