"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const refuse_1 = require("./refuse");
var DesignType;
(function (DesignType) {
    DesignType["HOME"] = "1";
    DesignType["ACTIVITY"] = "2";
    DesignType["PREFECTURE"] = "3";
    DesignType["OTHER"] = "4";
})(DesignType = exports.DesignType || (exports.DesignType = {}));
var DesignStatus;
(function (DesignStatus) {
    DesignStatus["INIT"] = "0";
    DesignStatus["TIMER"] = "1";
    DesignStatus["TIMING"] = "2";
    DesignStatus["PUBLISH"] = "3";
})(DesignStatus = exports.DesignStatus || (exports.DesignStatus = {}));
let Design = class Design {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Design.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Design.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Design.prototype, "data", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: DesignType,
        default: DesignType.HOME,
    }),
    __metadata("design:type", String)
], Design.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: DesignStatus,
        default: DesignStatus.INIT,
    }),
    __metadata("design:type", String)
], Design.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Design.prototype, "poster", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", String)
], Design.prototype, "timer", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", String)
], Design.prototype, "reservation", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Design.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Design.prototype, "updateAt", void 0);
__decorate([
    typeorm_1.Column({
        default: 1,
    }),
    __metadata("design:type", Number)
], Design.prototype, "shopId", void 0);
__decorate([
    typeorm_1.OneToMany(type => refuse_1.Refuse, refuse => refuse.design),
    __metadata("design:type", Array)
], Design.prototype, "refuses", void 0);
Design = __decorate([
    typeorm_1.Entity('component')
], Design);
exports.Design = Design;
//# sourceMappingURL=design.js.map