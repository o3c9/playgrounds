#include <Arduino.h>

void setup()
{
    Serial.begin(115200);
    delay(100);

    Serial.printf("_Bool = %d\r\n", (int)sizeof(_Bool));
    Serial.printf("char = %d\r\n", (int)sizeof(char));
    Serial.printf("short = %d\r\n", (int)sizeof(short));
    Serial.printf("int = %d\r\n", (int)sizeof(int));
    Serial.printf("long = %d\r\n", (int)sizeof(long));
    Serial.printf("long long = %d\r\n", (int)sizeof(long long));
    Serial.printf("float = %d\r\n", (int)sizeof(float));
    Serial.printf("double = %d\r\n", (int)sizeof(double));
}

void loop()
{
}
