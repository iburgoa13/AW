-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-01-2021 a las 19:34:34
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
(1, '¿Cual es la diferencia entre position: relative, position: absolute y position: fixed?', 'Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página. Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página.', 1, 0, 0, 1, '2021-01-13'),
(2, '¿Cómo funciona exactamente nth-child?', 'No acabo de comprender muy bien que hace exactamente y qué usos prácticos puede tener.', 1, 0, 0, 2, '2021-01-13'),
(3, 'Diferencias entre == y === (comparaciones en JavaScript)', 'Siempre he visto que en JavaScript hay:\r\n\r\nasignaciones =\r\ncomparaciones == y ===\r\nCreo entender que == hace algo parecido a comparar el valor de la variable y el === también compara el tipo (como un equals de java).\r\n', 0, 0, 0, 3, '2021-01-13'),
(4, 'Problema con asincronismo en Node', 'Soy nueva en Node... Tengo una modulo que conecta a una BD de postgres por medio de pg-node. En eso no tengo problemas. Mi problema es que al llamar a ese modulo, desde otro modulo, y despues querer usar los datos que salieron de la BD me dice undefined... Estoy casi seguro que es porque la conexion a la BD devuelve una promesa, y los datos no estan disponibles al momento de usarlos.', 0, 0, 0, 4, '2021-01-13'),
(5, '¿Qué es la inyección SQL y cómo puedo evitarla?', 'He encontrado bastantes preguntas en StackOverflow sobre programas o formularios web que guardan información en una base de datos (especialmente en PHP y MySQL) y que contienen graves problemas de seguridad relacionados principalmente con la inyección SQL.\r\n\r\nNormalmente dejo un comentario y/o un enlace a una referencia externa, pero un comentario no da mucho espacio para mucho y sería positivo que hubiera una referencia interna en SOes sobre el tema así que decidí escribir esta pregunta.\r\n', 0, 0, 0, 5, '2021-01-13');

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
(1, 2),
(1, 3),
(2, 2),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(5, 8);

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
(1, 'La propiedad position sirve para posicionar un elemento dentro de la página. Sin embargo, dependiendo de cual sea la propiedad que usemos, el elemento tomará una referencia u otra para posicionarse respecto a ella.\r\n\r\nLos posibles valores que puede adoptar la propiedad position son: static | relative | absolute | fixed | inherit | initial.\r\n', 0, 0, 1, 5, '2021-01-13'),
(2, 'La pseudoclase :nth-child() selecciona los hermanos que cumplan cierta condición definida en la fórmula an + b. a y b deben ser números enteros, n es un contador. El grupo an representa un ciclo, cada cuantos elementos se repite; b indica desde donde empezamos a contar.', 0, 0, 2, 6, '2021-01-13');

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
('9ZY5PyiEOo67u8w9tYlv7medHMPcsO4S', 1610568156, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"iker@ucm.es\"}'),
('OvS14wPClMhEpjkpFm4FdhhnAOEp2flf', 1610649245, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"lucas@404.es\"}');

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
(1, 'dedede'),
(2, 'css'),
(3, 'css3'),
(4, 'html'),
(5, 'JavaScript'),
(6, 'nodejs'),
(7, 'mysql'),
(8, 'sql');

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
(1, 'nico@404.es', '12345678', 'Nico', '1610560579358.png', '2021-01-13', 1, 1, 0),
(2, 'roberto@404.es', '12345678', 'Roberto', '1610560802828.png', '2021-01-13', 1, 1, 0),
(3, 'sfg@404.es', '12345678', 'SFG', '1610561802558.png', '2021-01-13', 1, 1, 0),
(4, 'marta@404.es', '12345678', 'Marta', '1610561834591.png', '2021-01-13', 1, 1, 0),
(5, 'lucas@404.es', '12345678', 'Lucas', NULL, '2021-01-13', 1, 1, 1),
(6, 'emy@404.es', '12345678', 'Emy', '1610561910740.png', '2021-01-13', 1, 0, 1);

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
(5, 1, '2021-01-13'),
(6, 2, '2021-01-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vote_question_user`
--

CREATE TABLE `vote_question_user` (
  `id_user` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
