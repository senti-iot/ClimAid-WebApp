CREATE TABLE `buildings` (
  `buildingId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latlong` varchar(255) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `usage` json DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`buildingId`),
  UNIQUE KEY `id` (`buildingId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `roomdevices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `roomUuid` char(36) NOT NULL,
  `device` char(36) NOT NULL,
  `position` varchar(20) NOT NULL,
  `gauges` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `rooms` (
  `roomId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) DEFAULT NULL,
  `buildingId` bigint unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bounds` json DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
