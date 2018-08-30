"use strict";

import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders
} from "ask-sdk-core";

import { Response, SessionEndedRequest } from "ask-sdk-model";

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

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, HelloElementsIntentHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
