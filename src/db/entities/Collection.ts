import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import {User} from "./User";

@Entity()
export class Collection extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "varchar", default: "My Collection"})
	name: string;

	@Column({type: "boolean", default: true})
	public: boolean;

	@ManyToOne(type => User, user => user.collections)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
