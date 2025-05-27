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
    },
    {
        method: "post",
        route: "/customer/request-ride",
        controller: CustomerController,
        action: "requestRide"
    },
    {
        method: "get",
        route: "/driver/pending-rides",
        controller: DriverController,
        action: "all_pending_requests"
    },
    {
        method: "post",
        route: "/driver/accept-ride",
        controller: DriverController,
        action: "acceptRide"
    },
    {
        method: "post",
        route: "/driver/start-ride",
        controller: DriverController,
        action: "startRide"
    },
    {
        method: "post",
        route: "/driver/complete-ride",
        controller: DriverController,
        action: "completeRide"
    }

]