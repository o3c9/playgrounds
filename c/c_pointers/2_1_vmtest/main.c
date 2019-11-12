#include <stdio.h>

int gval;

int main(void)
{
    char buf[256];

    printf("&gval %p\n", (void *)&gval);

    printf("Input initial value.\n");
    fgets(buf, sizeof(buf), stdin);
    sscanf(buf, "%d", &gval);

    for (;;)
    {
        printf("gval %d\n", gval);
        getchar();
        gval++;
    }
}
