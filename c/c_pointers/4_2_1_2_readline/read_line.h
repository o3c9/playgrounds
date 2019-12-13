#ifndef __READ_LINE_H__
#define __READ_LINE_H__

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *read_line(FILE *fp);
void free_buffer();

#endif /* __READ_LINE_H__ */
