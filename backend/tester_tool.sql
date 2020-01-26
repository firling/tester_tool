-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 26 jan. 2020 à 22:24
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tester_tool`
--

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `rank_id` int(11) NOT NULL DEFAULT '9',
  `is_admin` int(11) NOT NULL DEFAULT '0',
  `banned` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `rank_id`, `is_admin`, `banned`) VALUES
(1, 'Yamette', 'affba3cf4572414c40a4c41372895afd8841b383', 40, 1, 0),
(6, 'Alcedo', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 0, 0),
(5, 'Magicguard', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 1, 0),
(7, 'Shizeria', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 0, 0),
(8, 'Frucht', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 0, 0),
(9, 'Adun', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 0, 0),
(10, 'Badw0lf', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 40, 0, 0),
(11, 'Tempa', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 1, 0),
(12, 'Aspheric', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 0, 0),
(13, 'Chariot', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 0, 0),
(14, 'Eldir', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 0, 0),
(15, 'Jireon', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 0, 0),
(16, 'Elwans', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 30, 0, 0),
(17, 'Cames', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 50, 1, 0),
(18, 'Walrosskastanie', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 50, 1, 0),
(19, 'Gorem', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(20, 'Dopxmine', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(21, 'WhiteBaron', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(22, 'Firekeeper', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(23, 'Maisa', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(24, 'Gouda', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(25, 'IceClover', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `title`, `message`, `user_id`, `created_at`) VALUES
(1, 'test', 'testest', 1, '2020-01-26 13:06:06'),
(2, 'kyurem quest ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit pharetra lobortis. In vel iaculis nulla, ac euismod est. Donec ullamcorper, libero quis placerat pellentesque, ligula tellus dignissim mi, id laoreet ipsum est et odio. Nunc fringilla risus euismod gravida bibendum. Suspendisse quis urna luctus, tristique mi et, efficitur nisi. Pellentesque eu mi eget metus elementum bibendum. Integer consequat blandit iaculis. Vivamus et justo et justo accumsan congue. Fusce fringilla commodo consequat. Proin imperdiet sodales lacinia. Nunc vel velit et felis aliquam semper. Praesent at molestie velit. Nulla venenatis leo sit amet viverra commodo. Phasellus a nisl volutpat nisi volutpat imperdiet. Fusce turpis ligula, pharetra vel ex id, pharetra efficitur augue. Integer sodales blandit maximus.', 1, '2020-01-26 13:06:06'),
(3, 'zizi', 'qdfqdfvq sdfvqd qdfqsdf qdf qsdf qsd fqsdf \nzizi', 1, '2020-01-26 15:35:04');

-- --------------------------------------------------------

--
-- Structure de la table `rank`
--

DROP TABLE IF EXISTS `rank`;
CREATE TABLE IF NOT EXISTS `rank` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rank`
--

INSERT INTO `rank` (`id`, `name`) VALUES
(9, 'Tester App'),
(10, 'Tester'),
(19, 'Spawn Editor App'),
(20, 'Spawn Editor'),
(29, 'Mapper App'),
(30, 'Mapper'),
(39, 'Scripter App'),
(40, 'Scripter'),
(50, 'Developer');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
