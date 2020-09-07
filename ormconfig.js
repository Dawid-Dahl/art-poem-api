require("dotenv").config({
	path: ".env",
});

const srcConfig = [
	{
		name: process.env.NODE_ENV,
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		entities: ["src/db/entities/**/*.ts"],
		migrations: ["src/db/migrations/**/*.ts"],
		subscribers: ["src/db/subscribers/**/*.ts"],
		cli: {
			entitiesDir: "src/db/entities",
			migrationsDir: "src/db/migrations",
			subscribersDir: "src/db/subscribers",
		},
	},
];

const distConfig = [
	{
		name: process.env.NODE_ENV,
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: false,
		logging: false,
		entities: ["dist/db/entities/**/*.js"],
		migrations: ["dist/db/migrations/**/*.js"],
		subscribers: ["dist/db/subscribers/**/*.js"],
		cli: {
			entitiesDir: "dist/db/entities",
			migrationsDir: "dist/db/migrations",
			subscribersDir: "dist/db/subscribers",
		},
	},
];

module.exports = process.env.NODE_ENV === "development" ? srcConfig : distConfig;
