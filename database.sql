-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.25-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table test11.semester
CREATE TABLE IF NOT EXISTS `semester` (
  `sid` int(11) NOT NULL,
  `mathiii` varchar(255) DEFAULT NULL,
  `sef` varchar(255) DEFAULT NULL,
  `dsa` varchar(255) DEFAULT NULL,
  `pqt` varchar(255) DEFAULT NULL,
  `java` varchar(255) DEFAULT NULL,
  `malp` varchar(255) DEFAULT NULL,
  `sgpa` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table test11.semester1s
CREATE TABLE IF NOT EXISTS `semester1s` (
  `sid` int(11) NOT NULL,
  `mathi` varchar(255) DEFAULT NULL,
  `cprog` varchar(255) DEFAULT NULL,
  `fit` varchar(255) DEFAULT NULL,
  `pst` varchar(255) DEFAULT NULL,
  `physics` varchar(255) DEFAULT NULL,
  `ct` varchar(255) DEFAULT NULL,
  `sgpa` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table test11.semester2s
CREATE TABLE IF NOT EXISTS `semester2s` (
  `sid` int(11) NOT NULL,
  `mathii` varchar(255) DEFAULT NULL,
  `lc` varchar(255) DEFAULT NULL,
  `oop` varchar(255) DEFAULT NULL,
  `wt` varchar(255) DEFAULT NULL,
  `drawing` varchar(255) DEFAULT NULL,
  `mfcs` varchar(255) DEFAULT NULL,
  `sgpa` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table test11.semester3s
CREATE TABLE IF NOT EXISTS `semester3s` (
  `sid` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `sef` varchar(255) DEFAULT NULL,
  `dsa` varchar(255) DEFAULT NULL,
  `pqt` varchar(255) DEFAULT NULL,
  `java` varchar(255) DEFAULT NULL,
  `malp` varchar(255) DEFAULT NULL,
  `sgpa` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table test11.user_cookies
CREATE TABLE IF NOT EXISTS `user_cookies` (
  `sid` int(11) NOT NULL,
  `username_cookie` varchar(255) DEFAULT NULL,
  `sid_cookie` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table test11.user_infos
CREATE TABLE IF NOT EXISTS `user_infos` (
  `sid` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `permission_type` varchar(255) DEFAULT NULL,
  `otp_temp` varchar(255) DEFAULT NULL,
  `otp_verified` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
