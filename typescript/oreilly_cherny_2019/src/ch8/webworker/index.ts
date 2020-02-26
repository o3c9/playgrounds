import {
    Commands,
    Events,
    Message,
    Participants,
    SafeEmitter,
    ThreadID,
    UserID,
} from "./event";

import { newWorkerViaBlob } from "./common/worker";

const eventEmitter = new SafeEmitter<Events>();
const commandEmitter = new SafeEmitter<Commands>();

const worker = newWorkerViaBlob("bundle/worker.js");
worker.onmessage = (e: MessageEvent) => {
    eventEmitter.emit(e.data.type, ...e.data.data);
};

commandEmitter
    .on("createThread", (...data) =>
        worker.postMessage({ data, type: "createThread" })
    )
    .on("sendMessageToThread", (...data) =>
        worker.postMessage({ data, type: "sendMessageToThread" })
    );

eventEmitter
    .on("createdThread", (t: ThreadID, ps: Participants) =>
        console.log(`created a new chat thread!`, t, ps)
    )
    .on("receivedMessage", (t: ThreadID, u: UserID, m: Message) =>
        console.log(`message received from ${u}!`, t, m)
    );

commandEmitter.emit("createThread", [123, 456]);
commandEmitter.emit("sendMessageToThread", 951, "hello");
