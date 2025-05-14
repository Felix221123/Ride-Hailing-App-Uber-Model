import { ChildEntity, Column }  from "typeorm"
import { User } from "./User.js"

@ChildEntity()
// drivers class inherits from the User class
export class Driver extends User {

    // drivers availability
    @Column()
    isAvailable: boolean;

    // drivers location 
    @Column()
    location: string;

    // drivers total earnings
    @Column("float", { default: 0 })
    totalEarnings: number;

    // drivers ride history
    @Column("json", { nullable : true })
    rideHistory: { rideId: string, date:string , price: number }[];
}