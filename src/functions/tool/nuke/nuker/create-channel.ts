import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";
import nukeMenu from "../menu";
import spam from "./spam";

function createChannel(
  name,
  guildId,
  mainColor,
  spamChannel = false,
  server,
  client,
  rl
) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/channels`,
      method: "POST",
      headers: { Authorization: "Bot " + db.get("curtoken") },
      json: {
        reason: "Disaprity-nuker",
        name: name,
      },
    },
    async (err, res, body) => {
      if (typeof res !== "undefined")
        if (typeof res.body !== "undefined") {
          if (res.body.message === "Missing Permissions") {
            console.log(
              createString(`Failed to create channel`, "semi", "fail")
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            createChannel(
              name,
              guildId,
              mainColor,
              spamChannel,
              server,
              client,
              rl
            );
          } else {
            console.log(createString(`Created channel`, "semi"));
            // if (spamChannel === true) {
            //   spam(
            //     client,
            //     rl,
            //     [res.body.id],
            //     db.get("template")
            //       ? db.get("template").webhookName
            //       : "Disparity-Nuker",
            //     db.get("template")
            //       ? db.get("template").webhookMessage
            //       : "Disparity-Nuker",
            //     server
            //   );
            // }
          }
        }
    }
  );
}

export default function (
  client: Client,
  guildId,
  params = { amount: 10, name: "no-name-given" },
  rl,
  server,
  goBack = true,
  spamChannel = false
) {
  let oldChannelSize = server.channels.cache.size;
  let mainColor = getTheme();

  for (let i = 0; i < params.amount; i++) {
    createChannel(
      params.name,
      guildId,
      mainColor,
      spamChannel,
      server,
      client,
      rl
    );
    if (goBack === true) {
      let checkChannels = setInterval(() => {
        if (server.channels.cache.size === oldChannelSize + params.amount) {
          clearInterval(checkChannels);
          if (spamChannel === true) {
            server = client.guilds.cache.get(guildId);
            spam(
              client,
              rl,
              [server.channels.cache.map((c) => c.id)],
              db.get(`template-${db.get("username")}`)
                ? db.get(`template-${db.get("username")}`).webhookName
                : "Disparity-Nuker",
              db.get(`template-${db.get("username")}`)
                ? db.get(`template-${db.get("username")}`).webhookMessage
                : "Disparity-Nuker",
              server
            );
          } else {
            nukeMenu(client, rl);
          }
        }
      }, 1000);
    }
  }
}
