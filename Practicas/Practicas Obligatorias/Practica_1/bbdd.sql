-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-01-2021 a las 21:46:57
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aplicacione_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medals`
--

CREATE TABLE `medals` (
  `id` int(11) NOT NULL,
  `medal` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `merit` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medals`
--

INSERT INTO `medals` (`id`, `medal`, `name`, `merit`) VALUES
(1, 'BRONCE', 'Estudiante', 'Pregunta con 1 punto'),
(2, 'BRONCE', 'Pregunta interesante', 'Pregunta con 2 puntos'),
(3, 'PLATA', 'Buena pregunta', 'Pregunta con 4 puntos'),
(4, 'ORO', 'Excelente pregunta', 'Pregunta con 6 puntos'),
(5, 'BRONCE', 'Pregunta popular', 'Pregunta con 2 visitas'),
(6, 'PLATA', 'Pregunta destacada', 'Pregunta con 4 visitas'),
(7, 'ORO', 'Pregunta famosa', 'Pregunta con 6 visitas'),
(8, 'BRONCE', 'Respuesta interesante', 'Respuesta con 2 puntos'),
(9, 'PLATA', 'Buena respuesta', 'Respuesta con 4 puntos'),
(10, 'ORO', 'Excelente respuesta', 'Respuesta con 6 puntos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `body` varchar(500) NOT NULL,
  `counter_visit` int(11) NOT NULL DEFAULT 0,
  `counter_vote` int(11) NOT NULL DEFAULT 0,
  `votes` int(11) NOT NULL DEFAULT 0,
  `id_user` int(11) NOT NULL,
  `date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `question`
--

INSERT INTO `question` (`id`, `title`, `body`, `counter_visit`, `counter_vote`, `votes`, `id_user`, `date`) VALUES
(39, 'Titulo de prueba', 'Queremos mostrar la pregunta', 0, 0, 0, 1, '2020-12-25'),
(40, 'esto funciona', 'Queremos comprobar si funciona', 2, 0, 0, 2, '2020-12-26'),
(41, 'Pregunta seria', 'Esto deberia mostrarse', 8, -1, 1, 3, '2021-01-05'),
(42, 'Queremos cosas', 'Vamonos', 10, -1, 1, 3, '2020-12-31'),
(72, 'titulo', 'Esto debe salir', 0, 0, 0, 2, '2020-12-26'),
(73, 'titulo sin tags', 'Esto debe salir', 0, 0, 0, 2, '2020-12-26'),
(74, 'titulocon otros', 'Esto debe salir', 1, 0, 0, 2, '2020-12-26'),
(75, 'sumame una pregunta', 'Esto debe salir', 0, 0, 0, 2, '2020-12-26'),
(76, 'sumame una pregunta', 'Esto debe salir', 0, 0, 0, 2, '2020-12-26'),
(77, 'aaaa', 'sssss', 1, 0, 0, 3, '2020-12-28'),
(78, 'dedede', 'fefeef', 7, 4, 4, 3, '2021-01-08'),
(79, 'Pregunta para Daniela', 'Esto debe salir bien', 83, 0, 0, 2, '2020-12-26'),
(80, 'Pregunta para Daniela', 'Esto debe salir bien', 0, 0, 0, 2, '2020-12-26'),
(82, 'Prueba desde formulario', 'Esto deberia funcionar', 0, 0, 0, 2, '2020-12-27'),
(83, 'Prueba desde formulario con mismos tags en minuscula', 'Estooo es lo que deberia salir en body', 0, 0, 0, 2, '2020-12-27'),
(84, 'eeee', 'dedefef', 0, 0, 0, 2, '2020-12-27'),
(85, 'dedfdsfd', 'ffrfrfsdf', 0, 0, 0, 2, '2020-12-27'),
(86, 'refrfrferf', 'frfef', 0, 0, 0, 2, '2020-12-27'),
(87, 'deefef', 'fefedefe', 0, 0, 0, 2, '2020-12-27'),
(88, 'fsdrwfr', 'ferfre', 0, 0, 0, 2, '2020-12-27'),
(89, 'fsdrwfr', 'ferfre', 0, 0, 0, 2, '2020-12-27'),
(90, 'ferferfrfr', 'ferfrefref', 0, 0, 0, 2, '2020-12-27'),
(91, 'Pruuueba', 'eeeee', 0, 0, 0, 2, '2020-12-27'),
(92, 'dwedwedew', 'dewdwedew', 0, 0, 0, 2, '2020-12-27'),
(93, 'dedewde', 'edwefwfwfc', 0, 0, 0, 2, '2020-12-27'),
(94, 'fewfwefe', 'fefwef', 0, 0, 0, 2, '2020-12-27'),
(95, 'dfsdfdsf', 'fdfsdfds', 0, 0, 0, 2, '2020-12-27'),
(96, 'dwedwedw', 'efwfwefew', 0, 0, 0, 2, '2020-12-27'),
(97, 'few', 'few', 0, 0, 0, 2, '2020-12-27'),
(98, 'few', 'few', 0, 0, 0, 2, '2020-12-27'),
(99, 'dede', 'deded', 1, 0, 0, 2, '2020-12-27'),
(100, 'dede', 'deded', 0, 0, 0, 2, '2020-12-27'),
(101, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(102, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(103, 'ftgtg', 'gtgtg', 1, 0, 0, 2, '2020-12-27'),
(104, 'ftgtg', 'gtgtg', 0, 0, 0, 2, '2020-12-27'),
(105, 'edede', 'deded', 0, 0, 0, 2, '2020-12-27'),
(106, 'edede', 'deded', 0, 0, 0, 2, '2020-12-27'),
(107, 'dede', 'deded', 0, 0, 0, 2, '2020-12-27'),
(108, 'dede', 'deded', 0, 0, 0, 2, '2020-12-27'),
(109, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(110, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(111, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(112, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(113, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(114, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(115, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(116, 'r4r4', 'r4r4', 0, 0, 0, 2, '2020-12-27'),
(117, 'hyhyh', 'hyhyh', 0, 0, 0, 2, '2020-12-27'),
(118, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(119, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(120, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(121, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(122, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(123, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(124, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(125, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(126, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(127, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(128, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(129, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(130, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(131, 'frfr', 'frfrfrf', 0, 0, 0, 2, '2020-12-27'),
(132, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(133, 'deded', 'dede', 0, 0, 0, 2, '2020-12-27'),
(134, 'Prueba', 'jejeje', 1, 0, 0, 2, '2020-12-27'),
(135, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(136, 'frfr', 'frfr', 0, 0, 0, 2, '2020-12-27'),
(137, 'gtg', 'gtgt', 0, 0, 0, 2, '2020-12-27'),
(138, 'dede', 'ded', 0, 0, 0, 2, '2020-12-27'),
(139, 'dede', 'dede', 0, 0, 0, 2, '2020-12-27'),
(140, 'deded', 'deded', 0, 0, 0, 2, '2020-12-27'),
(141, 'Holaa', 'puebas', 0, 0, 0, 2, '2020-12-27'),
(142, 'Peeero bueeeno', 'jejjeje', 0, 0, 0, 2, '2020-12-27'),
(143, 'deded', 'deded', 0, 0, 0, 2, '2020-12-27'),
(144, 'ddededededededededede fferferf', 'freferv erfered ferferf', 0, 0, 0, 2, '2020-12-27'),
(145, 'dededede dcede', 'fedwrf wfrfcr', 0, 0, 0, 2, '2020-12-27'),
(146, 'Daniela ', 'jdejdjed', 0, 0, 0, 2, '2020-12-27'),
(147, 'ssss', 'ssss', 0, 0, 0, 2, '2020-12-27'),
(148, 'dedede', 'dedededede', 0, 0, 0, 2, '2020-12-27'),
(149, 'deded', 'dedede', 0, 0, 0, 2, '2020-12-27'),
(150, 'vevfv', 'efvefvef', 0, 0, 0, 2, '2020-12-27'),
(151, '¿Para qué sirve el 010011001?', 'Ni idea', 3, 0, 0, 2, '2020-12-28'),
(152, 'Pruebaas', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 3, 0, 0, 2, '2020-12-28'),
(153, 'dewdwedewf', 'fewfewdwe', 1, 0, 0, 2, '2020-12-30'),
(154, 'jyuhgvfcd', 'gbthyjnmukjynhtgv', 1, 0, 0, 6, '2020-12-30'),
(155, 'dedwedew', 'dwedwed', 0, 0, 0, 6, '2020-12-30'),
(156, 'fergty', 'gtrfedftgr', 0, 0, 0, 6, '2020-12-30'),
(157, 'fwergrgwr', 'fewfweffrw', 0, 0, 0, 6, '2020-12-30'),
(158, 'ssfdfdff', 'fwfefeefw', 0, 0, 0, 6, '2020-12-30'),
(159, 'dsdasffwerf', 'frerfrfefr', 0, 0, 0, 6, '2020-12-30'),
(160, 'fewfwefwefwef', 'fweffefwefw', 0, 0, 0, 2, '2020-12-31'),
(161, 'Hola Mario', 'Hola yule', 0, 0, 0, 2, '2020-12-31'),
(162, 'yule', 'yule', 0, 0, 0, 2, '2020-12-31'),
(163, 'edwedewdew', 'fwefwedewfwf', 0, 0, 0, 7, '2021-01-01'),
(164, 'esta va encima', 'jejeje', 0, 0, 0, 7, '2021-01-01'),
(165, 'gtrfertg', 'tgrfrtg', 1, 0, 0, 7, '2021-01-01'),
(166, 'li,kmjnhgfvdx', 'kumjnytbgvf', 1, 0, 0, 2, '2021-01-01'),
(167, 'OOOOOLE DANIELA', 'ESTA DEBE SER BUENA', 1, 0, 0, 3, '2021-01-03'),
(168, 'es la pregunta 100', 'olee', 1, 0, 0, 2, '2021-01-03'),
(169, '101', '101', 1, 0, 0, 2, '2021-01-03'),
(170, 'swswswsw', 'swswswsws', 1, 0, 0, 2, '2021-01-03'),
(171, 'dedwedewde', 'dwedwedewd', 1, 0, 0, 2, '2021-01-03'),
(172, '111', '1111', 1, 0, 0, 2, '2021-01-03'),
(173, 'freferfref', 'ferfre', 1, 0, 0, 2, '2021-01-03'),
(174, 'dedwedwd', 'deded', 1, 0, 0, 2, '2021-01-03'),
(175, 'deded', 'dedede', 1, 0, 0, 2, '2021-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `question_tag`
--

CREATE TABLE `question_tag` (
  `id_question` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `question_tag`
--

INSERT INTO `question_tag` (`id_question`, `id_tag`) VALUES
(39, 80),
(40, 80),
(40, 81),
(41, 81),
(72, 101),
(72, 102),
(72, 103),
(74, 101),
(74, 104),
(76, 101),
(76, 104),
(79, 101),
(79, 104),
(79, 105),
(80, 101),
(80, 104),
(80, 105),
(82, 101),
(82, 106),
(83, 101),
(83, 106),
(84, 101),
(84, 106),
(85, 101),
(85, 106),
(86, 101),
(86, 106),
(87, 101),
(87, 106),
(88, 101),
(88, 106),
(89, 101),
(89, 106),
(90, 101),
(90, 106),
(91, 101),
(91, 106),
(92, 101),
(92, 106),
(93, 101),
(93, 106),
(94, 101),
(94, 106),
(95, 107),
(96, 107),
(97, 108),
(98, 108),
(101, 101),
(101, 106),
(102, 108),
(111, 108),
(112, 108),
(113, 108),
(114, 108),
(115, 108),
(116, 108),
(118, 107),
(119, 107),
(120, 107),
(121, 107),
(122, 107),
(136, 108),
(137, 108),
(139, 101),
(139, 106),
(140, 101),
(140, 106),
(142, 107),
(142, 109),
(144, 101),
(144, 106),
(144, 110),
(145, 101),
(145, 106),
(145, 110),
(146, 101),
(146, 106),
(146, 110),
(146, 111),
(149, 101),
(149, 106),
(149, 110),
(150, 101),
(150, 106),
(150, 110),
(150, 112),
(151, 113),
(152, 114),
(153, 80),
(154, 101),
(154, 106),
(156, 101),
(156, 106),
(157, 101),
(157, 106),
(158, 101),
(159, 101),
(159, 115),
(159, 116),
(160, 117),
(161, 115),
(161, 118),
(162, 118),
(163, 119),
(164, 101),
(165, 101),
(166, 120),
(167, 121),
(168, 122),
(169, 123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `response`
--

CREATE TABLE `response` (
  `id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `counter_vote` int(11) NOT NULL DEFAULT 0,
  `votes` int(11) NOT NULL DEFAULT 0,
  `id_question` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `response`
--

INSERT INTO `response` (`id`, `message`, `counter_vote`, `votes`, `id_question`, `id_user`, `date`) VALUES
(4, 'deddfsdfsdfdsfdsf', 1, 9, 78, 2, '2020-12-01'),
(5, 'FDVFDVDFVDFV', -1, 9, 41, 1, '2020-12-17'),
(6, 'grtgfvdfbfgfdgf', 6, 13, 78, 1, '2020-12-26'),
(7, 'ewzrtyuijop', 0, 9, 79, 3, '2020-12-30'),
(8, 'gefgrtgrfvegetge', 2, 9, 79, 4, '2020-12-16'),
(9, 'dewdewdwe', 0, 0, 146, 3, '2020-12-31'),
(10, 'fvvsvsf', 0, 0, 146, 3, '2020-12-30'),
(11, 'verfcdvere', 0, 0, 78, 2, '2020-12-30'),
(12, 'fdfsdferfefdfre', 0, 0, 78, 2, '2020-12-30'),
(13, 'Holi', 1, 1, 42, 2, '2020-12-30'),
(14, 'iuyjhgtf', 0, 0, 41, 2, '2021-01-01'),
(15, 'frfrfr', 0, 0, 166, 2, '2021-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('AcRjAiLHE3cvywMGRmIqRBL9A8BDnTN2', 1609782189, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"daniela@ucm.es\"}'),
('L_XNST4X34vG47HOsArC7d1VPPCD41ia', 1609783122, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"iker@ucm.es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(80, 'Prueba'),
(81, 'GO'),
(82, 'ojo'),
(101, 'hola'),
(102, 'podemos'),
(103, 'letsgo'),
(104, 'uno'),
(105, 'adios'),
(106, 'VAMOS'),
(107, 'peeee'),
(108, 'few'),
(109, 'paa'),
(110, 'enga'),
(111, 'pls'),
(112, 'oe'),
(113, 'lol'),
(114, 'aaa'),
(115, 'mario'),
(116, 'java'),
(117, 'oleee'),
(118, 'yule'),
(119, 'jeje'),
(120, 'lele'),
(121, 'express'),
(122, '100'),
(123, '101');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_medal_question`
--

CREATE TABLE `user_medal_question` (
  `id_user` int(11) NOT NULL,
  `id_medal` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_medal_question`
--

INSERT INTO `user_medal_question` (`id_user`, `id_medal`, `id_question`, `date`) VALUES
(3, 1, 41, '2021-01-30'),
(3, 1, 78, '2021-01-03'),
(3, 2, 78, '2021-01-03'),
(3, 3, 78, '2021-01-03'),
(3, 3, 167, '2021-01-31'),
(3, 5, 78, '2021-01-03'),
(3, 6, 78, '2021-01-03'),
(3, 7, 78, '2021-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_medal_response`
--

CREATE TABLE `user_medal_response` (
  `id_user` int(11) NOT NULL,
  `id_medal` int(11) NOT NULL,
  `id_response` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_medal_response`
--

INSERT INTO `user_medal_response` (`id_user`, `id_medal`, `id_response`, `date`) VALUES
(1, 9, 6, '2021-01-03'),
(1, 10, 6, '2021-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(25) NOT NULL,
  `name` varchar(50) NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `date` date NOT NULL,
  `reputation` int(11) NOT NULL DEFAULT 1,
  `publicate_questions` int(11) NOT NULL DEFAULT 0,
  `publicate_response` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `password`, `name`, `imagen`, `date`, `reputation`, `publicate_questions`, `publicate_response`) VALUES
(1, 'prueba@ucm.es', 'prueba', 'Prueba', NULL, '2020-12-24', 49, 0, 0),
(2, 'iker@ucm.es', 'iker', 'Iker', '1608828702193.jpg', '2020-12-24', 31, 87, 6),
(3, 'daniela@ucm.es', 'daniela', 'Daniela', '1608828735809.jpg', '2020-12-24', 207, 1, 0),
(4, 'ded@ee.com', 'aA_12342', 'e', NULL, '2020-12-25', 47, 0, 0),
(5, 'eee@ooe.com', 'aA123456', 'eeee', NULL, '2020-12-25', 11, 0, 0),
(6, 'mario@blanco.com', '123456789', 'Mario', '1609250113060.jpg', '2020-12-29', 1, 6, 0),
(7, 'pepe@pepe.pepe', '123456789', 'Pipa', NULL, '2021-01-01', 1, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visit_question_user`
--

CREATE TABLE `visit_question_user` (
  `id_user` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `visit_question_user`
--

INSERT INTO `visit_question_user` (`id_user`, `id_question`, `date`) VALUES
(2, 41, '2020-12-29'),
(2, 42, '2020-12-29'),
(2, 74, '2020-12-29'),
(2, 77, '2020-12-30'),
(2, 78, '2021-01-03'),
(2, 99, '2020-12-29'),
(2, 103, '2020-12-29'),
(2, 134, '2020-12-29'),
(2, 151, '2020-12-29'),
(2, 153, '2020-12-31'),
(2, 154, '2020-12-31'),
(2, 165, '2021-01-01'),
(2, 166, '2021-01-01'),
(2, 168, '2021-01-03'),
(2, 169, '2021-01-03'),
(2, 170, '2021-01-03'),
(2, 171, '2021-01-03'),
(2, 172, '2021-01-03'),
(2, 173, '2021-01-03'),
(2, 174, '2021-01-03'),
(2, 175, '2021-01-03'),
(3, 41, '2021-01-03'),
(3, 77, '2020-12-03'),
(3, 78, '2021-01-03'),
(3, 167, '2021-01-03'),
(7, 78, '2021-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vote_question_user`
--

CREATE TABLE `vote_question_user` (
  `id_user` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vote_question_user`
--

INSERT INTO `vote_question_user` (`id_user`, `id_question`, `date`) VALUES
(2, 41, '2020-12-29'),
(2, 42, '2020-12-30'),
(2, 78, '2021-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vote_response_user`
--

CREATE TABLE `vote_response_user` (
  `id_user` int(11) NOT NULL,
  `id_response` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vote_response_user`
--

INSERT INTO `vote_response_user` (`id_user`, `id_response`, `date`) VALUES
(2, 4, '2020-12-29'),
(2, 5, '2020-12-28'),
(2, 6, '2021-01-03'),
(2, 7, '2020-12-28'),
(2, 8, '2020-12-28'),
(2, 13, '2020-12-30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medals`
--
ALTER TABLE `medals`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indices de la tabla `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_RESPONSE` (`id_user`);

--
-- Indices de la tabla `question_tag`
--
ALTER TABLE `question_tag`
  ADD PRIMARY KEY (`id_question`,`id_tag`),
  ADD KEY `FK_T` (`id_tag`,`id_question`) USING BTREE;

--
-- Indices de la tabla `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_QUESTION` (`id_question`),
  ADD KEY `FK_USER` (`id_user`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_medal_question`
--
ALTER TABLE `user_medal_question`
  ADD PRIMARY KEY (`id_user`,`id_medal`,`id_question`),
  ADD KEY `FM_UMQ1` (`id_medal`),
  ADD KEY `FM_UMQ2` (`id_question`);

--
-- Indices de la tabla `user_medal_response`
--
ALTER TABLE `user_medal_response`
  ADD PRIMARY KEY (`id_user`,`id_medal`,`id_response`),
  ADD KEY `FK_UMR1` (`id_medal`),
  ADD KEY `FK_UMR2` (`id_response`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `indice_email` (`email`);

--
-- Indices de la tabla `visit_question_user`
--
ALTER TABLE `visit_question_user`
  ADD PRIMARY KEY (`id_user`,`id_question`),
  ADD KEY `FK_QUESTION_U` (`id_question`);

--
-- Indices de la tabla `vote_question_user`
--
ALTER TABLE `vote_question_user`
  ADD PRIMARY KEY (`id_user`,`id_question`);

--
-- Indices de la tabla `vote_response_user`
--
ALTER TABLE `vote_response_user`
  ADD PRIMARY KEY (`id_user`,`id_response`),
  ADD KEY `FK_RESPONSE_USER` (`id_response`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medals`
--
ALTER TABLE `medals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT de la tabla `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_RESPONSE` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `question_tag`
--
ALTER TABLE `question_tag`
  ADD CONSTRAINT `FK_Q` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_T` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `FK_QUESTION` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_USER` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_medal_question`
--
ALTER TABLE `user_medal_question`
  ADD CONSTRAINT `FK_UMQ` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FM_UMQ1` FOREIGN KEY (`id_medal`) REFERENCES `medals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FM_UMQ2` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`);

--
-- Filtros para la tabla `user_medal_response`
--
ALTER TABLE `user_medal_response`
  ADD CONSTRAINT `FK_UMR` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_UMR1` FOREIGN KEY (`id_medal`) REFERENCES `medals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_UMR2` FOREIGN KEY (`id_response`) REFERENCES `response` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visit_question_user`
--
ALTER TABLE `visit_question_user`
  ADD CONSTRAINT `FK_QUESTION_U` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_USER_Q` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vote_response_user`
--
ALTER TABLE `vote_response_user`
  ADD CONSTRAINT `FK_RESPONSE_USER` FOREIGN KEY (`id_response`) REFERENCES `response` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_USER_RESPONSE` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
