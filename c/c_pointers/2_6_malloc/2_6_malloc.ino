#include <M5Stack.h>

void setup()
{
    M5.begin();
    delay(200);
}

unsigned long size = 1;

void loop()
{
    void *p = malloc(size);
    if (p != NULL)
    {
        Serial.printf("malloc(%ld) ok\r\n", size);
        size *= 2;
        free(p);
    }
    else
    {
        Serial.printf("malloc(%ld) failed\r\n", size);
        ESP.restart();
    }
    delay(300);
}
