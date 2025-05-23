import { ChildEntity, Column }  from "typeorm"
import { User } from "./User.js"



@ChildEntity()
// Customer class inherits from the User class
export class Customer extends User {

    // customers payment method
    @Column()
    paymentMethod: string

    // customers ride history
    @Column("json", { nullable : true })
    rideHistory: { rideId: string, date:string , price: number }[]


} 