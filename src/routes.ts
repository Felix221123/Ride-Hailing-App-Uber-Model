import { CustomerController } from "./controller/CustomerController.ts"

export const Routes = [
    {
        method: "get",
        route: "/customer",
        controller: CustomerController,
        action: "all"
    }
]