#include <Arduino.h>

void setup()
{
    Serial.begin(115200);
    delay(10);

    int hoge = 0x12345678;
    unsigned char *hoge_p = (unsigned char *)&hoge;

    Serial.printf("%x\r\n", hoge_p[0]);
    Serial.printf("%x\r\n", hoge_p[1]);
    Serial.printf("%x\r\n", hoge_p[2]);
    Serial.printf("%x\r\n", hoge_p[3]);
}

void loop()
{
}
