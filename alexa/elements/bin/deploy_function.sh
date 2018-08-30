#!/bin/bash

yarn > /dev/null 2>&1
tsc
cd dist
zip -qr app.zip ./ ../node_modules
aws lambda update-function-code --function-name $ALEXA_FUNCTION_NAME --zip-file fileb://app.zip --profile $AWS_PROFILE
rm -f app.zip
