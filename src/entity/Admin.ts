import { Entity , Column} from "typeorm"
import { User } from "./User.ts"

@Entity()
// admin class inherits from the User class
export class Admin extends User{

    // column for admin permissions 
    @Column({ default: "[]" })
    permissions!: string
}