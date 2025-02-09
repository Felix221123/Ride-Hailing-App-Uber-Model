import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn } from "typeorm"

@Entity()
export abstract class User {

    // PrimaryGeneratedColumn for users id, using uuid to generate unique id
    @PrimaryGeneratedColumn("uuid")
    id!: string

    // users first name
    @Column()
    firstName: string

    // users last name
    @Column()
    lastName: string

    // users email
    @Column()
    emailAddress: string

    // users password
    @Column()
    password: string

    // user role
    @Column()
    role: string

    // created account date
    @CreateDateColumn()
    createdAt: Date

    // updated account date
    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date

    // users status
    @Column()
    status: string


}
