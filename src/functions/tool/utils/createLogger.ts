import fs from "fs";
import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import mainMenu from "../main";

export default function createLogger(client, rl) {
  console.clear();
  logo();
  console.log(createString("coming soon", "semi"));

  setTimeout(() => {
    mainMenu(client, rl);
  }, 1000);
}
