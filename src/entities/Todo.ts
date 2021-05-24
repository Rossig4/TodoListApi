import { 
    Entity, Column, 
    PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from "typeorm";

import { Users } from "./User"

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    done: boolean;

    @ManyToOne(() => Users, user => user.todos, { onDelete: "CASCADE"})
    user: Users;
}
