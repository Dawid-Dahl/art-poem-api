declare namespace Express {
	interface Request {
		gcsPublicUrl?: string;
		gcsFileName?: string;
		user?: import("../types").UserId;
	}
}
