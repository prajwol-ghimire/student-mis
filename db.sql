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


-- Dumping database structure for student_mis
CREATE DATABASE IF NOT EXISTS `student_mis` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `student_mis`;

-- Dumping structure for table student_mis.notice_data
CREATE TABLE IF NOT EXISTS `notice_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `uploded_year` varchar(255) DEFAULT NULL,
  `uploded_month` varchar(255) DEFAULT NULL,
  `uploded_day` varchar(255) DEFAULT NULL,
  `notice_image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.notice_data: ~2 rows (approximately)
INSERT INTO `notice_data` (`id`, `title`, `description`, `uploded_year`, `uploded_month`, `uploded_day`, `notice_image`, `createdAt`, `updatedAt`) VALUES
	(5, '2351', 'rhgsdf', '2023', '7', '21', 'notice-1689919972055-user.png', '2023-07-21 06:12:52', '2023-07-21 06:12:52'),
	(6, 'fdshsdf', 'shsdfh', '2023', '7', '21', 'notice-1689919983227-20230702_153123.jpg', '2023-07-21 06:13:03', '2023-07-21 06:13:03');

-- Dumping structure for table student_mis.semester1s
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.semester1s: ~3 rows (approximately)
INSERT INTO `semester1s` (`sid`, `mathi`, `cprog`, `fit`, `pst`, `physics`, `ct`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(4546, 'A', 'F', 'F', 'A', 'F', 'CNR', '-', 50, '2023-07-19 04:00:28', '2023-07-19 04:00:28'),
	(4546, NULL, 'A', 'F', NULL, 'F', NULL, '-', 51, '2023-07-19 04:00:28', '2023-07-19 04:00:28'),
	(4546, NULL, NULL, 'A', NULL, 'F', NULL, '-', 52, '2023-07-19 04:00:28', '2023-07-19 04:00:28');

-- Dumping structure for table student_mis.semester2s
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.semester2s: ~1 rows (approximately)
INSERT INTO `semester2s` (`sid`, `mathii`, `lc`, `oop`, `wt`, `drawing`, `mfcs`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(4546, 'A', 'A', 'A', 'A', 'A', 'A', '4', 36, '2023-07-21 04:41:01', '2023-07-21 04:41:01');

-- Dumping structure for table student_mis.semester3s
CREATE TABLE IF NOT EXISTS `semester3s` (
  `sid` int(11) NOT NULL,
  `mathiii` varchar(255) DEFAULT NULL,
  `sef` varchar(255) DEFAULT NULL,
  `dsa` varchar(255) DEFAULT NULL,
  `pqt` varchar(255) DEFAULT NULL,
  `java` varchar(255) DEFAULT NULL,
  `malp` varchar(255) DEFAULT NULL,
  `sgpa` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.semester3s: ~3 rows (approximately)
INSERT INTO `semester3s` (`sid`, `mathiii`, `sef`, `dsa`, `pqt`, `java`, `malp`, `sgpa`, `id`, `createdAt`, `updatedAt`) VALUES
	(4546, 'C-', 'F', 'B-', 'F', 'F', 'F', '-', 25, '2023-07-19 04:02:19', '2023-07-19 04:02:19'),
	(4546, NULL, 'B-', NULL, 'A', 'F', 'F', '-', 33, '2023-07-19 04:02:19', '2023-07-19 04:02:19'),
	(4546, NULL, NULL, NULL, NULL, 'A', 'A', '-', 35, '2023-07-19 04:02:19', '2023-07-19 04:02:19');

-- Dumping structure for table student_mis.subject_data
CREATE TABLE IF NOT EXISTS `subject_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `faculty` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=681 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.subject_data: ~18 rows (approximately)
INSERT INTO `subject_data` (`id`, `course_name`, `abbreviation`, `course_code`, `faculty`, `semester`, `credit`, `createdAt`, `updatedAt`) VALUES
	(1, 'C Programming', 'cprog', 'CMP-114', 'BE Software', 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Engineering Mathematics I', 'mathi', 'MTH 112', 'BE Software', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'Communication Techniques', 'ct', 'ENG 111', 'BE Software', 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'Fundamentals of IT', 'fit', 'CMP 110', 'BE Software', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'Physics', 'physics', 'PHY 111', 'BE Software', 1, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Problem Solving Techniques', 'pst', 'CMP 114', 'BE Software', 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(7, 'Engineering Mathematics II', 'mathii', 'MTH 114', 'BE Software', 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(8, 'Logic Circuits', 'lc', 'ELX 212', 'BE Software', 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(9, 'Mathematical Foundation of Computer Science', 'mfcs', 'MTH 130', 'BE Software', 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(10, 'Object Oriented Programming in C++', 'oop', 'CMP 115', 'BE Software', 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(11, 'Engineering Drawing', 'drawing', 'MEC 120', 'BE Software', 2, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(12, 'Web Technology', 'wt', 'CMP 213', 'BE Software', 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(13, 'Engineering Mathematics III', 'mathiii', 'MTH 212', 'BE Software', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(14, 'Data Structure and Algorithms', 'dsa', 'CMP 225', 'BE Software', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(15, 'Software Engineering Fundamentals', 'sef', 'CMP 220', 'BE Software', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(16, 'Probability and Queuing Theory', 'pqt', 'MTH 221', 'BE Software', 3, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(17, 'Programming in Java', 'java', 'CMP 212', 'BE Software', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(18, 'Microprocessor and Assembly Language Programming', 'malp', 'CMP 214', 'BE Software', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- Dumping structure for table student_mis.user_cookies
CREATE TABLE IF NOT EXISTS `user_cookies` (
  `sid` int(11) NOT NULL,
  `reset_token_temp` varchar(255) DEFAULT NULL,
  `reset_token_time` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.user_cookies: ~1 rows (approximately)
INSERT INTO `user_cookies` (`sid`, `reset_token_temp`, `reset_token_time`, `createdAt`, `updatedAt`) VALUES
	(1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- Dumping structure for table student_mis.user_data
CREATE TABLE IF NOT EXISTS `user_data` (
  `sid` int(11) NOT NULL,
  `crn` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.user_data: ~1 rows (approximately)
INSERT INTO `user_data` (`sid`, `crn`, `user_image`, `createdAt`, `updatedAt`) VALUES
	(1, NULL, 'photo-1689831246796-20230702_153123.jpg', '2023-07-20 03:21:24', '2023-07-20 03:21:24');

-- Dumping structure for table student_mis.user_infos
CREATE TABLE IF NOT EXISTS `user_infos` (
  `sid` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `permission_type` varchar(255) DEFAULT NULL,
  `otp_temp` varchar(255) DEFAULT NULL,
  `otp_verified` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table student_mis.user_infos: ~1 rows (approximately)
INSERT INTO `user_infos` (`sid`, `username`, `email`, `password`, `permission_type`, `otp_temp`, `otp_verified`, `createdAt`, `updatedAt`) VALUES
	(1, 'Test Man', 'test.123@ncit.edu.np', '$2b$10$Ruge19J.GD8wPf4nA4y2eeG2eai1a6LArhklId5Ku6uW/6uj8fYoC', 'Student', '$2b$07$Mwy8.wPpf1glWFlJYGupBuXP94koVfPfaFpR3vIEqiFjUTWFBmNsq', 1, '2023-07-20 03:16:04', '2023-07-20 03:16:04');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
