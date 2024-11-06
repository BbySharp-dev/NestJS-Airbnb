-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `created_by_id` INTEGER NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `rated` INTEGER NOT NULL,

    INDEX `created_by_id`(`created_by_id`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reserved_by_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `guests` INTEGER NOT NULL,
    `arrival` DATETIME(0) NOT NULL,
    `departure` DATETIME(0) NOT NULL,

    INDEX `reserved_by_id`(`reserved_by_id`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `location_id` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `photo` VARCHAR(255) NULL,
    `beds` INTEGER NOT NULL,
    `bathrooms` INTEGER NOT NULL,
    `guests` INTEGER NOT NULL,
    `bedrooms` INTEGER NOT NULL,
    `washing_machine` ENUM('true', 'false') NOT NULL,
    `electric_iron` ENUM('true', 'false') NOT NULL,
    `television` ENUM('true', 'false') NOT NULL,
    `air_conditioner` ENUM('true', 'false') NOT NULL,
    `wifi` ENUM('true', 'false') NOT NULL,
    `stove` ENUM('true', 'false') NOT NULL,
    `parking` ENUM('true', 'false') NOT NULL,
    `swimming_pool` ENUM('true', 'false') NOT NULL,

    INDEX `location_id`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `gender` ENUM('Male', 'Female', 'Undefined') NOT NULL,
    `role` ENUM('Guest', 'Admin') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`reserved_by_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
