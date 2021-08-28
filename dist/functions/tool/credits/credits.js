"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const sleep_1 = __importDefault(require("../../utils/sleep"));
const main_1 = __importDefault(require("../main"));
const creditText_1 = __importDefault(require("./creditText"));
function credits(client, rl) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = "";
        let text = creditText_1.default;
        for (let letter of text) {
            yield sleep_1.default(80);
            str += letter;
            console.clear();
            logo_1.logo();
            console.log(str);
        }
        let inter = setInterval(() => {
            if (str.length === text.length) {
                clearInterval(inter);
                setTimeout(() => {
                    console.log(" ");
                    console.log(" ");
                    rl.question(createString_1.createString("Type anything to continue"), () => {
                        main_1.default(client, rl);
                    });
                }, 1000);
            }
        }, 1000);
    });
}
exports.default = credits;
