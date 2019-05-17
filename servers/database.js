"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const design_1 = require("./models/design");
const refuse_1 = require("./models/refuse");
const auth_1 = require("./models/auth");
const config_1 = require("../config");
const connectionOpts = Object.assign({ type: 'mysql', entityPrefix: 'design_' }, config_1.mysql, { synchronize: true, entities: [design_1.Design, refuse_1.Refuse, auth_1.Auth] });
const connection = typeorm_1.createConnection(connectionOpts);
exports.default = connection;
//# sourceMappingURL=database.js.map