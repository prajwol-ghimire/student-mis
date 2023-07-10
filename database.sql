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

-- Dumping data for table test11.semester: ~3 rows (approximately)
INSERT INTO `semester` (`sid`, `mathiii`, `sef`, `dsa`, `pqt`, `java`, `malp`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(55, 'A', 'A', 'A', 'F', 'A', 'F', '-', 1, '2023-06-30 03:28:52', '2023-06-30 03:28:52'),
	(55, '', '', '', 'A', '', '', '-', 2, '2023-06-30 03:28:53', '2023-06-30 03:28:53'),
	(55, '', '', '', '', '', 'A', '-', 3, '2023-06-30 03:28:54', '2023-06-30 03:28:52');

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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table test11.semester1s: ~2 rows (approximately)
INSERT INTO `semester1s` (`sid`, `mathi`, `cprog`, `fit`, `pst`, `physics`, `ct`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(45678, 'B-', 'B-', 'B-', 'C-', 'F', 'D+', '-', 1, '2023-07-09 16:05:40', '2023-07-09 16:05:40'),
	(45678, NULL, NULL, NULL, NULL, 'A', NULL, '-', 2, '2023-07-09 16:05:40', '2023-07-09 16:05:40');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table test11.semester2s: ~2 rows (approximately)
INSERT INTO `semester2s` (`sid`, `mathii`, `lc`, `oop`, `wt`, `drawing`, `mfcs`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(45678, 'B-', 'B-', 'B-', 'F', 'B-', 'B-', '-', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(45678, NULL, NULL, NULL, 'A', NULL, NULL, '-', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

-- Dumping data for table test11.semester3s: ~0 rows (approximately)

-- Dumping structure for table test11.user_cookies
CREATE TABLE IF NOT EXISTS `user_cookies` (
  `sid` int(11) NOT NULL,
  `username_cookie` varchar(255) DEFAULT NULL,
  `sid_cookie` varchar(255) DEFAULT NULL,
  `reset_token_temp` varchar(255) DEFAULT NULL,
  `reset_token_time` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table test11.user_cookies: ~2 rows (approximately)
INSERT INTO `user_cookies` (`sid`, `username_cookie`, `sid_cookie`, `reset_token_temp`, `reset_token_time`, `createdAt`, `updatedAt`) VALUES
	(1231, '$2b$05$C788RkgvQpbrnjgQnVPL2uzyeEd1hn9jdjFLTVT6n74/Vj9D7xj1u', '$2b$05$3wkWsjB99UMYbWc/GC9UbuYrmRYnLXBlszl22vI87P/R4LtAdaVBG', 'none', 2147483647, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(45678, '$2b$05$C788RkgvQpbrnjgQnVPL2uzyeEd1hn9jdjFLTVT6n74/Vj9D7xj1u', '$2b$05$3wkWsjB99UMYbWc/GC9UbuYrmRYnLXBlszl22vI87P/R4LtAdaVBG', 'none', 2147483647, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

-- Dumping data for table test11.user_infos: ~1 rows (approximately)
INSERT INTO `user_infos` (`sid`, `username`, `email`, `password`, `permission_type`, `otp_temp`, `otp_verified`, `createdAt`, `updatedAt`) VALUES
	(45678, 'prajwol', 'prajwol.201723@ncit.edu.np', '$2b$10$qMA.r3LmYvVGNy0xu8pAYORywfTWFrtBiOgncNbccKA0n8yKFQoZm', 'Student', '$2b$07$GoVZNdhGejLjreTZga4jCevCbvlp3dkH091Ant9QyGV7tONwP4YFm', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
