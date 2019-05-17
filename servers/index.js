"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const app_1 = require("./app");
const config_1 = require("../config");
database_1.default.then(() => {
    app_1.default.listen(config_1.port, () => {
        console.log(`服务端启动: ${config_1.port}`);
    });
}).catch((err) => {
    console.log(err);
    console.log('数据库连接失败');
});
//# sourceMappingURL=index.js.map