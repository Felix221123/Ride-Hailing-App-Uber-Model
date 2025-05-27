import { Entity , Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn,CreateDateColumn }  from "typeorm"
import { User } from "./User.js"
import { Driver } from "./Driver.js"


@Entity()

// ride class
export class Ride {

    // primary generated column for ride id
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // foreign key for customer id
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "customerId" })
    customer: User;

    // foreign key for driver id
    @ManyToOne(() => Driver, { nullable: true })
    @JoinColumn({ name: "driverId" })
    driver!: Driver;

    @Column()
    pickupLocation!: string;

    @Column()
    destination!: string;

    @Column()
    status!: string;

    @Column("float")
    fare!: number;

    @Column("float")
    distance!: number;

    @Column()
    estimatedTime!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    completedAt?: Date;

    @Column("float", { default: 1.0 })
    surgeMultiplier!: number;
}



