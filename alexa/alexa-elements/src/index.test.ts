import { VirtualAlexa, SkillResponse, DynamoDB } from "virtual-alexa";

import { handler } from "./index";

describe("Elements", () => {
  let alexa: VirtualAlexa;
  let mockDynamo: DynamoDB;

  beforeEach(() => {
    mockDynamo = new DynamoDB();
    mockDynamo.mock();
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("./models/ja-JP.json")
      .create();
  });

  it("LanuchRequest", async () => {
    const speechText = "Alexaで学ぼう、元素記号";
    const payload = await alexa.launch();
    expect(payload.response.outputSpeech.ssml).toContain(speechText);
    expect(payload.response.shouldEndSession).toBeFalsy();
  });

  it("ReadOneIntent", async () => {
    const payload1 = (await alexa.utter("1 番目の元素")) as SkillResponse;
    expect(payload1.response.outputSpeech.ssml).toContain("1番目の元素は水素");
    expect(payload1.response.shouldEndSession).toBeFalsy();

    const payload2 = (await alexa.utter("2 番目の元素")) as SkillResponse;
    expect(payload2.response.outputSpeech.ssml).toContain(
      "2番目の元素はヘリウム"
    );
    expect(payload2.response.shouldEndSession).toBeFalsy();
  });

  it("ReadAllIntent", async () => {
    const payload1 = (await alexa.utter("読み上げて")) as SkillResponse;
    expect(payload1.response.outputSpeech.ssml).toContain(
      "水素, ヘリウム, リチウム, ベリリウム"
    );
    expect(payload1.response.shouldEndSession).toBeTruthy();
  });

  it("StopIntent", async () => {
    const payload1 = (await alexa.utter("ストップ")) as SkillResponse;
    expect(payload1.response.shouldEndSession).toBeTruthy();
  });

  it("CancelIntent", async () => {
    const payload1 = (await alexa.utter("キャンセルして")) as SkillResponse;
    expect(payload1.response.shouldEndSession).toBeTruthy();
  });
});
