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
exports.OrderManagement = void 0;
const typeorm_1 = require("typeorm");
const customerCancellation_entity_1 = require("./customerCancellation.entity");
let OrderManagement = class OrderManagement {
    constructor() {
        this.amount = 0;
        this.refundStatus = null;
        this.refundAmount = 0;
        this.updatedAt = new Date();
    }
};
exports.OrderManagement = OrderManagement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "order_id" }),
    __metadata("design:type", String)
], OrderManagement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cust_id" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrderManagement.prototype, "custID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id", type: "uuid" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrderManagement.prototype, "productID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], OrderManagement.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], OrderManagement.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "refund_status", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], OrderManagement.prototype, "refundStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "refund_amount", type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderManagement.prototype, "refundAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "date_time",
        type: "timestamptz", // timestamp with time zone, stores UTC with timezone handling
    }),
    __metadata("design:type", Date)
], OrderManagement.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], OrderManagement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], OrderManagement.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => customerCancellation_entity_1.CustomerCancellation, (cc) => cc.order, { cascade: ['remove', 'update'] }),
    __metadata("design:type", customerCancellation_entity_1.CustomerCancellation)
], OrderManagement.prototype, "cancellation", void 0);
exports.OrderManagement = OrderManagement = __decorate([
    (0, typeorm_1.Entity)("order_management")
], OrderManagement);
