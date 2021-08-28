import { createString } from "../../utils/createString";
import { getTheme } from "../../utils/getTheme";
import mainMenu from "../main";

export default function massDM(client, rl, serverId, message) {
  let server = client.guilds.cache.get(serverId);

  let c = 0;
  let mainColor = getTheme();

  server.members.cache.map((m) => {
    m.send(message)
      .then(() => {
        c++;
        console.log(createString(`Sent DM to ${mainColor(m.id)}`, "semi"));
      })
      .catch(() => {
        c++;
        console.log(
          createString(
            `Failed to send DM to ${mainColor(m.id)}`,
            "semi",
            "fail"
          )
        );
      });
  });

  let inter = setInterval(() => {
    if (c + 1 === server.members.cache.length - 1) {
      clearInterval(inter);
      setTimeout(() => {
        mainMenu(client, rl);
      }, 2000);
    }
  });
}
