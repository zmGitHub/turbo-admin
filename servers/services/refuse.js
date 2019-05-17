"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const refuse_1 = require("../models/refuse");
exports.addRefuse = async (params) => {
    const refuseRpo = typeorm_1.getRepository(refuse_1.Refuse);
    return await refuseRpo.save(params);
};
// 根据装修 id
exports.getRefuse = async (params) => {
    const refuseRpo = typeorm_1.getRepository(refuse_1.Refuse);
    return await refuseRpo.findOne(params);
};
//# sourceMappingURL=refuse.js.map