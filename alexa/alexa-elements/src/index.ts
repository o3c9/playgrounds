"use strict";

import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
  RequestInterceptor,
  ResponseInterceptor
} from "ask-sdk-core";

import { Response, SessionEndedRequest } from "ask-sdk-model";

import {
  DynamoDbPersistenceAdapter,
  PartitionKeyGenerators
} from "ask-sdk-dynamodb-persistence-adapter";

import elements from "./elements";

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = "Alexaで学ぼう、元素記号";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Elements", speechText)
      .getResponse();
  }
};

const HelloElementsIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent"
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = "水素・ヘリウム・リチウム・ベリリウム！";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("elements", speechText)
      .getResponse();
  }
};

const ReadIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ReadIntent"
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = elements
      .slice(0, 36)
      .map(elm => elm.name.ja)
      .join(", ");
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("elements", speechText)
      .getResponse();
  }
};

const PersistentAttributesRequestInterceptor: RequestInterceptor = {
  async process(handlerInput: HandlerInput): Promise<void> {
    const session = handlerInput.requestEnvelope.session;
    if (session && session.new == true) {
      const attr = await handlerInput.attributesManager.getPersistentAttributes();
      const callNum = attr.callNum ? attr.callNum : 0;
      attr.callNum = callNum + 1;
      handlerInput.attributesManager.setPersistentAttributes(attr);
    }
  }
};

const PersistentAttributesResponseInterceptor: ResponseInterceptor = {
  async process(handlerInput: HandlerInput): Promise<void> {
    await handlerInput.attributesManager.savePersistentAttributes();
  }
};

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`エラー: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("ごめんなさい、もう一度言い直してください")
      .reprompt("ごめんなさい、もう一度言い直してください")
      .getResponse();
  }
};

const tableName = process.env.DYNAMODB_TABLE_NAME || "AlexaElementsSessions";

const dynamoAdapter = new DynamoDbPersistenceAdapter({
  tableName: tableName,
  partitionKeyGenerator: PartitionKeyGenerators.userId
});

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloElementsIntentHandler,
    ReadIntentHandler
  )
  .addRequestInterceptors(PersistentAttributesRequestInterceptor)
  .addResponseInterceptors(PersistentAttributesResponseInterceptor)
  .withPersistenceAdapter(dynamoAdapter)
  .addErrorHandlers(ErrorHandler)
  .lambda();
