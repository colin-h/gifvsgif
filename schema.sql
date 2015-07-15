-- DATA SCHEMA POSTGRESQL
-- Run this file to set up the data structure.

-- ---
-- Table 'gif_counts'
--
-- ---

USE gifvsgif;

DROP TABLE IF EXISTS `gif_counts`;

CREATE TABLE gif_counts (id SERIAL PRIMARY KEY, gif_type VARCHAR(6), votes INTEGER NULL DEFAULT 0);

INSERT INTO gif_counts (gif_type) VALUES('hard_g');
INSERT INTO gif_counts (gif_type) VALUES('soft_g');

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE users (id SERIAL PRIMARY KEY, github_id INTEGER NULL, github_username VARCHAR(30) DEFAULT NULL, email VARCHAR(70) NULL DEFAULT NULL, hasVoted INT NULL DEFAULT 0);



-- DATA SCHEMA MYSQL
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
  `github_id` INTEGER NULL,
  `github_username` VARCHAR(30) DEFAULT NULL,
  `email` VARCHAR(70) NULL DEFAULT NULL,
  `hasVoted` INT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);