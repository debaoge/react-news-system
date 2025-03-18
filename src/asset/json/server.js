const jsonServer = require("json-server");
const path = require("path"); // 引入 path 模块
const server = jsonServer.create();

// 使用相对路径
const dbPath = path.join(__dirname, "db.json"); // 构建 db.json 的相对路径
const router = jsonServer.router(dbPath);

const middlewares = jsonServer.defaults();

// 让 id 变成 number
router.render = (req, res) => {
    const data = res.locals.data;
    if (Array.isArray(data)) {
        data.forEach((item) => {
            if (item.id) item.id = Number(item.id);
        });
    } else if (data.id) {
        data.id = Number(data.id);
    }
    res.jsonp(data);
};

server.use(middlewares);
server.use(router);
server.listen(8000, () => {
    console.log("JSON Server is running");
});