onmessage = (e: MessageEvent) => {
    console.log(e.data);
    postMessage(`Ack: ${e.data}`);
};
