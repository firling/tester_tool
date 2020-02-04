-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 04 fév. 2020 à 14:47
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

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
  `rank_id` int(11) NOT NULL DEFAULT 9,
  `is_admin` int(11) NOT NULL DEFAULT 0,
  `banned` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

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
(26, 'Gorem', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(20, 'Dopxmine', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(21, 'WhiteBaron', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(22, 'Firekeeper', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(23, 'Maisa', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(24, 'Gouda', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(25, 'IceClover', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 10, 0, 0),
(19, 'Nikola', '07313f0e320f22cbfa35cfc220508eb3ff457c7e', 50, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `to_x` varchar(30) NOT NULL DEFAULT 'TO BE TESTED',
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `title`, `message`, `to_x`, `user_id`, `created_at`) VALUES
(2, 'Au DD', 'la marche dema qsdf au dd', 'TO BE TESTED', 1, '2020-01-26 13:06:06'),
(7, 'test url', 'http://localhost:3000/myposts', 'TO BE TESTED', 1, '2020-01-31 20:19:11'),
(6, 'me tooooooooo', 'I don\'t like you.', 'TO SCRIPTERS', 1, '2020-01-29 19:59:47');

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

-- --------------------------------------------------------

--
-- Structure de la table `sub_com`
--

DROP TABLE IF EXISTS `sub_com`;
CREATE TABLE IF NOT EXISTS `sub_com` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `com` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sub_com`
--

INSERT INTO `sub_com` (`id`, `user_id`, `post_id`, `com`, `created_at`) VALUES
(2, 1, 7, 'Me tooooooooooo', '2020-02-04 15:44:59'),
(3, 1, 7, 'AYAYAYAYAYAYAYAYA', '2020-02-04 15:44:59');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
