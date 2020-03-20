-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: FlashCardShark
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Avatars` (
  `avatar_id` int(11) NOT NULL AUTO_INCREMENT,
  `style` varchar(20) DEFAULT NULL,
  `birthstar` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `primary_weapon` int(11) NOT NULL,
  `secondary_weapon` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`avatar_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_prime_weapon` (`primary_weapon`),
  KEY `fk_second_weapon` (`secondary_weapon`),
  CONSTRAINT `Avatars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `FlashUsers` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `Avatars_ibfk_2` FOREIGN KEY (`primary_weapon`) REFERENCES `Weapons` (`weapon_id`),
  CONSTRAINT `Avatars_ibfk_3` FOREIGN KEY (`secondary_weapon`) REFERENCES `Weapons` (`weapon_id`),
  CONSTRAINT `fk_prime_weapon` FOREIGN KEY (`primary_weapon`) REFERENCES `Weapons` (`weapon_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_second_weapon` FOREIGN KEY (`secondary_weapon`) REFERENCES `Weapons` (`weapon_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Avatars`
--

LOCK TABLES `Avatars` WRITE;
/*!40000 ALTER TABLE `Avatars` DISABLE KEYS */;
/*!40000 ALTER TABLE `Avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CardSetCards`
--

DROP TABLE IF EXISTS `CardSetCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CardSetCards` (
  `card_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
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
-- Table structure for table `CardSetUsers`
--

DROP TABLE IF EXISTS `CardSetUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CardSetUsers` (
  `user_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
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
-- Table structure for table `CardSets`
--

DROP TABLE IF EXISTS `CardSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CardSets` (
  `set_id` int(11) NOT NULL AUTO_INCREMENT,
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
-- Table structure for table `FlashCardUsers`
--

DROP TABLE IF EXISTS `FlashCardUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FlashCardUsers` (
  `card_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `correct` int(11) NOT NULL DEFAULT '0',
  `incorrect` int(11) NOT NULL DEFAULT '0',
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
INSERT INTO `FlashCardUsers` VALUES (1,1,0,0);
/*!40000 ALTER TABLE `FlashCardUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlashCards`
--

DROP TABLE IF EXISTS `FlashCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FlashCards` (
  `card_id` int(11) NOT NULL AUTO_INCREMENT,
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
-- Table structure for table `FlashUsers`
--

DROP TABLE IF EXISTS `FlashUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FlashUsers` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlashUsers`
--

LOCK TABLES `FlashUsers` WRITE;
/*!40000 ALTER TABLE `FlashUsers` DISABLE KEYS */;
INSERT INTO `FlashUsers` VALUES (1,'maxbisesi','Basketball12','max.bisesi@gmail.com',0);
/*!40000 ALTER TABLE `FlashUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notes` (
  `note_id` int(11) NOT NULL AUTO_INCREMENT,
  `note` varchar(500) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserSessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `cards_seen` int(11) NOT NULL,
  `correct` int(11) NOT NULL,
  `incorrect` int(11) NOT NULL,
  `cards_added` int(11) NOT NULL,
  `points_added` int(11) NOT NULL,
  `card_sets_added` int(11) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Weapons` (
  `weapon_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `damage` int(11) NOT NULL,
  `primary_weapon` tinyint(1) NOT NULL,
  PRIMARY KEY (`weapon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Weapons`
--

LOCK TABLES `Weapons` WRITE;
/*!40000 ALTER TABLE `Weapons` DISABLE KEYS */;
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

-- Dump completed on 2020-03-20  9:33:20
