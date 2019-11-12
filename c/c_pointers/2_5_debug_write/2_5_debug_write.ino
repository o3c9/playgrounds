#include <Arduino.h>
#include "debug_write.h"

void setup()
{
    Serial.begin(115200);

    DEBUG_WRITE("%s\r\n", "setup");
}

int count = 0;

void loop()
{
    DEBUG_WRITE("%s %d\r\n", "loop", ++count);
    delay(500);
}
