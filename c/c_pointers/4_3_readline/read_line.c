#include "read_line.h"
#include <assert.h>

#define INITIAL_MEM_SIZE 256

static char *st_line_buffer = NULL;
static int st_current_line_size = 0;
static int st_current_used_size = 0;

void add_char(char c)
{
    assert(st_current_line_size >= st_current_used_size);

    if (st_current_line_size == st_current_used_size)
    {
        st_line_buffer = realloc(st_line_buffer, sizeof(char) * (st_current_used_size + INITIAL_MEM_SIZE));
        st_current_line_size += INITIAL_MEM_SIZE;
    }
    st_line_buffer[st_current_used_size] = c;
    st_current_used_size++;
}

char *read_line(FILE *fp)
{
    char c;
    st_current_used_size = 0;

    while ((c = getc(fp)) != EOF)
    {
        if (c == '\n')
        {
            add_char('\0');
            break;
        }
        add_char(c);
    }
    if (c == EOF)
    {
        if (st_current_used_size > 0)
        {
            add_char('\0');
        }
        else
        {
            return NULL;
        }
    }

    size_t sz = sizeof(char) * st_current_used_size;
    char *ret = (char *)malloc(sz);
    strlcpy(ret, st_line_buffer, sz);
    return ret;
}

void free_buffer()
{
    free(st_line_buffer);
    st_line_buffer = NULL;
    st_current_line_size = 0;
    st_current_used_size = 0;
}
