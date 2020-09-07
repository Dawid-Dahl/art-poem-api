import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
	JoinColumn,
} from "typeorm";
import {Collection} from "./Collection";
import {Comment} from "./Comment";
import {ArtPoem} from "./ArtPoem";
import {Like} from "./Like";

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn({type: "varchar", unique: true})
	id: string;

	@Column({type: "varchar"})
	username: string;

	@Column({type: "boolean", default: 0})
	admin: boolean;

	@Column({type: "varchar", nullable: true})
	profilePicture: string;

	@OneToMany(type => ArtPoem, artpoem => artpoem.user)
	artpoems: ArtPoem;

	@OneToMany(type => Collection, collection => collection.user)
	collections: Collection;

	@OneToMany(type => Comment, comment => comment.user)
	comments: Comment;

	@OneToMany(type => Like, like => like.user)
	likes: Like;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
