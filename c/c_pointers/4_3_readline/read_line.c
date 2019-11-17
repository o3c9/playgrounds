#include "read_line.h"

#define INITIAL_MEM_SIZE 256

static char *st_line_buffer = NULL;

char *read_line(FILE *fp)
{
    st_line_buffer = (char *)malloc(INITIAL_MEM_SIZE);
    strlcpy(st_line_buffer, "hello, world", INITIAL_MEM_SIZE);
    return st_line_buffer;
}

void free_buffer()
{
    free(st_line_buffer);
}
