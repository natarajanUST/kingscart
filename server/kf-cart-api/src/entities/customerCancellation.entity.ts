import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderManagement } from "./order.entity";
import { CancelReason } from "./cancelReason.entity";

@Entity("customer_cancellation")
export class CustomerCancellation { 

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type:"uuid", name:"order_id"})
    orderId!: string;

    @Column({type:"uuid", name:"cancel_id"})
    cancelId!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" }) 
    createdAt!: Date;
 
    @OneToOne(() => OrderManagement, (om) => om.cancellation, { onDelete: "CASCADE" })
    @JoinColumn({ name: "order_id", referencedColumnName: "id" })
    order?: OrderManagement;

    @ManyToOne(() => CancelReason, cr => cr.cancellationReason, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "cancel_id", referencedColumnName: "id" })
    cancelReason!: CancelReason;
}
