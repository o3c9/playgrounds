export const title = (msg: string, ...msgs: string[]) => {
    const body = [msg, ...msgs].join(" ");
    console.log(`================ ${body} ================`);
};
