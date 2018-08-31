"use strict";

import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
  RequestInterceptor,
  ResponseInterceptor
} from "ask-sdk-core";

import {
  Response,
  IntentRequest,
  Slot,
  SessionEndedRequest
} from "ask-sdk-model";

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
    const req = handlerInput.requestEnvelope.request;
    return req.type === "IntentRequest" && req.intent.name === "ReadAllIntent";
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
    const req = handlerInput.requestEnvelope.request;
    return req.type === "IntentRequest" && req.intent.name === "ReadOneIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const req = handlerInput.requestEnvelope.request as IntentRequest;
    const idx = getIndex(req.intent.slots);
    let speechText;
    if (idx >= 0) {
      speechText = `${elements[idx].name.ja}だよ`;
    } else {
      let slots = req.intent.slots || {};
      let debug = [];
      for (let key in slots) {
        debug.push(`${key} => ${slots[key].value}`);
      }
      console.log(`slots: ${debug.join(", ")}`);
      speechText = `${idx}番目の元素は見つかりませんでした`;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("elements", speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const req = handlerInput.requestEnvelope.request as SessionEndedRequest;
    console.log(`Session ended with reason: ${req.reason}`);

    return handlerInput.responseBuilder.getResponse();
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
    console.log(`ERROR: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("うぎゃ、エラーが発生しました。ログを確認してください")
      .reprompt("ごめんなさい、もう一度言い直してください")
      .withSimpleCard("ERROR", error.message)
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
    ReadOneIntentHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(PersistentAttributesRequestInterceptor)
  .addResponseInterceptors(PersistentAttributesResponseInterceptor)
  .withPersistenceAdapter(dynamoAdapter)
  .addErrorHandlers(ErrorHandler)
  .lambda();
