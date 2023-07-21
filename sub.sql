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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
