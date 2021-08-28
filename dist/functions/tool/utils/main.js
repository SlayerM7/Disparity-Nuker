"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const main_1 = __importDefault(require("../main"));
const grantRole_1 = __importDefault(require("./grantRole"));
const mass_dm_1 = __importDefault(require("./mass-dm"));
function utilsMenu(client, rl) {
    console.clear();
    logo_1.utilsLogo();
    rl.question(createString_1.createString("Enter option"), (option) => {
        option = option.toLowerCase().trim();
        if (!["1", "2", "3", "4"].includes(option)) {
            console.log(createString_1.createString("Unknown option", "semi", "fail"));
            setTimeout(() => {
                utilsMenu(client, rl);
            }, 1000);
            return;
        }
        if (option === "menu") {
            main_1.default(client, rl);
            return;
        }
        rl.question(createString_1.createString("Enter guild ID"), (guildId) => {
            if (!client.guilds.cache.has(guildId)) {
                console.log(createString_1.createString("Unknown server", "semi", "fail"));
                setTimeout(() => {
                    utilsMenu(client, rl);
                }, 1000);
                return;
            }
            let server = client.guilds.cache.get(guildId);
            if (option === "1") {
                rl.question(createString_1.createString("Enter message"), (msg) => {
                    mass_dm_1.default(client, rl, guildId, msg);
                });
            }
            if (option === "2") {
                grantRole_1.default(client, rl, server);
            }
        });
    });
}
exports.default = utilsMenu;
