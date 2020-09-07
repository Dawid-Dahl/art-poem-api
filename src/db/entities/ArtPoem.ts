import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToMany,
	JoinTable,
	OneToMany,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import {Collection} from "./Collection";
import {Comment} from "./Comment";
import {User} from "./User";
import {Like} from "./Like";

@Entity()
export class ArtPoem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "varchar"})
	title: string;

	@Column({type: "text"})
	content: string;

	@Column({type: "varchar", nullable: true})
	imageUrl: string;

	@Column({nullable: true})
	userId: string;

	@ManyToOne(type => User, user => user.artpoems)
	@JoinColumn()
	user: User;

	@ManyToMany(type => Collection)
	@JoinTable()
	collections: Collection[];

	@OneToMany(type => Comment, comment => comment.artpoem)
	comments: Comment[];

	@OneToMany(type => Like, like => like.artpoem)
	likes: Like[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
