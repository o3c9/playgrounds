#include <stdio.h>

#define sizeofarray(a) (sizeof(a) / sizeof(a[0]))

void printarray(int rows, int cols, int (*p)[cols])
{

    for (int i = 0; i < rows; i++)
    {
        int *inner = *(p + i);
        for (int j = 0; j < cols; j++)
        {
            printf("[%d][%d]: %d\n", i, j, *(inner + j));
        }
    }
}

int main(void)
{
    int map[][3] = {
        {1, 2, 3},
        {11, 12, 13},
        {21, 22, 23},
        {31, 32, 33},
        {41, 42, 43}};

    int rows = sizeofarray(map);

    printf("sizeof map: %ld\n", sizeofarray(map));

    printarray(rows, 3, (int(*)[3]) & map);
}
