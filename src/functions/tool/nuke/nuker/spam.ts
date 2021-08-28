import { Guild, TextChannel } from "discord.js";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";

export default function spam(
  client,
  rl,
  channels,
  webhookName,
  webhookMessage,
  server: Guild
) {
  channels.map((channelId) => {
    let mainColor = getTheme();
    let channel = <TextChannel>server.channels.cache.get(channelId);

    if (!channel) return;

    for (let i = 0; i < 3; i++)
      channel
        .createWebhook(webhookName, {
          reason: "Disparity-nuker",
        })
        .then((webhook) => {
          console.log(
            createString(`Created webhook ${mainColor(webhook.id)}`, "semi")
          );
          for (let i = 0; i < 40; i++) {
            webhook
              .send("@everyone " + webhookMessage)
              .then((msgSent) => {
                console.log(
                  createString(
                    `Sent webhook message ${mainColor(msgSent.id)}`,
                    "semi"
                  )
                );
              })
              .catch(() => {
                console.log(
                  createString(`Failed to send webhook message`, "semi", "fail")
                );
              });
          }
        })
        .catch(() => {
          console.log(createString(`Failed to create webhook`, "semi", "fail"));
        });
  });
}
