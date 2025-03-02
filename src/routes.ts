import { CustomerController } from "./controller/CustomerController.ts"
import { AuthController } from "./controller/AuthController.ts"


// list of all routes
export const Routes = [
    {
        method: "post",
        route: "/register",
        controller: AuthController,
        action: "register"
    },
    {
        method: "get",
        route: "/customer",
        controller: CustomerController,
        action: "all"
    }
]