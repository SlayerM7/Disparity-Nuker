"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const changeTheme_1 = __importDefault(require("./changeTheme"));
const credits_1 = __importDefault(require("./credits/credits"));
const editTemplate_1 = __importDefault(require("./editTemplate"));
const faq_1 = __importDefault(require("./faq"));
const menu_1 = __importDefault(require("./nuke/menu"));
const menu_2 = __importDefault(require("./tokens/menu"));
const main_1 = __importDefault(require("./utils/main"));
function mainMenu(client, rl) {
    console.clear();
    logo_1.mainMenuLogo();
    rl.question(createString_1.createString("Enter option"), (option) => {
        let comingSoonOptions = ["x", "m"];
        if (option === "1") {
            menu_1.default(client, rl);
        }
        else if (option === "2") {
            menu_2.default(rl, client);
        }
        else if (option === "3") {
            faq_1.default(client, rl);
        }
        else if (option === "x") {
            changeTheme_1.default(client, rl);
        }
        else if (option === "n") {
            editTemplate_1.default(client, rl);
        }
        else if (option === "z") {
            credits_1.default(client, rl);
        }
        else if (option === "c") {
            console.clear();
            logo_1.logo();
            process.exit();
        }
        else if (option === "v") {
            main_1.default(client, rl);
        }
        else if (comingSoonOptions.includes(option)) {
            console.log("");
            console.log(createString_1.createString("COMING SOON!", "semi", "fail"));
            setTimeout(() => {
                mainMenu(client, rl);
            }, 1500);
            return;
        }
        else {
            mainMenu(client, rl);
        }
    });
}
exports.default = mainMenu;
