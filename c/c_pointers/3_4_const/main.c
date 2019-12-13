#include <stdio.h>
#include <string.h>

void strfunc_cpy(char *str)
{
    strcpy(str, "NULL");
    str[4] = '\0';
}

void strfunc_nullify(char *str)
{
    str = NULL;
}

int main(void)
{
    const char str[] = "hello, world";
    char *str_p = "hello, world";
    printf("%s, sizeof str = %ld, &str=%p\n", str, sizeof(str), &str);
    printf("%s, sizeof str_p %ld, str_p=%p\n", str_p, sizeof(*str_p), str_p);

    // compiler warning
    // strfunc_cpy(str);

    strfunc_nullify(str_p);

    printf("%s\n", str);

    if (str_p != NULL)
    {
        printf("%s\n", str_p);
    }
    else
    {
        printf("str_p is NULL\n");
    }
}
