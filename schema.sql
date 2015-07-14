-- DATA SCHEMA
-- Run this file to set up the data structure.

-- ---
-- Table 'gif_counts'
--
-- ---

USE gifvsgif;

DROP TABLE IF EXISTS `gif_counts`;

CREATE TABLE `gif_counts` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `gif_type` VARCHAR(6),
  `votes` INTEGER NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

INSERT INTO gif_counts (gif_type) VALUES('hard_g');
INSERT INTO gif_counts (gif_type) VALUES('soft_g');

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR(70) NULL DEFAULT NULL,
  `hasVoted` INT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);
