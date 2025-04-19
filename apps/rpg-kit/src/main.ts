import "./style.css";
import { getCommonText } from "@base-canvas-rpg/common";

console.log(getCommonText());

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div>test</div>
  </div>
`;
