import {ArtPoem} from "../../types/types";

export const poemWithOneCollection: ArtPoem = {
	id: 128,
	title: "So sad",
	content: "So very sad!",
	imageUrl:
		"https://storage.googleapis.com/poem-art-bucket/1594585128110-2a084f-post_apocalyptic_beach_by_clapham1994-d62n6a3.jpg",
	userId: "diwr0o84w97kae3xq2p",
	createdAt: "2020-07-12T20:18:48.510Z",
	updatedAt: "2020-07-19T18:03:37.000Z",
	collections: [
		{
			id: 55,
			name: "Sad Poems",
			public: true,
			createdAt: "2020-05-19T16:31:18.156Z",
			updatedAt: "2020-05-19T16:31:18.156Z",
		},
	],
	likes: [],
	comments: [],
};

export const mockCollectionSadPoems = {
	id: 55,
	name: "Sad Poems",
	public: true,
	createdAt: "2020-05-19T16:31:18.156Z",
	updatedAt: "2020-05-19T16:31:18.156Z",
};

export const mockCollectionInspiringPoems = {
	id: 64,
	name: "Inspiring Poems",
	public: true,
	createdAt: "2020-05-19T16:31:18.156Z",
	updatedAt: "2020-05-19T16:31:18.156Z",
};

export const poemWithNoCollections: ArtPoem = {
	id: 128,
	title: "So sad",
	content: "So very sad!",
	imageUrl:
		"https://storage.googleapis.com/poem-art-bucket/1594585128110-2a084f-post_apocalyptic_beach_by_clapham1994-d62n6a3.jpg",
	userId: "diwr0o84w97kae3xq2p",
	createdAt: "2020-07-12T20:18:48.510Z",
	updatedAt: "2020-07-19T18:03:37.000Z",
	collections: [],
	likes: [],
	comments: [],
};

export const poemWithNoCollectionsField: Omit<ArtPoem, "collections"> = {
	id: 128,
	title: "So sad",
	content: "So very sad!!!",
	imageUrl:
		"https://storage.googleapis.com/poem-art-bucket/1594585128110-2a084f-post_apocalyptic_beach_by_clapham1994-d62n6a3.jpg",
	userId: "diwr0o84w97kae3xq2p",
	createdAt: "2020-07-12T20:18:48.510Z",
	updatedAt: "2020-07-20T06:42:14.000Z",
	likes: [],
	comments: [],
};

export const poemWithThreeCollections: ArtPoem = {
	id: 128,
	title: "So sad",
	content: "So very sad!",
	imageUrl:
		"https://storage.googleapis.com/poem-art-bucket/1594585128110-2a084f-post_apocalyptic_beach_by_clapham1994-d62n6a3.jpg",
	userId: "diwr0o84w97kae3xq2p",
	createdAt: "2020-07-12T20:18:48.510Z",
	updatedAt: "2020-07-19T18:03:37.000Z",
	collections: [
		{
			id: 55,
			name: "Sad Poems",
			public: true,
			createdAt: "2020-05-19T16:31:18.156Z",
			updatedAt: "2020-05-19T16:31:18.156Z",
		},
		{
			id: 64,
			name: "Inspiring Poems",
			public: true,
			createdAt: "2020-05-19T16:31:18.156Z",
			updatedAt: "2020-05-19T16:31:18.156Z",
		},
		{
			id: 65,
			name: "Victor's Collection",
			public: true,
			createdAt: "2020-05-19T16:31:18.156Z",
			updatedAt: "2020-05-19T16:31:18.156Z",
		},
	],
	likes: [],
	comments: [],
};
