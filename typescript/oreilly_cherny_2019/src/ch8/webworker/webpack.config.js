const path = require("path");

const config = {
    mode: "development",
    entry: { main: "./index.ts" },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    target: "web",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "bundle"),
        libraryTarget: "umd",
    },
};

const wsConfig = {
    mode: "development",
    entry: { worker: "./worker/worker.ts" },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    target: "webworker",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "bundle"),
        libraryTarget: "umd",
    },
};

module.exports = [config, wsConfig];
