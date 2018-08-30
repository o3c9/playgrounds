import { VirtualAlexa } from "virtual-alexa";

import { handler } from "./index";

describe("helloworld skill", () => {
  let alexa: VirtualAlexa;

  beforeEach(() => {
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
});
