"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const main_1 = __importDefault(require("../main"));
function createLogger(client, rl) {
    console.clear();
    logo_1.logo();
    console.log(createString_1.createString("coming soon", "semi"));
    setTimeout(() => {
        main_1.default(client, rl);
    }, 1000);
}
exports.default = createLogger;
