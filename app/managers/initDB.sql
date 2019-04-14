CREATE DATABASE IF NOT EXISTS folders_and_files_tree;
use folders_and_files_tree;

CREATE TABLE IF NOT EXISTS folders_path_table (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `folder_path` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY(`folder_path`(50)))
  ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS file_name_table (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_name` VARCHAR(256) NOT NULL,
  `folder_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY(`file_name`(50)))
  ENGINE = InnoDB DEFAULT CHARSET=utf8;
