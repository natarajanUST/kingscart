import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerCancellation } from "./customerCancellation.entity";

@Entity("cancel_reason")
export class CancelReason {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({name: "cancel_reason"})
    @Index()
    cancelReason!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })  
    updatedAt: Date = new Date();

    @OneToMany(() => CustomerCancellation, (cc) => cc.cancelReason)
    cancellationReason!: CustomerCancellation[];
}   