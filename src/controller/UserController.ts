import { AppDataSource } from "../data-source.ts"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User.ts"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find()
    }

    // async one(request: Request, _response: Response, _next: NextFunction) {
    //     const id = parseInt(request.params.id)


    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

    // async save(request: Request, _response: Response, _next: NextFunction) {
    //     const { firstName, lastName, age } = request.body;

    //     const user = Object.assign(new User(), {
    //         firstName,
    //         lastName,
    //         age
    //     })

    //     return this.userRepository.save(user)
    // }

    // async remove(request: Request, _response: Response, _next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     const userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}