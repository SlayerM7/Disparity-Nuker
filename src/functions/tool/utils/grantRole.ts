import { Guild } from "discord.js";
import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import mainMenu from "../main";
import utilsMenu from "./main";

export default function grantRole(client, rl, server: Guild) {
  console.clear();
  logo();
  rl.question(createString("Enter user to add to"), (userId) => {
    if (userId === "menu") return mainMenu(client, rl);

    if (!server.members.cache.has(userId)) {
      console.log(createString("Invalid user", "semi", "fail"));
      setTimeout(() => {
        utilsMenu(client, rl);
      }, 1000);
      return;
    }

    let member = server.members.cache.get(userId);
    let bot = server.me;
    let highestRole = bot.roles.highest;

    if (!bot.hasPermission(["MANAGE_ROLES"])) {
      console.log(createString("Invalid perms", "semi", "fail"));
      setTimeout(() => {
        utilsMenu(client, rl);
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
            utilsMenu(client, rl);
          })
          .catch(() => {
            utilsMenu(client, rl);
          });
      });
  });
}
