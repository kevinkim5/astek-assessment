CREATE DATABASE  IF NOT EXISTS `astek_assess` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `astek_assess`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: astek_assess
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafe`
--

DROP TABLE IF EXISTS `cafe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafe` (
  `id` varchar(36) NOT NULL COMMENT 'UUID',
  `name` char(50) NOT NULL,
  `description` tinytext NOT NULL,
  `location` varchar(45) NOT NULL COMMENT 'Location of the cafe',
  `logo` text COMMENT 'Logo of the cafe. This will be used to display a logo image on the front-end.',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe`
--

LOCK TABLES `cafe` WRITE;
/*!40000 ALTER TABLE `cafe` DISABLE KEYS */;
INSERT INTO `cafe` VALUES ('2f16709e-4648-11ee-ba85-7a37a390e4c7','Cafe 5','Description of Cafe 5','Location ABC',NULL),('54f62680-3ffc-11ee-ba85-7a37a390e4c7','Cafe 2','Description of Cafe 2','Location Y',NULL),('5fe07e92-3ffc-11ee-ba85-7a37a390e4c7','Cafe 3','Description of Cafe 3','Location A',NULL),('874f25e6-4678-11ee-ba85-7a37a390e4c7','Cafe 6','Description of Cafe 6 +++','Location X',NULL),('ae6f76f0-3ff0-11ee-ba85-7a37a390e4c7','Cafe 1','Description of Cafe 1','Location Z',NULL),('f4c6ad96-4002-11ee-ba85-7a37a390e4c7','Cafe 4','Test','Location Y',NULL);
/*!40000 ALTER TABLE `cafe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` varchar(9) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `phone_number` int NOT NULL,
  `gender` enum('F','M') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_address_UNIQUE` (`email_address`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('UI0000001','Employee A','employee_a@gmail.com',91234567,'F'),('UI0000003','Employee C','employee_c@gmail.com',81234561,'M'),('UI0000005','Jane Doe','jane@gmail.com',9222222,'F'),('UI0000006','Jack A','jacka@gmail.com',9333333,'M'),('UI0000009','John Doe','johndoe@gmail.com',90123456,'M'),('UI0000010','Johnny','johnny@gmail.com',92828288,'M'),('UI0000011','Jane Jane','janejane@gmail.com',82723121,'F');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_assignment`
--

DROP TABLE IF EXISTS `work_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_assignment` (
  `employee_id` varchar(9) NOT NULL,
  `cafe_id` varchar(45) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `employee_id_idx` (`employee_id`),
  KEY `fk_cafe_id_idx` (`cafe_id`),
  CONSTRAINT `fk_cafe_id` FOREIGN KEY (`cafe_id`) REFERENCES `cafe` (`id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_assignment`
--

LOCK TABLES `work_assignment` WRITE;
/*!40000 ALTER TABLE `work_assignment` DISABLE KEYS */;
INSERT INTO `work_assignment` VALUES ('UI0000001','5fe07e92-3ffc-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000003','ae6f76f0-3ff0-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000005','5fe07e92-3ffc-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000006','5fe07e92-3ffc-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000009','2f16709e-4648-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000010','874f25e6-4678-11ee-ba85-7a37a390e4c7','2023-08-29',NULL),('UI0000011','54f62680-3ffc-11ee-ba85-7a37a390e4c7','2023-08-29',NULL);
/*!40000 ALTER TABLE `work_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'astek_assess'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-29 22:43:51
