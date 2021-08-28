import db from "../../database/db";
import { logo } from "../../prints/logo";
import { createString } from "../utils/createString";
import mainMenu from "./main";

export default function editTemplate(client, rl) {
  console.clear();
  logo();

  rl.question(createString("What would you like to edit"), (type) => {
    type = type.toLowerCase().trim();

    if (type === "menu") {
      mainMenu(client, rl);
      return;
    }

    if (
      ![
        "webhook name",
        "webhook message",
        "channel name",
        "channel amount",
        "role name",
        "role amount",
      ].includes(type)
    ) {
      console.log("");
      console.log(createString("Invalid option!", "semi", "fail"));
      setTimeout(() => {
        editTemplate(client, rl);
      }, 1500);
      return;
    }

    let typeSplit = type.split(/ +/g);
    typeSplit[1] = `${typeSplit[1][0].toUpperCase()}${typeSplit[1].slice(1)}`;
    let refactorName = `${typeSplit[0]}${typeSplit[1]}`;

    rl.question(createString("Enter new value"), (value) => {
      if (value === "menu") {
        mainMenu(client, rl);
        return;
      }

      if (type.endsWith("amount") && !Number(value)) {
        console.log("");
        console.log(createString("Needs to be a number!", "semi", "fail"));
        setTimeout(() => {
          editTemplate(client, rl);
        }, 1500);
        return;
      } else if (type.endsWith("amount") && Number(value)) {
        value = Number(value);
      }

      db.set(`template-${db.get("username")}.${refactorName}`, value);
      db.save();
      mainMenu(client, rl);
    });
  });
}
