"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const auth_1 = require("../models/auth");
exports.updateAuth = async (params) => {
    const authRpo = typeorm_1.getRepository(auth_1.Auth);
    let res = null;
    if (params.id) {
        const { data } = params;
        res = await authRpo.update(params.id, { data });
    }
    else {
        res = await authRpo.save(params);
    }
    return res;
};
exports.getAuth = async () => {
    const authRpo = typeorm_1.getRepository(auth_1.Auth);
    return await authRpo.findOne();
};
//# sourceMappingURL=auth.js.map