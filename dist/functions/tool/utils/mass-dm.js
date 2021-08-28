"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createString_1 = require("../../utils/createString");
const getTheme_1 = require("../../utils/getTheme");
const main_1 = __importDefault(require("../main"));
function massDM(client, rl, serverId, message) {
    let server = client.guilds.cache.get(serverId);
    let c = 0;
    let mainColor = getTheme_1.getTheme();
    server.members.cache.map((m) => {
        m.send(message)
            .then(() => {
            c++;
            console.log(createString_1.createString(`Sent DM to ${mainColor(m.id)}`, "semi"));
        })
            .catch(() => {
            c++;
            console.log(createString_1.createString(`Failed to send DM to ${mainColor(m.id)}`, "semi", "fail"));
        });
    });
    let inter = setInterval(() => {
        if (c + 1 === server.members.cache.length - 1) {
            clearInterval(inter);
            setTimeout(() => {
                main_1.default(client, rl);
            }, 2000);
        }
    });
}
exports.default = massDM;
