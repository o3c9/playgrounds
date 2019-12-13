#include <stdio.h>

#define sizeofarray(a) (sizeof(a) / sizeof(a[0]))

void func(int *array, int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("array[%d] = %d\n", i, array[i]);
    }
}

int main(void)
{
    int array[] = {1, 2, 3, 4, 5};

    func(array, sizeofarray(array));
}
