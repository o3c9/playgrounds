#include <stdio.h>
#include "read_line.h"

int main()
{
    int ln = 0;
    char *line;

    while ((line = read_line(stdin)) != NULL)
    {
        printf("[%d] %s\n", ln, line);
        ln++;
        if (ln > 3)
            break;
    }
    free_buffer();

    printf("line after freed: %s\n", line);
}
