import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1599497726043 implements MigrationInterface {
	name = "InitialMigration1599497726043";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `comment` text NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `artpoemId` int NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `userId` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `artpoemId` int NULL, UNIQUE INDEX `IDX_4b432f0b2c1c0c723bb6cbab42` (`artpoemId`, `userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"CREATE TABLE `user` (`id` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `admin` tinyint NOT NULL DEFAULT 0, `profilePicture` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"CREATE TABLE `collection` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL DEFAULT 'My Collection', `public` tinyint NOT NULL DEFAULT 1, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"CREATE TABLE `art_poem` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` text NOT NULL, `imageUrl` varchar(255) NULL, `userId` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"CREATE TABLE `art_poem_collections_collection` (`artPoemId` int NOT NULL, `collectionId` int NOT NULL, INDEX `IDX_1dc6e51e2ca6298042fb40d9a8` (`artPoemId`), INDEX `IDX_e4fa58432dfdb0295a12027845` (`collectionId`), PRIMARY KEY (`artPoemId`, `collectionId`)) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARSET=utf8mb4"
		);
		await queryRunner.query(
			"ALTER TABLE `comment` ADD CONSTRAINT `FK_39b8b4c9c1ee477473b0148da88` FOREIGN KEY (`artpoemId`) REFERENCES `art_poem`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `like` ADD CONSTRAINT `FK_4b2502ffac33456919b66cd446a` FOREIGN KEY (`artpoemId`) REFERENCES `art_poem`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `like` ADD CONSTRAINT `FK_e8fb739f08d47955a39850fac23` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `collection` ADD CONSTRAINT `FK_ca25eb01f75a85272300f336029` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `art_poem` ADD CONSTRAINT `FK_3dd1fa42b079bf883bfd7122a8d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `art_poem_collections_collection` ADD CONSTRAINT `FK_1dc6e51e2ca6298042fb40d9a82` FOREIGN KEY (`artPoemId`) REFERENCES `art_poem`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
		);
		await queryRunner.query(
			"ALTER TABLE `art_poem_collections_collection` ADD CONSTRAINT `FK_e4fa58432dfdb0295a120278457` FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"ALTER TABLE `art_poem_collections_collection` DROP FOREIGN KEY `FK_e4fa58432dfdb0295a120278457`"
		);
		await queryRunner.query(
			"ALTER TABLE `art_poem_collections_collection` DROP FOREIGN KEY `FK_1dc6e51e2ca6298042fb40d9a82`"
		);
		await queryRunner.query(
			"ALTER TABLE `art_poem` DROP FOREIGN KEY `FK_3dd1fa42b079bf883bfd7122a8d`"
		);
		await queryRunner.query(
			"ALTER TABLE `collection` DROP FOREIGN KEY `FK_ca25eb01f75a85272300f336029`"
		);
		await queryRunner.query(
			"ALTER TABLE `like` DROP FOREIGN KEY `FK_e8fb739f08d47955a39850fac23`"
		);
		await queryRunner.query(
			"ALTER TABLE `like` DROP FOREIGN KEY `FK_4b2502ffac33456919b66cd446a`"
		);
		await queryRunner.query(
			"ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`"
		);
		await queryRunner.query(
			"ALTER TABLE `comment` DROP FOREIGN KEY `FK_39b8b4c9c1ee477473b0148da88`"
		);
		await queryRunner.query(
			"DROP INDEX `IDX_e4fa58432dfdb0295a12027845` ON `art_poem_collections_collection`"
		);
		await queryRunner.query(
			"DROP INDEX `IDX_1dc6e51e2ca6298042fb40d9a8` ON `art_poem_collections_collection`"
		);
		await queryRunner.query("DROP TABLE `art_poem_collections_collection`");
		await queryRunner.query("DROP TABLE `art_poem`");
		await queryRunner.query("DROP TABLE `collection`");
		await queryRunner.query("DROP TABLE `user`");
		await queryRunner.query("DROP INDEX `IDX_4b432f0b2c1c0c723bb6cbab42` ON `like`");
		await queryRunner.query("DROP TABLE `like`");
		await queryRunner.query("DROP TABLE `comment`");
	}
}
