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
exports.CancelReason = void 0;
const typeorm_1 = require("typeorm");
const customerCancellation_entity_1 = require("./customerCancellation.entity");
let CancelReason = class CancelReason {
    constructor() {
        this.updatedAt = new Date();
    }
};
exports.CancelReason = CancelReason;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CancelReason.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cancel_reason" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], CancelReason.prototype, "cancelReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], CancelReason.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], CancelReason.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customerCancellation_entity_1.CustomerCancellation, (cc) => cc.cancelReason),
    __metadata("design:type", Array)
], CancelReason.prototype, "cancellationReason", void 0);
exports.CancelReason = CancelReason = __decorate([
    (0, typeorm_1.Entity)("cancel_reason")
], CancelReason);
