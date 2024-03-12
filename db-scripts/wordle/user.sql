CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `GUID` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `emailId` varchar(45) NOT NULL,
  `password` varchar(256) NOT NULL,
  `createdOn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GUID_UNIQUE` (`GUID`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci