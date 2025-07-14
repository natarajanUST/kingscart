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
exports.CustomerCancellation = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const cancelReason_entity_1 = require("./cancelReason.entity");
let CustomerCancellation = class CustomerCancellation {
};
exports.CustomerCancellation = CustomerCancellation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CustomerCancellation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "order_id" }),
    __metadata("design:type", String)
], CustomerCancellation.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "cancel_id" }),
    __metadata("design:type", String)
], CustomerCancellation.prototype, "cancelId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], CustomerCancellation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.OrderManagement, (om) => om.cancellation, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "order_id", referencedColumnName: "id" }),
    __metadata("design:type", order_entity_1.OrderManagement)
], CustomerCancellation.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cancelReason_entity_1.CancelReason, cr => cr.cancellationReason, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "cancel_id", referencedColumnName: "id" }),
    __metadata("design:type", cancelReason_entity_1.CancelReason)
], CustomerCancellation.prototype, "cancelReason", void 0);
exports.CustomerCancellation = CustomerCancellation = __decorate([
    (0, typeorm_1.Entity)("customer_cancellation")
], CustomerCancellation);
