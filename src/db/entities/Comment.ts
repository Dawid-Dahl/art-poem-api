import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import {ArtPoem} from "./ArtPoem";
import {User} from "./User";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "text"})
	comment: string;

	@ManyToOne(type => ArtPoem, artpoem => artpoem.comments, {onDelete: "CASCADE"})
	artpoem: ArtPoem;

	@ManyToOne(type => User, user => user.comments)
	@JoinColumn()
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
