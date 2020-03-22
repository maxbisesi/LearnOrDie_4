-- MySQL dump 10.13  Distrib 8.0.19, for osx10.15 (x86_64)
--
-- Host: localhost    Database: FlashCardShark
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `Avatars`
--

DROP TABLE IF EXISTS `Avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Avatars` (
  `avatar_id` int NOT NULL AUTO_INCREMENT,
  `style` varchar(20) DEFAULT NULL,
  `birthstar` varchar(20) DEFAULT NULL,
  `user_id` int NOT NULL,
  `primary_weapon` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`avatar_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_prime_weapon` (`primary_weapon`),
  CONSTRAINT `Avatars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `Avatars_ibfk_2` FOREIGN KEY (`primary_weapon`) REFERENCES `Weapons` (`weapon_id`),
  CONSTRAINT `fk_prime_weapon` FOREIGN KEY (`primary_weapon`) REFERENCES `Weapons` (`weapon_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Avatars`
--

LOCK TABLES `Avatars` WRITE;
/*!40000 ALTER TABLE `Avatars` DISABLE KEYS */;
INSERT INTO `Avatars` VALUES (1,'Yellow','Winter Moon',8,7,'',1),(2,'','',9,8,'',1),(3,'','',10,9,'3',1),(4,'','',11,10,'',1),(5,'','',12,11,'',1),(6,'','',13,12,'3',1),(7,'','',14,13,'',1),(8,'Yellow','Southern Wind',15,14,'',1),(9,'Yellow','',16,15,'3',1),(10,'','',17,16,'3',1),(11,'','',18,17,'',1),(12,'','',19,18,'',1),(13,'','',20,19,'',1),(14,'','',21,20,'',1);
/*!40000 ALTER TABLE `Avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CardSetCards`
--

DROP TABLE IF EXISTS `CardSetCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CardSetCards` (
  `card_id` int NOT NULL,
  `set_id` int NOT NULL,
  PRIMARY KEY (`card_id`,`set_id`),
  KEY `set_id` (`set_id`),
  CONSTRAINT `CardSetCards_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `FlashCards` (`card_id`) ON DELETE CASCADE,
  CONSTRAINT `CardSetCards_ibfk_2` FOREIGN KEY (`set_id`) REFERENCES `CardSets` (`set_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CardSetCards`
--

LOCK TABLES `CardSetCards` WRITE;
/*!40000 ALTER TABLE `CardSetCards` DISABLE KEYS */;
INSERT INTO `CardSetCards` VALUES (1,1);
/*!40000 ALTER TABLE `CardSetCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CardSets`
--

DROP TABLE IF EXISTS `CardSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CardSets` (
  `set_id` int NOT NULL AUTO_INCREMENT,
  `setname` varchar(15) NOT NULL,
  `description` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`set_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CardSets`
--

LOCK TABLES `CardSets` WRITE;
/*!40000 ALTER TABLE `CardSets` DISABLE KEYS */;
INSERT INTO `CardSets` VALUES (1,'TEST','TEEEST');
/*!40000 ALTER TABLE `CardSets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CardSetUsers`
--

DROP TABLE IF EXISTS `CardSetUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CardSetUsers` (
  `user_id` int NOT NULL,
  `set_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`set_id`),
  KEY `fk_set` (`set_id`),
  CONSTRAINT `fk_set` FOREIGN KEY (`set_id`) REFERENCES `CardSets` (`set_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CardSetUsers`
--

LOCK TABLES `CardSetUsers` WRITE;
/*!40000 ALTER TABLE `CardSetUsers` DISABLE KEYS */;
INSERT INTO `CardSetUsers` VALUES (1,1);
/*!40000 ALTER TABLE `CardSetUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlashCards`
--

DROP TABLE IF EXISTS `FlashCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FlashCards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card` varchar(500) NOT NULL,
  `answer` varchar(250) NOT NULL,
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlashCards`
--

LOCK TABLES `FlashCards` WRITE;
/*!40000 ALTER TABLE `FlashCards` DISABLE KEYS */;
INSERT INTO `FlashCards` VALUES (1,'TEST','TEST','TESSTT');
/*!40000 ALTER TABLE `FlashCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlashCardUsers`
--

DROP TABLE IF EXISTS `FlashCardUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FlashCardUsers` (
  `card_id` int NOT NULL,
  `user_id` int NOT NULL,
  `correct` int NOT NULL DEFAULT '0',
  `incorrect` int NOT NULL DEFAULT '0',
  `owner_id` int NOT NULL,
  PRIMARY KEY (`card_id`,`user_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_card_id` FOREIGN KEY (`card_id`) REFERENCES `FlashCards` (`card_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlashCardUsers`
--

LOCK TABLES `FlashCardUsers` WRITE;
/*!40000 ALTER TABLE `FlashCardUsers` DISABLE KEYS */;
INSERT INTO `FlashCardUsers` VALUES (1,1,0,0,0);
/*!40000 ALTER TABLE `FlashCardUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlashUsers`
--

DROP TABLE IF EXISTS `FlashUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FlashUsers` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `points` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlashUsers`
--

LOCK TABLES `FlashUsers` WRITE;
/*!40000 ALTER TABLE `FlashUsers` DISABLE KEYS */;
INSERT INTO `FlashUsers` VALUES (1,'maxbisesi','Basketball12','max.bisesi@gmail.com',0),(2,'big_dog_B','Basketball12','max.bisesi@gmail.com',0),(3,'little_Camey','Basketball12','max.bisesi@gmail.com',0),(4,'Big_Julie','Basketball12','max.bisesi@gmail.com',0),(5,'Big67_Julie','Basketball12','max.bisesi@gmail.com',0),(6,'R_Odriscol','Mamy2','r.buildzoon@snamarin',0),(7,'R_t_34Odriscol','Mamy2','r.buildzoon@snamarin',0),(8,'tj!','bbn','th@bbn',0),(9,'yu','yu','yuuu',0),(10,'uio','uio','uuu',0),(11,'bbhj','bbhj','bbhj@email.com',0),(12,'asdf','asdf','asdfa',0),(13,'aasdsdf','dd','dd',0),(14,'aaa','aaa','aaa',0),(15,'ty6','ty6','ty6',0),(16,'ab','ab','ab',0),(17,'jj','j','jj',0),(18,'ghj','ghj','ghj',0),(19,'helpme','helpme','helpme@door.com',0),(20,'uio90765678','uio','uio',0),(21,'qsgsdfhvrghnw','d','d',0);
/*!40000 ALTER TABLE `FlashUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `note` varchar(500) NOT NULL,
  `user_id` int DEFAULT NULL,
  `card_id` int DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `fk_note_user` (`user_id`),
  KEY `fk_note_card` (`card_id`),
  CONSTRAINT `fk_note_card` FOREIGN KEY (`card_id`) REFERENCES `FlashCards` (`card_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_note_user` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notes`
--

LOCK TABLES `Notes` WRITE;
/*!40000 ALTER TABLE `Notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSessions`
--

DROP TABLE IF EXISTS `UserSessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSessions` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `cards_seen` int NOT NULL,
  `correct` int NOT NULL,
  `incorrect` int NOT NULL,
  `cards_added` int NOT NULL,
  `points_added` int NOT NULL,
  `card_sets_added` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `UserSessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSessions`
--

LOCK TABLES `UserSessions` WRITE;
/*!40000 ALTER TABLE `UserSessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Weapons`
--

DROP TABLE IF EXISTS `Weapons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Weapons` (
  `weapon_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `damage` int NOT NULL,
  `defense` int NOT NULL,
  PRIMARY KEY (`weapon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Weapons`
--

LOCK TABLES `Weapons` WRITE;
/*!40000 ALTER TABLE `Weapons` DISABLE KEYS */;
INSERT INTO `Weapons` VALUES (1,'',0,0),(2,'Hand Cannon',0,0),(3,'Hand Cannon',0,0),(4,'Hand Cannon',0,0),(5,'Saber',0,0),(6,'Saber',0,0),(7,'Hand Cannon',0,0),(8,'',0,0),(9,'',0,0),(10,'',0,0),(11,'',0,0),(12,'',0,0),(13,'',0,0),(14,'Hand Cannon',0,0),(15,'',0,0),(16,'',0,0),(17,'',0,0),(18,'',0,0),(19,'',0,0),(20,'',0,0);
/*!40000 ALTER TABLE `Weapons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-21 19:32:32
