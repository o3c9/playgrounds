#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int size;

    printf("board size?");
    scanf("%d", &size);

    /* size × sizeの2次元配列を確保 */
    int (*board)[size] = malloc(sizeof(int) * size * size);

    /* 2次元配列に適当に値を代入する */
    for (int i = 0; i < size; i++) {
	for (int j = 0; j < size; j++) {
	    board[i][j] = i * size + j;
	}
    }

    /* 代入した値を表示 */
    for (int i = 0; i < size; i++) {
	for (int j = 0; j < size; j++) {
	    printf("%2d, ", board[i][j]);
	}
	printf("\n");
    }
}
