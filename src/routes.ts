import { CustomerController } from "./controller/CustomerController.js"
import { AuthController } from "./controller/AuthController.js"
import { DriverController } from "./controller/DriverController.js"
import { AdminController } from "./controller/AdminController.js"
import { VehicleController } from "./controller/VehicleController.js"

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
        route: "/customers",
        controller: CustomerController,
        action: "all_customers"
    },
    {
        method: "get",
        route: "/drivers",
        controller: DriverController,
        action: "all_drivers"
    },
    {
        method: "get",
        route: "/admins",
        controller: AdminController,
        action: "all_admins"
    },
    {
        method: "post",
        route: "/login",
        controller: AuthController,
        action: "login"
    },
    {
        method: "post",
        route: "/vehicle/registerOrUpdate",
        controller: VehicleController,
        action: "registerOrUpdateVehicle"
    },
    {
        method: "get",
        route: "/vehicle/:driverId",
        controller: VehicleController,
        action: "getVehicleByDriver"
    }

]