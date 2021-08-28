"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loggerCode() {
    return `
    const config = require('./config.json')
    const webhook = new WebhookClient(config.id, config.token)
    
    `;
}
exports.default = loggerCode;
