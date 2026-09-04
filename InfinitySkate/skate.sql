-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2026 a las 21:42:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skate`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(9) NOT NULL,
  `id_usuario` int(9) NOT NULL,
  `fecha_actualizacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripción` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `descripción`) VALUES
(1, 'Camisas', 'Camisetas y camisas de corte holgado y estilo aesthetic'),
(2, 'Pantalones', 'Pantalones estilo cargo, wide leg y streetwear'),
(3, 'Accesorios', 'Gorras, beanies y complementos urbanos'),
(4, 'Calzado', 'Tenis y zapatos chunky de estilo retro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(9) NOT NULL,
  `id_pedido` int(9) NOT NULL,
  `id_variante` int(9) NOT NULL,
  `cantidad` int(100) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_carrito`
--

CREATE TABLE `items_carrito` (
  `id_item_carrito` int(9) NOT NULL,
  `id_carrito` int(9) NOT NULL,
  `id_variante` int(9) NOT NULL,
  `cantidad` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(9) NOT NULL,
  `id_pedido` int(9) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `fecha_pago` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(9) NOT NULL,
  `id_usuario` int(9) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `pago_total` decimal(10,2) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `dirección_envío` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripción` varchar(100) NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `imagen_url` varchar(999) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_categoria`, `nombre`, `descripción`, `precio_base`, `imagen_url`, `fecha_creacion`) VALUES
(1, 1, 'Camiseta Oversize Vintage', 'Camisa de algodón con corte ancho y estampado washed', 85000.00, 'http://ejemplo.com/camisa_oversize.jpg', '2026-08-20'),
(2, 2, 'Pantalón Cargo Wide Leg', 'Pantalón holgado con múltiples bolsillos laterales', 140000.00, 'http://ejemplo.com/pantalon_cargo.jpg', '2026-08-20'),
(3, 3, 'Gorra Minimalist Dad Hat', 'Gorra con bordado discreto de tono neutro y visera curva', 45000.00, 'http://ejemplo.com/gorra_aesthetic.jpg', '2026-08-20'),
(4, 1, 'Camisa de Botones Aesthetic', 'Camisa manga corta con estampado abstracto de corte fluido', 95000.00, 'http://ejemplo.com/camisa_botones.jpg', '2026-08-20'),
(5, 4, 'Zapatos Chunky Sneakers', 'Tenis de suela gruesa y silueta retro urbana', 220000.00, 'http://ejemplo.com/zapatos_chunky.jpg', '2026-08-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `usuario` varchar(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `contraseña` varchar(9) NOT NULL,
  `rol` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes_productos`
--

CREATE TABLE `variantes_productos` (
  `id_variante` int(9) NOT NULL,
  `id_producto` int(9) NOT NULL,
  `talla` int(100) NOT NULL,
  `color` varchar(50) NOT NULL,
  `stock` int(100) NOT NULL,
  `sku` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_variante` (`id_variante`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD PRIMARY KEY (`id_item_carrito`),
  ADD KEY `id_carrito` (`id_carrito`),
  ADD KEY `id_variante` (`id_variante`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `variantes_productos`
--
ALTER TABLE `variantes_productos`
  ADD PRIMARY KEY (`id_variante`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_variante`) REFERENCES `variantes_productos` (`id_variante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD CONSTRAINT `items_carrito_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `items_carrito_ibfk_2` FOREIGN KEY (`id_variante`) REFERENCES `variantes_productos` (`id_variante`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `variantes_productos`
--
ALTER TABLE `variantes_productos`
  ADD CONSTRAINT `variantes_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
