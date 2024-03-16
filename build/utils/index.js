"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelResponse = void 0;
const modelResponse = (data, message, status) => {
    return {
        message,
        status,
        data: data.rows || []
    };
};
exports.modelResponse = modelResponse;
