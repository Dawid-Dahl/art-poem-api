import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	BaseEntity,
	ManyToOne,
	Unique,
	JoinColumn,
	Column,
} from "typeorm";
import {ArtPoem} from "./ArtPoem";
import {User} from "./User";

@Entity()
@Unique(["artpoem", "user"])
export class Like extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: true})
	userId: string;

	@ManyToOne(type => ArtPoem, artpoem => artpoem.likes, {onDelete: "CASCADE"})
	artpoem: ArtPoem;

	@ManyToOne(type => User, user => user.likes)
	@JoinColumn()
	user: User;

	@CreateDateColumn()
	createdAt: Date;
}
