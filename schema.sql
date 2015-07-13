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
  `votes` INTEGER NULL DEFAULT 0,
  `gif_type` VARCHAR(6),
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
  `api-key` VARCHAR(140) NULL DEFAULT NULL,
  `hasVoted` CHAR(1) NULL DEFAULT 'F',
  PRIMARY KEY (`id`)
);
