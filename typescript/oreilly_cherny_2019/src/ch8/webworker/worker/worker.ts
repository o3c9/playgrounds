import { Commands, Events, Message, SafeEmitter, UserID } from "../event";

const eventEmitter = new SafeEmitter<Events>();
const commandEmitter = new SafeEmitter<Commands>();

onmessage = (command: MessageEvent) => {
    commandEmitter.emit(command.data.type, ...command.data.data);
};

eventEmitter
    .on("receiveddMessage", (...data) => {
        postMessage({ data, type: "receivedMessage" });
    })
    .on("createdThread", (...data) => {
        postMessage({ data, type: "createdThread" });
    });

commandEmitter
    .on("sendMessageToThread", (...data) => {
        const [threadId, message] = data;
        console.log(
            `OK I will send a message to threadID: ${threadId} ${message}`
        );
        const adminId: UserID = 1;
        eventEmitter.emit("receiveddMessage", threadId, adminId, message);
    })
    .on("createThread", (...data) => {
        const [ps] = data;
        eventEmitter.emit("createdThread", 123, ps);
    });
