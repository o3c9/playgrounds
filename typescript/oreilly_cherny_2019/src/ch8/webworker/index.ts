import {
    Commands,
    Events,
    Message,
    Participants,
    SafeEmitter,
    ThreadID,
    UserID,
} from "./event";

const eventEmitter = new SafeEmitter<Events>();
const commandEmitter = new SafeEmitter<Commands>();

const newWorkerViaBlob = (relativePath: string) => {
    const baseURL = window.location.href
        .replace(/\\/g, "/")
        .replace(/\/[^\/]*$/, "/");
    const array = ['importScripts("' + baseURL + relativePath + '");'];
    const blob = new Blob(array, { type: "text/javascript" });
    const url = window.URL.createObjectURL(blob);
    return new Worker(url);
};

const worker = newWorkerViaBlob("bundle/worker.js");
worker.onmessage = (e: MessageEvent) => {
    eventEmitter.emit(e.data.type, ...e.data.data);
};

commandEmitter.on("sendMessageToThread", (...data) =>
    worker.postMessage({
        data,
        type: "sendMessageToThread",
    })
);

commandEmitter.on("createThread", (...data) =>
    worker.postMessage({ data, type: "createThread" })
);

eventEmitter.on("createdThread", (t: ThreadID, ps: Participants) =>
    console.log(`created a new chat thread!`, t, ps)
);

eventEmitter.on("receivedMessage", (t: ThreadID, u: UserID, m: Message) =>
    console.log(`message received from ${u}!`, t, m)
);

commandEmitter.emit("createThread", [123, 456]);
commandEmitter.emit("sendMessageToThread", 789, "hello");
