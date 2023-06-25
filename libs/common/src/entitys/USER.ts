import { PrimaryGeneratedColumn,Column,Entity } from "typeorm";

@Entity()
export class USER{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,length:25})
    username:string

    @Column()
    password:string

    @Column({unique:true})
    email:string

    @Column()
    createdat:Date
}