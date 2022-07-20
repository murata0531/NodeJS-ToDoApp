CREATE SCHEMA `todoapp` DEFAULT CHARACTER SET utf8mb4 ;

USE todoapp;

-- 組織テーブル
CREATE TABLE `todoapp`.`t_organization` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `organization_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY email(email)
)DEFAULT CHARACTER SET utf8mb4;

-- ユーザテーブル
CREATE TABLE `todoapp`.`t_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY(`id`),
  UNIQUE KEY email (email)
)DEFAULT CHARACTER SET utf8mb4;

-- ユーザ管理テーブル
CREATE TABLE `todoapp`.`t_user_management` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `organization_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY fk_user(`user_id`) REFERENCES t_user(`id`) ON DELETE CASCADE,
  FOREIGN KEY fk_organization(`organization_id`) REFERENCES t_organization(`id`) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4;

-- カテゴリテーブル
CREATE TABLE `todoapp`.`m_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
)DEFAULT CHARACTER SET utf8mb4;

-- タスクテーブル
CREATE TABLE `todoapp`.`t_task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `task_name` VARCHAR(255) NOT NULL,
  `deadline` TIMESTAMP NULL,
  `task_status` INT(10) NOT NULL DEFAULT 3,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY fk_category(`category_id`) REFERENCES m_category(`id`) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4;

-- タスク管理テーブル
CREATE TABLE `todoapp`.`t_task_management` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_management_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY fk_user_management(`user_management_id`) REFERENCES t_user_management(`id`) ON DELETE CASCADE,
  FOREIGN KEY fk_taskt(`task_id`) REFERENCES t_task(`id`) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4;

-- カテゴリ項目の追加
INSERT INTO `todoapp`.`m_category` (`category_name`) VALUES ('生活');
INSERT INTO `todoapp`.`m_category` (`category_name`) VALUES ('勉強');
INSERT INTO `todoapp`.`m_category` (`category_name`) VALUES ('仕事');
INSERT INTO `todoapp`.`m_category` (`category_name`) VALUES ('趣味');

-- todoappデータベース内のすべてのテーブルを削除するsqlを出力してくれる(テーブルが増える場合などに便利)
SELECT CONCAT(
	'DROP TABLE ', GROUP_CONCAT(
		CONCAT('`',table_name,'`')
	),';'
) AS statement FROM information_schema.tables 
WHERE table_schema = 'todoapp' AND table_name LIKE '%';

-- 今回のテーブル構成だと↑のsqlの出力結果は以下の通り
DROP TABLE `m_category`,`t_organization`,`t_task`,`t_task_management`,`t_user`,`t_user_management`;