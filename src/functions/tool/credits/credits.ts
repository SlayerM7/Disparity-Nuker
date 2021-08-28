import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import sleep from "../../utils/sleep";
import mainMenu from "../main";
import creditText from "./creditText";

export default async function credits(client, rl) {
  let str = "";
  let text = creditText;

  for (let letter of text) {
    await sleep(80);
    str += letter;
    console.clear();
    logo();
    console.log(str);
  }

  let inter = setInterval(() => {
    if (str.length === text.length) {
      clearInterval(inter);
      setTimeout(() => {
        console.log(" ");
        console.log(" ");
        rl.question(createString("Type anything to continue"), () => {
          mainMenu(client, rl);
        });
      }, 1000);
    }
  }, 1000);
}
