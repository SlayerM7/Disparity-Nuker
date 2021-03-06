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
const db_1 = __importDefault(require("../../../../database/db"));
const request_1 = __importDefault(require("request"));
const createString_1 = require("../../../utils/createString");
const getTheme_1 = require("../../../utils/getTheme");
const sleep_1 = __importDefault(require("../../../utils/sleep"));
const main_1 = __importDefault(require("../../main"));
const logo_1 = require("../../../../prints/logo");
function deleteRole(m, guildId, mainColor, i, length, client, goback, rl) {
    request_1.default({
        url: `https://discord.com/api/v8/guilds/${guildId}/roles/${m}`,
        method: "DELETE",
        headers: { Authorization: "Bot " + db_1.default.get("curtoken") },
        json: {
            reason: "External-nuker",
        },
    }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
        if (typeof res !== "undefined")
            if (typeof res.body !== "undefined") {
                if (res.body.message === "Missing Permissions") {
                    console.log(createString_1.createString(`Failed to delete role ${mainColor(m)}`, "semi", "fail"));
                }
                else if (res.body.retry_after) {
                    console.log(createString_1.createString(`Rate limited`, "semi", "fail"));
                    yield sleep_1.default(res.body.retry_after * 1.05);
                    deleteRole(m, guildId, mainColor, i, length, client, goback, rl);
                }
                else {
                    console.log(createString_1.createString(`Deleted role ${mainColor(m)}`, "semi"));
                }
            }
            else {
                console.log(createString_1.createString(`Deleted role ${mainColor(m)}`, "semi"));
            }
        // console.log(i, length);
        if (i + 1 == length && goback) {
            console.clear();
            logo_1.logo();
            console.log(createString_1.createString("Cleaning out console ... ", "semi"));
            yield sleep_1.default(1500);
            for (let i = 0; i < 10; i++) {
                yield sleep_1.default(130);
                main_1.default(client, rl);
            }
        }
    }));
}
function default_1(client, rl, roles, guildId, goback = true) {
    let mainColor = getTheme_1.getTheme();
    roles.map((m, i) => {
        deleteRole(m, guildId, mainColor, i, roles.length, client, goback, rl);
    });
}
exports.default = default_1;
