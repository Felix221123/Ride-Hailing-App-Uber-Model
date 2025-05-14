import { ChildEntity , Column} from "typeorm"
import { User } from "./User.js"

@ChildEntity()
// admin class inherits from the User class
export class Admin extends User{

    // column for admin permissions 
    @Column("text", { array: true, default: () => "'{}'" })
    permissions: string[];

}