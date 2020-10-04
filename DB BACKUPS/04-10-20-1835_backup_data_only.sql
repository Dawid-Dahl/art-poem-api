-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_c7dcb267aa0af87
-- ------------------------------------------------------
-- Server version	5.6.49-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `art_poem`
--

LOCK TABLES `art_poem` WRITE;
/*!40000 ALTER TABLE `art_poem` DISABLE KEYS */;
INSERT INTO `art_poem` VALUES (531,'Lyktan','Lys, lys f\ör tusan! Jaaaaa','https://storage.googleapis.com/poem-art-bucket/rmktvxzps6kfbigu82/1600631459770-139954-16006313663505439901165086259714.jpg','rmktvxzps6kfbigu82','2020-09-20 19:51:00.197252','2020-09-21 13:06:47.000000'),(541,'Tennis-joy','Tennis is fun! Try it!\nJust DO IT f\ör tusan!!!!','https://storage.googleapis.com/poem-art-bucket/rmktvxzps6kfbigu82/1600632014877-730b6a-16006319963891122190617061324566.jpg','rmktvxzps6kfbigu82','2020-09-20 20:00:15.376929','2020-09-21 13:11:59.000000'),(551,'Chocolate','Mmmmhhh...\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pulvinar felis sit amet mauris fringilla, id egestas nisl facilisis. Nam vel vehicula nisl. Praesent ipsum quam, lobortis eget neque eu, fringilla fermentum risus. In ac suscipit leo, suscipit tincidunt quam. Curabitur condimentum nibh viverra ex molestie gravida. Donec ut mi diam. Suspendisse sit amet justo interdum, porta erat a, ullamcorper felis. Fusce tincidunt felis urna. Morbi mattis semper metus, id dictum ex tristique non. Aliquam id nisi ac enim cursus dapibus auctor ut neque. Pellentesque eget feugiat arcu. Suspendisse ut neque sagittis, sollicitudin mauris at, pretium velit. Aenean semper tincidunt ligula, in accumsan sapien varius ut. Nunc pellentesque massa vel tincidunt hendrerit. Donec fringilla urna in nibh aliquam aliquam. Etiam vel dapibus arcu.\n\nFusce ipsum neque, elementum nec feugiat vitae, ultrices dictum dui. Vestibulum congue egestas dui, quis ultrices risus sollicitudin scelerisque. Vivamus volutpat magna sed augue viverra, eget aliquet leo feugiat. Quisque non arcu velit. Donec diam metus, malesuada ac aliquam vel, consectetur vitae mi. Integer sollicitudin vitae quam in dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis a felis nisi. Ut semper ante dui, ac imperdiet urna tempus sed.','https://storage.googleapis.com/poem-art-bucket/cddh7v2v9a7kfckoi7f/1600695776155-5b741d-lindt-excellence-chocolate-expertise-which-dark-chocolate-is-right-for-you-q1-850x567.jpg','cddh7v2v9a7kfckoi7f','2020-09-21 13:35:39.780894','2020-09-23 16:08:04.000000'),(561,'Super Sad','So sad. Super, duper sad...','https://storage.googleapis.com/poem-art-bucket/cddh7v2v9a7kfckoi7f/1600695412862-3eb5dc-post_apocalyptic_beach_by_clapham1994-d62n6a3.jpg','cddh7v2v9a7kfckoi7f','2020-09-21 13:35:49.066621','2020-09-30 14:04:38.000000'),(581,'Private Poem','Super private.','https://storage.googleapis.com/poem-art-bucket/cddh7v2v9a7kfckoi7f/1600699432297-8c8352-IMG_1073.jpg','cddh7v2v9a7kfckoi7f','2020-09-21 14:43:52.844758','2020-09-22 13:21:24.000000'),(631,'Socks','The best socks in life are free!','https://storage.googleapis.com/poem-art-bucket/5xpt4gxmcbfkfe3mmq2/1600788481439-a9e355-image.jpg','5xpt4gxmcbfkfe3mmq2','2020-09-22 15:28:01.969131','2020-09-22 15:38:16.000000'),(641,'The Best Poem','Ever. Seriously...','https://storage.googleapis.com/poem-art-bucket/cddh7v2v9a7kfckoi7f/1600949735086-21a047-aIMG_9506.jpg','cddh7v2v9a7kfckoi7f','2020-09-24 12:15:35.549241','2020-10-02 09:01:14.000000');
/*!40000 ALTER TABLE `art_poem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `art_poem_collections_collection`
--

LOCK TABLES `art_poem_collections_collection` WRITE;
/*!40000 ALTER TABLE `art_poem_collections_collection` DISABLE KEYS */;
INSERT INTO `art_poem_collections_collection` VALUES (531,201),(541,211),(551,251),(561,271),(581,281),(631,321),(641,251);
/*!40000 ALTER TABLE `art_poem_collections_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (201,'My Collection',1,'2020-09-20 19:46:03.988055','2020-09-20 19:46:03.988055','rmktvxzps6kfbigu82'),(211,'Glatt',1,'2020-09-20 19:54:11.190484','2020-09-20 19:54:11.190484','rmktvxzps6kfbigu82'),(221,'Ledset',1,'2020-09-20 19:54:21.002222','2020-09-20 19:54:21.002222','rmktvxzps6kfbigu82'),(231,'Argt',1,'2020-09-20 19:54:34.478202','2020-09-20 19:54:34.478202','rmktvxzps6kfbigu82'),(241,'Ljust',1,'2020-09-20 19:54:59.841559','2020-09-20 19:54:59.841559','rmktvxzps6kfbigu82'),(251,'My Collection',1,'2020-09-21 13:34:43.518877','2020-09-21 13:34:43.518877','cddh7v2v9a7kfckoi7f'),(271,'Sad Poems',1,'2020-09-21 13:40:19.508660','2020-09-21 13:40:19.508660','cddh7v2v9a7kfckoi7f'),(281,'Private',0,'2020-09-21 14:43:27.480702','2020-09-21 14:43:27.480702','cddh7v2v9a7kfckoi7f'),(291,'My Collection',1,'2020-09-22 12:10:12.085916','2020-09-22 12:10:12.085916','bnxual6vl1ukfdx23h5'),(301,'My Collection',1,'2020-09-22 12:26:27.156076','2020-09-22 12:26:27.156076','lvm76yz4yqbkfdxn75b'),(311,'My Collection',1,'2020-09-22 15:13:58.384975','2020-09-22 15:13:58.384975','5xpt4gxmcbfkfe3mmq2'),(321,'Happy poem',1,'2020-09-22 15:21:42.622520','2020-09-22 15:21:42.622520','5xpt4gxmcbfkfe3mmq2'),(331,'My Collection',1,'2020-10-01 02:34:56.406039','2020-10-01 02:34:56.406039','ekwib2v6bakfq7h0w9'),(341,'My Collection',1,'2020-10-01 02:35:22.518950','2020-10-01 02:35:22.518950','z068t0xxqokfq7hqhy'),(351,'My Collection',1,'2020-10-02 08:29:22.635241','2020-10-02 08:29:22.635241','zh1vuh0ru6kfrzku2v');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (321,'Such an inspiring poem. Wow.','2020-09-21 13:35:55.641220','2020-09-21 15:13:02.000000',561,'cddh7v2v9a7kfckoi7f'),(331,'Wow, awesome.\n\nYeah.','2020-09-21 13:36:03.264358','2020-09-21 13:42:24.000000',551,'cddh7v2v9a7kfckoi7f'),(391,'Ã…h vad fint!','2020-09-21 13:41:19.581288','2020-09-21 13:41:19.581288',531,'cddh7v2v9a7kfckoi7f'),(401,'I agree','2020-09-22 15:18:00.441199','2020-09-22 15:18:00.441199',561,'5xpt4gxmcbfkfe3mmq2'),(411,'Wow, I love socks!','2020-09-22 15:34:10.218378','2020-09-22 15:34:10.218378',631,'cddh7v2v9a7kfckoi7f'),(421,'Fin bild:)','2020-09-22 15:45:29.704839','2020-09-22 15:46:00.000000',531,'5xpt4gxmcbfkfe3mmq2'),(441,'Shit vilken bra dikt morsan','2020-09-23 14:37:01.803557','2020-09-23 14:37:01.803557',541,'bnxual6vl1ukfdx23h5'),(451,'Wow. That\'s really deep.','2020-09-23 14:37:55.851491','2020-09-23 14:37:55.851491',561,'bnxual6vl1ukfdx23h5'),(461,'HÃ¥ller verkligen med...','2020-09-23 16:08:55.154819','2020-09-23 16:08:55.154819',541,'cddh7v2v9a7kfckoi7f'),(471,'I know. Just the way I am...','2020-09-23 16:17:04.757763','2020-09-24 12:16:56.000000',561,'cddh7v2v9a7kfckoi7f');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1071,'5xpt4gxmcbfkfe3mmq2','2020-09-22 15:31:08.321510',551),(1111,'5xpt4gxmcbfkfe3mmq2','2020-09-22 15:37:58.139379',541),(1131,'5xpt4gxmcbfkfe3mmq2','2020-09-22 15:43:15.573273',561),(1141,'bnxual6vl1ukfdx23h5','2020-09-23 14:36:34.510925',541),(1151,'bnxual6vl1ukfdx23h5','2020-09-23 14:37:29.973639',561),(1161,'bnxual6vl1ukfdx23h5','2020-09-23 14:42:44.676750',551),(1171,'bnxual6vl1ukfdx23h5','2020-09-23 14:43:15.331382',631),(1191,'cddh7v2v9a7kfckoi7f','2020-09-24 12:13:29.126274',531),(1221,'5xpt4gxmcbfkfe3mmq2','2020-09-29 09:12:47.952653',631),(1231,'5xpt4gxmcbfkfe3mmq2','2020-09-29 09:13:14.140730',641),(1241,'5xpt4gxmcbfkfe3mmq2','2020-09-29 09:37:41.388427',531),(1351,'cddh7v2v9a7kfckoi7f','2020-09-30 18:03:09.405278',551),(1361,'cddh7v2v9a7kfckoi7f','2020-10-01 10:32:48.602029',631),(1381,'cddh7v2v9a7kfckoi7f','2020-10-02 09:17:08.699064',541),(1391,'cddh7v2v9a7kfckoi7f','2020-10-03 10:05:52.729751',641);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (21,1599497726043,'InitialMigration1599497726043');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('5xpt4gxmcbfkfe3mmq2','Janet',0,'https://storage.googleapis.com/poem-art-bucket/5xpt4gxmcbfkfe3mmq2/profile-image/1600788038735-a40ab9-image.jpg','2020-09-22 15:13:58.370567','2020-09-22 15:20:39.000000'),('bnxual6vl1ukfdx23h5','Pelikana',0,'https://storage.googleapis.com/poem-art-bucket/bnxual6vl1ukfdx23h5/profile-image/1600871685160-755c4a-648D53EF-1F97-48A8-BDF6-FAC98AE4E6A7.jpeg','2020-09-22 12:10:11.883995','2020-09-23 14:34:45.000000'),('cddh7v2v9a7kfckoi7f','Dawid',0,'https://storage.googleapis.com/poem-art-bucket/cddh7v2v9a7kfckoi7f/profile-image/1600701530344-c68c84-Photo_on_2020-08-17_at_16.08.jpg','2020-09-21 13:34:43.048358','2020-09-21 15:18:50.000000'),('ekwib2v6bakfq7h0w9','test',0,NULL,'2020-10-01 02:34:56.384222','2020-10-01 02:34:56.384222'),('lvm76yz4yqbkfdxn75b','byaa',0,NULL,'2020-09-22 12:26:27.128901','2020-09-22 12:26:27.128901'),('rmktvxzps6kfbigu82','MarikaH',0,'https://storage.googleapis.com/poem-art-bucket/rmktvxzps6kfbigu82/profile-image/1600632089770-145dff-16006320295032552677595928017787.jpg','2020-09-20 19:46:03.807376','2020-09-20 20:01:30.000000'),('z068t0xxqokfq7hqhy','notadmin',0,NULL,'2020-10-01 02:35:22.504335','2020-10-01 02:35:22.504335'),('zh1vuh0ru6kfrzku2v','JacobDahl',0,NULL,'2020-10-02 08:29:22.620205','2020-10-02 08:29:22.620205');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-04 18:34:21
