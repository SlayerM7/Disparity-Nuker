import { logo, utilsLogo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import mainMenu from "../main";
import grantRole from "./grantRole";
import massDM from "./mass-dm";

export default function utilsMenu(client, rl) {
  console.clear();
  utilsLogo();

  rl.question(createString("Enter option"), (option) => {
    option = option.toLowerCase().trim();

    if (!["1", "2", "3", "4"].includes(option)) {
      console.log(createString("Unknown option", "semi", "fail"));
      setTimeout(() => {
        utilsMenu(client, rl);
      }, 1000);
      return;
    }

    if (option === "menu") {
      mainMenu(client, rl);
      return;
    }

    rl.question(createString("Enter guild ID"), (guildId) => {
      if (!client.guilds.cache.has(guildId)) {
        console.log(createString("Unknown server", "semi", "fail"));
        setTimeout(() => {
          utilsMenu(client, rl);
        }, 1000);
        return;
      }

      let server = client.guilds.cache.get(guildId);

      if (option === "1") {
        rl.question(createString("Enter message"), (msg) => {
          massDM(client, rl, guildId, msg);
        });
      }
      if (option === "2") {
        grantRole(client, rl, server);
      }
    });
  });
}
