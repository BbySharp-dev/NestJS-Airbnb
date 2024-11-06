/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `created_by_id` int NOT NULL,
  `date` datetime NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rated` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by_id` (`created_by_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reserved_by_id` int NOT NULL,
  `room_id` int NOT NULL,
  `guests` int NOT NULL,
  `arrival` datetime NOT NULL,
  `departure` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reserved_by_id` (`reserved_by_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`reserved_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_id` int NOT NULL,
  `price` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int NOT NULL,
  `bathrooms` int NOT NULL,
  `guests` int NOT NULL,
  `bedrooms` int NOT NULL,
  `washing_machine` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `electric_iron` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `television` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `air_conditioner` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `wifi` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stove` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parking` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `swimming_pool` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('Male','Female','Undefined') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('Guest','Admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comments` (`id`, `room_id`, `created_by_id`, `date`, `content`, `rated`) VALUES
(1, 2, 3, '2023-06-24 14:16:55', 'This is another comment.', 4);
INSERT INTO `comments` (`id`, `room_id`, `created_by_id`, `date`, `content`, `rated`) VALUES
(2, 1, 2, '2023-06-24 14:16:55', 'Wonderful', 5);


INSERT INTO `locations` (`id`, `address`, `city`, `country`, `photo`) VALUES
(1, '4489 Kincheloe Road', 'Irvine, Oregon', 'U.S', NULL);
INSERT INTO `locations` (`id`, `address`, `city`, `country`, `photo`) VALUES
(2, '1643 Florence Street', 'Tyler, Texas', 'U.S', NULL);


INSERT INTO `reservations` (`id`, `reserved_by_id`, `room_id`, `guests`, `arrival`, `departure`) VALUES
(1, 2, 2, 1, '2023-06-24 14:56:58', '2023-06-30 14:56:58');
INSERT INTO `reservations` (`id`, `reserved_by_id`, `room_id`, `guests`, `arrival`, `departure`) VALUES
(2, 3, 1, 4, '2023-07-26 14:56:58', '2023-07-30 14:56:58');


INSERT INTO `rooms` (`id`, `name`, `location_id`, `price`, `description`, `photo`, `beds`, `bathrooms`, `guests`, `bedrooms`, `washing_machine`, `electric_iron`, `television`, `air_conditioner`, `wifi`, `stove`, `parking`, `swimming_pool`) VALUES
(1, 'Enjoy historic Valencia and close to the beach.', 1, 150, NULL, NULL, 4, 1, 4, 2, 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true');
INSERT INTO `rooms` (`id`, `name`, `location_id`, `price`, `description`, `photo`, `beds`, `bathrooms`, `guests`, `bedrooms`, `washing_machine`, `electric_iron`, `television`, `air_conditioner`, `wifi`, `stove`, `parking`, `swimming_pool`) VALUES
(2, 'Near the street', 2, 100, NULL, NULL, 2, 1, 2, 1, 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'false');


INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`) VALUES
(1, NULL, 'Alex Tran', 'admin@gmail.com', '$2b$10$aMubF0LV9I4cmcBQ1Vo4Q.3VbyYOdUIUZfAvmVQkxn3z8nPnpl8hO', '0934328213', '2000-01-01', 'Undefined', 'Guest');

INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`) VALUES
(2, NULL, 'Linda Nguyen', 'jones2503@gmail.com', '$2b$10$B7tO.K9xZgdHRAyR/Bh8teWbAkXXorHsF/rpYvR.kEBhxZ9CBuUmW', '0934328213', '1979-03-25', 'Female', 'Admin');

INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`) VALUES
(3, NULL, 'Tommy Le', 'donato2503@gmail.com', '$2b$10$qv4KnROlVLTm9Vblh5wTb.XxwPz3OoQH/UKSE5SG2jHlYZKfjpi3K', '0934328213', '1938-11-27', 'Male', 'Guest');

INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`) VALUES
(21, NULL, 'David Phan', 'sang@gmail.com', '$2b$10$x8MyWCNdItJ8Frrb2y0w8u6q7l9KXOKnY/yaK4ulB8gV4yVLMLSO6', '0934328213', '1994-10-30', 'Male', 'Guest');

INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`) VALUES
(23, NULL, 'Chris Vu', 'truong@gmail.com', '$2b$10$q43z8NknbYjALzOsBW.p5.9Z4pNTIHzfwl3V8N/JxmsNAcd1RJ9ca', '0934328213', '2000-10-15', 'Male', 'Guest');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;