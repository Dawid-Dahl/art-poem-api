export type ArtPoemId = Pick<ArtPoem, "id">;

export type ArtPoem = {
	id: number;
	title: string;
	content: string;
	imageUrl: string;
	userId: string;
	createdAt: string | Date;
	updatedAt: string | Date;
	collections: Collection[];
	comments: Comment[];
	likes: Like[];
};

export type CollectionId = Pick<Collection, "id">;

export type Collection = {
	id: number;
	name: string;
	public: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
};

export type CommentId = Pick<Comment, "id">;

export type Comment = {
	id: number;
	comment: string;
	createdAt: string | Date;
	updatedAt: string | Date;
};

export type Like = {
	id: number;
	userId: string;
	createdAt: string | Date;
};

export type UserId = User["id"];

export type User = {
	id: string;
	username: string;
	email: string;
	profilePicture?: string;
	createdAt: string | Date;
	updatedAt: string | Date;
};

export type xTokenPayload = {
	sub: string;
	iat: string;
	exp: string;
};

export type SQLRefreshToken = {
	sub: number;
	iat: number;
	refreshToken: string | undefined;
};

export type AuthJsonResponse = {
	success: boolean;
	payload?: string | NodeJS.ReadableStream | undefined;
};
