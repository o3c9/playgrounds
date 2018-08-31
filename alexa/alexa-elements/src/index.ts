"use strict";

import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
  RequestInterceptor,
  ResponseInterceptor
} from "ask-sdk-core";

import { Response, IntentRequest, Slot } from "ask-sdk-model";

import { DynamoDB, Request } from "aws-sdk";

import {
  DynamoDbPersistenceAdapter,
  PartitionKeyGenerators
} from "ask-sdk-dynamodb-persistence-adapter";

import elements from "./elements";
import { getIndex } from "./utils";

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

const ReadAllIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ReadAllIntent"
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
      .withShouldEndSession(true)
      .getResponse();
  }
};

const ReadOneIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ReadOneIntent"
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const req = handlerInput.requestEnvelope.request;
    const slots = req.intent.slots;
    const idx = getIndex(slots);

    const speechText = `${elements[idx].name.ja}だよ`;
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
      .withSimpleCard("エラー", error.message)
      .getResponse();
  }
};

const tableName = process.env.DYNAMODB_TABLE_NAME || "AlexaElementsSessions";

const dynamoAdapter = new DynamoDbPersistenceAdapter({
  tableName: tableName,
  partitionKeyGenerator: PartitionKeyGenerators.userId,
  dynamoDBClient: new DynamoDB({ apiVersion: "latest", region: "us-east-1" })
});

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadAllIntentHandler,
    ReadOneIntentHandler
  )
  .addRequestInterceptors(PersistentAttributesRequestInterceptor)
  .addResponseInterceptors(PersistentAttributesResponseInterceptor)
  .withPersistenceAdapter(dynamoAdapter)
  .addErrorHandlers(ErrorHandler)
  .lambda();
