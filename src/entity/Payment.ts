import { Entity , Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn,CreateDateColumn  }   from "typeorm"
import { User } from "./User.js"
import { Ride } from "./Ride.js"



@Entity()

export class Payment {

    // paymentId
    @PrimaryGeneratedColumn("uuid")
    id!: string

    // referencing the user who made the payment
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "customerId" })
    customer!: User

    // referencing the ride
    @ManyToOne(() => Ride, { nullable: false })
    @JoinColumn({ name: "rideId" })
    ride!: Ride

    // amount paid
    @Column("float")
    amount!: number

    // payment method
    @Column()
    paymentMethod!: string

    // refund status
    @Column()
    refundStatus!: string

    // payment date
    @CreateDateColumn()
    paymentDate!: Date

}





