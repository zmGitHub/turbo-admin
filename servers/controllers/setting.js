"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../services/auth");
class Setting {
    static async getComponentAuth(ctx) {
        const res = await auth_1.getAuth();
        ctx.status = 200;
        ctx.body = res;
    }
    static async updateComponentAuth(ctx) {
        const { body } = ctx.request;
        const res = await auth_1.updateAuth(body);
        ctx.status = 200;
        ctx.body = res;
    }
}
exports.default = Setting;
//# sourceMappingURL=setting.js.map