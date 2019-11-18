#include <stdio.h>
#include <stdlib.h>
#include <err.h>
#include <string.h>

#define DAYS_IN_WEEK 7
#define MOTTO_MAX_LEN 1024

const char *days_in_week[] = {
    "sun", "mon", "tue", "wed", "thu", "fri", "sat"};

void read_motto(FILE *fp, char **motto, int size)
{
    char buf[MOTTO_MAX_LEN];
    for (int i = 0; i < size; i++)
    {
        printf("%s > ", days_in_week[i]);
        fgets(buf, MOTTO_MAX_LEN, fp);
        int len = strlen(buf);
        if (buf[len - 1] != '\n')
        {
            warn("too long");
            exit(1);
        }
        buf[len - 1] = '\0'; // remove newline
        motto[i] = malloc(sizeof(char) * len);
        strcpy(motto[i], buf);
        printf("\n");
    }
    printf("\n");
}

int main()
{

    char *mottos[DAYS_IN_WEEK];
    read_motto(stdin, mottos, DAYS_IN_WEEK);

    for (int i = 0; i < DAYS_IN_WEEK; i++)
    {
        printf("%s: %s\n", days_in_week[i], mottos[i]);
        free(mottos[i]);
    }
}
