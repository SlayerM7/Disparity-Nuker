"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../database/db"));
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const main_1 = __importDefault(require("./main"));
function editTemplate(client, rl) {
    console.clear();
    logo_1.logo();
    rl.question(createString_1.createString("What would you like to edit"), (type) => {
        type = type.toLowerCase().trim();
        if (type === "menu") {
            main_1.default(client, rl);
            return;
        }
        if (![
            "webhook name",
            "webhook message",
            "channel name",
            "channel amount",
            "role name",
            "role amount",
        ].includes(type)) {
            console.log("");
            console.log(createString_1.createString("Invalid option!", "semi", "fail"));
            setTimeout(() => {
                editTemplate(client, rl);
            }, 1500);
            return;
        }
        let typeSplit = type.split(/ +/g);
        typeSplit[1] = `${typeSplit[1][0].toUpperCase()}${typeSplit[1].slice(1)}`;
        let refactorName = `${typeSplit[0]}${typeSplit[1]}`;
        rl.question(createString_1.createString("Enter new value"), (value) => {
            if (value === "menu") {
                main_1.default(client, rl);
                return;
            }
            if (type.endsWith("amount") && !Number(value)) {
                console.log("");
                console.log(createString_1.createString("Needs to be a number!", "semi", "fail"));
                setTimeout(() => {
                    editTemplate(client, rl);
                }, 1500);
                return;
            }
            else if (type.endsWith("amount") && Number(value)) {
                value = Number(value);
            }
            db_1.default.set(`template-${db_1.default.get("username")}.${refactorName}`, value);
            db_1.default.save();
            main_1.default(client, rl);
        });
    });
}
exports.default = editTemplate;
