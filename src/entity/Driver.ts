import { Entity , Column }  from "typeorm"
import { User } from "./User.ts"

@Entity()

// drivers class inherits from the User class
export class Driver extends User {

    // drivers vehicle details
    @Column("json" , { nullable : true })
    vehicleNumber: { vehicleId: string, vehicleModel: string, licensePlate: string, color : string };

    // drivers availability
    @Column()
    isAvailable: boolean;

    // drivers location 
    @Column()
    location: string;

    // drivers total earnings
    @Column("float", { default: 0 })
    totalEarnings: string[];

    // drivers ride history
    @Column("json", { nullable : true })
    rideHistory: { rideId: string, date:string , price: number }[];
}