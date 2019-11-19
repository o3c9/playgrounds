#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ALLOC_MEM_SIZE 10

char *append_char(char *buf, char c, int *idx, int *size)
{
    if (*idx == *size)
    {
        buf = (char *)realloc(buf, sizeof(char) * (*size + ALLOC_MEM_SIZE));
        *size += ALLOC_MEM_SIZE;
    }
    buf[*idx] = c;
    (*idx)++;
    return buf;
}

char *read_line(FILE *fp, int *len)
{
    char c;
    char *buf = (char *)malloc(sizeof(char) * ALLOC_MEM_SIZE);
    int size = ALLOC_MEM_SIZE;
    int count = 0;
    while ((c = fgetc(fp)) != EOF)
    {
        if (c == '\n')
        {
            buf = append_char(buf, '\0', &count, &size);
            break;
        }
        buf = append_char(buf, c, &count, &size);
    }
    if (c == EOF)
    {
        if (count > 0)
        {
            buf = append_char(buf, '\0', &count, &size);
        }
        else
        {
            buf = NULL;
        }
    }

    *len = count;

    return buf;
}

char **append_line(char **buf, char *line, int *idx, int *size)
{
    if (*idx == *size)
    {
        buf = (char **)realloc(buf, sizeof(char *) * (*size + ALLOC_MEM_SIZE));
        *size += ALLOC_MEM_SIZE;
    }

    buf[*idx] = line;
    (*idx)++;
    return buf;
}

char **read_file(FILE *fp, int *num)
{
    char **buf_f = (char **)malloc(sizeof(char *) * ALLOC_MEM_SIZE);
    int size = ALLOC_MEM_SIZE;
    int count = 0;
    char *line = NULL;
    int len = 0;
    while ((line = read_line(fp, &len)) != NULL)
    {
        printf("read_line: %d %d\n", count, len);
        buf_f = append_line(buf_f, line, &count, &size);
    }
    *num = count;
    printf("read_file: total=%d\n", *num);
    return buf_f;
}

int main(void)
{
    int line_num = 0;
    char **text_data = read_file(stdin, &line_num);

    for (int i = 0; i < line_num; i++)
    {
        printf("[%d] %s\n", i + 1, text_data[i]);
        free(text_data[i]);
    }
    free(text_data);
}
