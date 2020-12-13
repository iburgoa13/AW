-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2020 a las 12:31:00
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
  `id_user` int(11) NOT NULL,
  `date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `question`
--

INSERT INTO `question` (`id`, `title`, `body`, `counter_visit`, `counter_vote`, `id_user`, `date`) VALUES
(16, 'TITULO DE PRUEBA', 'ESTO ES UNA PRUEBA PARA VER SI FUNCIONA', 0, 2, 1, '2020-12-09'),
(37, 'FUNCIONA PLS', 'ESTO ES UNA PRUEBA ', 0, 0, 1, '2020-12-13'),
(38, 'OLE OLE ', 'BLABLBALBLALBALBALLABLBLABALBALBLA', 0, 0, 1, '2020-12-15');

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
(16, 57),
(16, 58),
(16, 59);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `response`
--

CREATE TABLE `response` (
  `id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `counter_vote` int(11) NOT NULL DEFAULT 0,
  `id_question` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `response`
--

INSERT INTO `response` (`id`, `message`, `counter_vote`, `id_question`, `id_user`, `date`) VALUES
(1, 'esto no es asi ', 0, 37, 14, '2020-12-08'),
(2, 'aaaamigo', 0, 37, 14, '2020-12-23'),
(3, 'dededed', 0, 38, 14, '2020-12-23');

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
(57, 'AW'),
(58, 'PRUEBA'),
(59, 'AMONOS');

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
(1, 1, 37, '2020-12-14'),
(1, 1, 38, '2020-12-17');

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
(14, 8, 1, '2020-12-26'),
(14, 8, 2, '2020-12-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(25) NOT NULL,
  `name` varchar(50) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `reputation` int(11) NOT NULL DEFAULT 0,
  `publicate_questions` int(11) NOT NULL DEFAULT 0,
  `publicate_response` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `password`, `name`, `imagen`, `date`, `reputation`, `publicate_questions`, `publicate_response`) VALUES
(1, 'usuario@prueba.com', '123456', 'AK97', 'imgidji9j393', '0000-00-00', 16, 0, 0),
(3, 'usuario2@prueba.com', '654321', 'LIBROFUERTE88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(4, 'usuario3@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(5, 'usuario4@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(6, 'usuario4555@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '2020-11-30', 0, 0, 0),
(7, 'usuario455sss5@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '1906-06-12', 0, 0, 0),
(8, 'usuariowsws@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(9, 'usuariossswsws@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(10, 'usuarisossswsws@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(11, 'usuarisosssssssswsws@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '0000-00-00', 0, 0, 0),
(12, 'prueba@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '2020-12-31', 0, 0, 0),
(13, 'pruesba@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '2020-11-30', 0, 0, 0),
(14, 'pruesbsa@prueba.com', '65s4321', 'LIBROFUERTE_88', 'deiudhefuerhfnfu', '2020-12-06', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visit_question_user`
--

CREATE TABLE `visit_question_user` (
  `id_user` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(3, 16, '2020-12-09'),
(5, 16, '2020-12-09'),
(7, 16, '2020-12-09'),
(8, 16, '2020-12-09');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
