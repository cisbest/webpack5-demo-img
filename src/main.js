import "./main.css";

// 在js中使用图片
import mayi from "./assets/mayi.jpeg";
let MAYI = new Image();
MAYI.src = mayi;
document.getElementById("js-img").appendChild(MAYI);
