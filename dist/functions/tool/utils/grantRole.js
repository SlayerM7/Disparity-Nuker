"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const main_1 = __importDefault(require("../main"));
const main_2 = __importDefault(require("./main"));
function grantRole(client, rl, server) {
    console.clear();
    logo_1.logo();
    rl.question(createString_1.createString("Enter user to add to"), (userId) => {
        if (userId === "menu")
            return main_1.default(client, rl);
        if (!server.members.cache.has(userId)) {
            console.log(createString_1.createString("Invalid user", "semi", "fail"));
            setTimeout(() => {
                main_2.default(client, rl);
            }, 1000);
            return;
        }
        let member = server.members.cache.get(userId);
        let bot = server.me;
        let highestRole = bot.roles.highest;
        if (!bot.hasPermission(["MANAGE_ROLES"])) {
            console.log(createString_1.createString("Invalid perms", "semi", "fail"));
            setTimeout(() => {
                main_2.default(client, rl);
            }, 1000);
            return;
        }
        server.roles
            .create({
            data: {
                name: "testRole",
                position: highestRole.position - 1,
            },
        })
            .then((r) => {
            member.roles
                .add(r.id)
                .then(() => {
                main_2.default(client, rl);
            })
                .catch(() => {
                main_2.default(client, rl);
            });
        });
    });
}
exports.default = grantRole;
