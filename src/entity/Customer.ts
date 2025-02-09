import { Entity, Column }  from "typeorm"
import { User } from "./User.ts"



@Entity()

// Customer class inherits from the User class
export class Customer extends User {

    // customers payment method
    @Column()
    paymentMethod: string

    // customers ride history
    @Column("json", { nullable : true })
    rideHistory: { rideId: string, date:string , price: number }[]


} 