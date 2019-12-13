#include <stdio.h>
#include <stddef.h>
#include <wchar.h>
#include <locale.h>

int main(void)
{
    // ワイド文字列リテラル
    wchar_t str[] = L"日本語123𠮟";

    // wchar_tのサイズを表示
    printf("sizeof(wchar_t)..%d\n", (int)sizeof(wchar_t));
    // 配列strの長さを表示
    printf("str length..%d\n", (int)(sizeof(str) / sizeof(str[0])));
    
    // strの内容を出力する
    for (int i = 0; i < (sizeof(str) / sizeof(str[0])); i++) {
	printf("str[%d]..%0x\n", i, str[i]);
    }

    return 0;
}
