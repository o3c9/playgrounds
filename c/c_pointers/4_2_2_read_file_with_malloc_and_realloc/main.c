#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ALLOC_MEM_SIZE 10

char *append_char(char *buf, char c, int *idx, int *size)
{
    if (*idx == *size)
    {
        buf = (char *)realloc(buf, sizeof(char) * (*idx + ALLOC_MEM_SIZE));
        *size += ALLOC_MEM_SIZE;
    }

    buf = (char *)realloc(buf, sizeof(char) * (*idx + 1));
    buf[*idx] = c;
    (*idx)++;
    return buf;
}

char *read_line(FILE *fp)
{
    char c;
    char *buf = (char *)malloc(sizeof(char) * ALLOC_MEM_SIZE);
    int size = ALLOC_MEM_SIZE;
    int count = 0;
    while ((c = fgetc(fp)) != EOF)
    {
        buf = append_char(buf, c, &count, &size);
    }
    return buf;
}

char **append_line(char **buf, char *line, int *idx, int *size)
{
    if (*idx == *size)
    {
        buf = (char **)realloc(buf, sizeof(char *) * (*idx + ALLOC_MEM_SIZE));
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
    while ((line = read_line(fp)) != NULL)
    {
        buf_f = append_line(buf_f, line, &count, &size);
    }
    *num = count;
    return buf_f;
}

int main(void)
{
    int line_num;
    char **text_data = read_file(stdin, &line_num);

    for (int i = 0; i < line_num; i++)
    {
        printf("[%d] %s\n", i + 1, text_data[i]);
        free(text_data[i]);
    }
    free(text_data);
}
