#ifndef __DEBUG_WRITE_H__
#define __DEBUG_WRITE_H__

#include <Arduino.h>
#include <stdarg.h>

#ifdef DEBUG
#define DEBUG_WRITE(fmt, ...) ((debug_write("%s", __FILE__), debug_write(fmt, __VA_ARGS__)))
#else
#define DEBUG_WRITE(...)
#endif

void debug_write(char *format, ...)
{
    va_list ap;
    va_start(ap, format);
    Serial.printf(format, ap);
    va_end(ap);
}

#endif // __DEBUG_WRITE_H__
