#include <Arduino.h>

void setup()
{
    Serial.begin(115200);

#ifdef __STDC_NO_VLA__
    Serial.println("vla not implemented in avr");
#else
    Serial.println("you can use vla");
#endif
}

void loop()
{
}
