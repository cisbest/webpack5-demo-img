let express = require("express");
let path = require("path"); // path模块包含在express
let connectHistoryApiFallback = require("connect-history-api-fallback");

const app = express();
app.use("/", connectHistoryApiFallback()); // 通过js控制路由
app.use("/", express.static(path.join(__dirname, "./", "static"))); // 要访问的文件目录

// 用于模拟测试 api
app.get("/api/get", (req, res) => res.send("响应返回的数据"));
app.post("/api/post", (req, res) => res.send("响应返回的数据"));

const server = app.listen(9000, "localhost", () => {
    console.log("服务器的端口为:9000...");
});
