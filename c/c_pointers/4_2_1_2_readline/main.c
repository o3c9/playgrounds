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
        free(line);
        line = NULL;

        printf("line after freed: %s\n", line);
    }
    free_buffer();
}
