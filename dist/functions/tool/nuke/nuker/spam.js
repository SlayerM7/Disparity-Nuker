"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createString_1 = require("../../../utils/createString");
const getTheme_1 = require("../../../utils/getTheme");
function spam(client, rl, channels, webhookName, webhookMessage, server) {
    channels.map((channelId) => {
        let mainColor = getTheme_1.getTheme();
        let channel = server.channels.cache.get(channelId);
        if (!channel)
            return;
        for (let i = 0; i < 3; i++)
            channel
                .createWebhook(webhookName, {
                reason: "Disparity-nuker",
            })
                .then((webhook) => {
                console.log(createString_1.createString(`Created webhook ${mainColor(webhook.id)}`, "semi"));
                for (let i = 0; i < 40; i++) {
                    webhook
                        .send("@everyone " + webhookMessage)
                        .then((msgSent) => {
                        console.log(createString_1.createString(`Sent webhook message ${mainColor(msgSent.id)}`, "semi"));
                    })
                        .catch(() => {
                        console.log(createString_1.createString(`Failed to send webhook message`, "semi", "fail"));
                    });
                }
            })
                .catch(() => {
                console.log(createString_1.createString(`Failed to create webhook`, "semi", "fail"));
            });
    });
}
exports.default = spam;
