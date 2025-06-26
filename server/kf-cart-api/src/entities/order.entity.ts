import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
} from "typeorm";
import { CustomerCancellation } from "./customerCancellation.entity";

@Entity("order_management")
export class OrderManagement {
  @PrimaryGeneratedColumn("uuid", { name: "order_id" })
  id!: string;

  @Column({ name: "cust_id" })
  @Index()
  custID!: string;

  @Column({ name: "product_id", type: "uuid" })
  @Index()
  productID!: string;

  @Column({ type: "varchar", length: 50 })
  status!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount: number =0;

  @Column({ name: "refund_status", type: "varchar", length: 50, nullable: true })
  refundStatus: string | null = null;

  @Column({ name: "refund_amount", type: "decimal", precision: 12, scale: 2, default: 0 })
  refundAmount: number = 0;

  @Column({
    name: "date_time",
    type: "timestamptz", // timestamp with time zone, stores UTC with timezone handling
  })
  dateTime!: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date = new Date();

  @OneToOne(() => CustomerCancellation, (cc) => cc.order, { cascade: ['remove', 'update'] })
  cancellation?: CustomerCancellation;
}
