import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";
import mainMenu from "../../main";
import { logo } from "../../../../prints/logo";

function deleteRole(m, guildId, mainColor, i, length, client, goback, rl) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/roles/${m}`,
      method: "DELETE",
      headers: { Authorization: "Bot " + db.get("curtoken") },
      json: {
        reason: "External-nuker",
      },
    },
    async (err, res, body) => {
      if (typeof res !== "undefined")
        if (typeof res.body !== "undefined") {
          if (res.body.message === "Missing Permissions") {
            console.log(
              createString(
                `Failed to delete role ${mainColor(m)}`,
                "semi",
                "fail"
              )
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            deleteRole(m, guildId, mainColor, i, length, client, goback, rl);
          } else {
            console.log(createString(`Deleted role ${mainColor(m)}`, "semi"));
          }
        } else {
          console.log(createString(`Deleted role ${mainColor(m)}`, "semi"));
        }
      // console.log(i, length);
      if (i + 1 == length && goback) {
        console.clear();
        logo();
        console.log(createString("Cleaning out console ... ", "semi"));
        await sleep(1500);
        for (let i = 0; i < 10; i++) {
          await sleep(130);
          mainMenu(client, rl);
        }
      }
    }
  );
}

export default function (client: Client, rl, roles, guildId, goback = true) {
  let mainColor = getTheme();
  roles.map((m, i) => {
    deleteRole(m, guildId, mainColor, i, roles.length, client, goback, rl);
  });
}
