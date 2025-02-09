import { Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn  }  from "typeorm"
import { Driver } from "./Driver.ts"

@Entity()

// vehicle class
export class Vehicle {
    
    // vehicle id
    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference to driver class as a foreign key
    @ManyToOne(() => Driver , { nullable: false })
    @JoinColumn({ name: "driverId" })
    driver!: Driver;

    // vehicle model
    @Column()
    vehicleModel: string

    // vehicle license plate
    @Column()
    licensePlate: string

    // vehicle color
    @Column()
    color: string
}












