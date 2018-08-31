# Alexa Elements

Let's learn elements with Alexa

## Sync models

```
ask api get-model -s <skillId> -l <locale> >! models/<locale>.json
```

## Deploy Function Code

```sh
 yarn clean && yarn pjson && yarn build && ask deploy -t lambda
```

## Test

```sh
yarn test
```
