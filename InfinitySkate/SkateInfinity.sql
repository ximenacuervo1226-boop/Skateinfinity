-- SkateInfinity - base de datos compatible con la web
DROP DATABASE IF EXISTS skateinfinity;
CREATE DATABASE skateinfinity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE skateinfinity;

CREATE TABLE usuarios (
  id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  usuario VARCHAR(30) NOT NULL UNIQUE,
  correo VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(20) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('cliente','admin') NOT NULL DEFAULT 'cliente',
  bio VARCHAR(500) NOT NULL DEFAULT '',
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id_categoria INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (1,'camisas','Camisetas y camisas de estilo urbano.');
INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (2,'buzos','Buzos y prendas superiores de estilo urbano.');
INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (3,'pantalones','Pantalones de corte urbano y streetwear.');
INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (4,'chaquetas','Chaquetas para complementar el estilo urbano.');
INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (5,'zapatos','Calzado de estilo skate y urbano.');
INSERT INTO categorias (id_categoria,nombre,descripcion) VALUES (6,'gorras','Gorras y gorros para complementar tu outfit.');

CREATE TABLE productos (
  id_producto INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_categoria INT UNSIGNED NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL,
  descuento_porcentaje DECIMAL(5,2) NOT NULL DEFAULT 0,
  imagen_url VARCHAR(1000) NOT NULL,
  disponible TINYINT(1) NOT NULL DEFAULT 1,
  fecha_creacion DATE NOT NULL,
  CONSTRAINT fk_productos_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
) ENGINE=InnoDB;

INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (1,1,'Camiseta Gráfica','Camiseta urbana de estilo gráfico.',79900,0,'https://i.pinimg.com/736x/1e/69/30/1e6930ea8f652498a9beeaedf1bc8e76.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (2,3,'Pantalón Tribal','Pantalón de estilo urbano con diseño tribal.',119900,0,'https://i.pinimg.com/control1/1200x/66/43/2b/66432bb6f242a8b39c7a7a554d233d91.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (3,4,'Chaqueta Llamas','Chaqueta urbana con diseño de llamas.',179900,0,'https://i.pinimg.com/736x/ac/ff/04/acff04966ccc2fcfdb30a8a9a04782b3.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (4,6,'Gorra Urbana','Gorra urbana de estilo casual.',59900,0,'https://i.pinimg.com/control1/1200x/e8/fb/2c/e8fb2cc16a62851d64bd2931f8ccf02b.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (5,2,'Buzo Longsleeve','Buzo longsleeve de estilo urbano.',64900,50,'https://i.pinimg.com/736x/02/27/42/0227422e8ba6c1dd4d8cd49e6f560393.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (6,1,'Camiseta Jersey 89','Camiseta jersey de estilo deportivo urbano.',27900,65,'https://i.pinimg.com/736x/41/e5/53/41e553efd59806ad489c05dedf120a51.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (7,5,'Zapatillas Skate','Zapatillas para estilo skate y uso diario.',54900,75,'https://i.pinimg.com/control1/736x/05/cf/6a/05cf6ab0a10844860b12d42c97c837b8.jpg',1,'2026-09-04');
INSERT INTO productos (id_producto,id_categoria,nombre,descripcion,precio_base,descuento_porcentaje,imagen_url,disponible,fecha_creacion) VALUES (8,6,'Gorro Beanie Cruz','Gorro beanie con diseño urbano.',26900,55,'https://i.pinimg.com/1200x/a2/d1/45/a2d145ae56becb9a21c29532e21dc637.jpg',1,'2026-09-04');

CREATE TABLE variantes_productos (
  id_variante INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_producto INT UNSIGNED NOT NULL,
  talla VARCHAR(10) NOT NULL,
  color VARCHAR(30) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  sku VARCHAR(50) NOT NULL UNIQUE,
  UNIQUE KEY uq_variante (id_producto,talla,color),
  CONSTRAINT fk_variantes_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
) ENGINE=InnoDB;

INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (1,1,'S','Negro',10,'SK8-01-0001');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (2,1,'S','Blanco',10,'SK8-01-0002');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (3,1,'S','Gris',10,'SK8-01-0003');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (4,1,'S','Rojo',10,'SK8-01-0004');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (5,1,'S','Azul',10,'SK8-01-0005');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (6,1,'S','Verde',10,'SK8-01-0006');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (7,1,'M','Negro',10,'SK8-01-0007');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (8,1,'M','Blanco',10,'SK8-01-0008');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (9,1,'M','Gris',10,'SK8-01-0009');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (10,1,'M','Rojo',10,'SK8-01-0010');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (11,1,'M','Azul',10,'SK8-01-0011');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (12,1,'M','Verde',10,'SK8-01-0012');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (13,1,'L','Negro',10,'SK8-01-0013');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (14,1,'L','Blanco',10,'SK8-01-0014');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (15,1,'L','Gris',10,'SK8-01-0015');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (16,1,'L','Rojo',10,'SK8-01-0016');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (17,1,'L','Azul',10,'SK8-01-0017');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (18,1,'L','Verde',10,'SK8-01-0018');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (19,1,'XL','Negro',10,'SK8-01-0019');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (20,1,'XL','Blanco',10,'SK8-01-0020');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (21,1,'XL','Gris',10,'SK8-01-0021');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (22,1,'XL','Rojo',10,'SK8-01-0022');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (23,1,'XL','Azul',10,'SK8-01-0023');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (24,1,'XL','Verde',10,'SK8-01-0024');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (25,2,'28','Negro',10,'SK8-02-0025');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (26,2,'28','Blanco',10,'SK8-02-0026');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (27,2,'28','Gris',10,'SK8-02-0027');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (28,2,'28','Rojo',10,'SK8-02-0028');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (29,2,'28','Azul',10,'SK8-02-0029');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (30,2,'28','Verde',10,'SK8-02-0030');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (31,2,'30','Negro',10,'SK8-02-0031');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (32,2,'30','Blanco',10,'SK8-02-0032');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (33,2,'30','Gris',10,'SK8-02-0033');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (34,2,'30','Rojo',10,'SK8-02-0034');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (35,2,'30','Azul',10,'SK8-02-0035');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (36,2,'30','Verde',10,'SK8-02-0036');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (37,2,'32','Negro',10,'SK8-02-0037');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (38,2,'32','Blanco',10,'SK8-02-0038');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (39,2,'32','Gris',10,'SK8-02-0039');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (40,2,'32','Rojo',10,'SK8-02-0040');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (41,2,'32','Azul',10,'SK8-02-0041');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (42,2,'32','Verde',10,'SK8-02-0042');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (43,2,'34','Negro',10,'SK8-02-0043');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (44,2,'34','Blanco',10,'SK8-02-0044');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (45,2,'34','Gris',10,'SK8-02-0045');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (46,2,'34','Rojo',10,'SK8-02-0046');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (47,2,'34','Azul',10,'SK8-02-0047');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (48,2,'34','Verde',10,'SK8-02-0048');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (49,2,'36','Negro',10,'SK8-02-0049');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (50,2,'36','Blanco',10,'SK8-02-0050');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (51,2,'36','Gris',10,'SK8-02-0051');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (52,2,'36','Rojo',10,'SK8-02-0052');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (53,2,'36','Azul',10,'SK8-02-0053');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (54,2,'36','Verde',10,'SK8-02-0054');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (55,3,'S','Negro',10,'SK8-03-0055');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (56,3,'S','Blanco',10,'SK8-03-0056');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (57,3,'S','Gris',10,'SK8-03-0057');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (58,3,'S','Rojo',10,'SK8-03-0058');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (59,3,'S','Azul',10,'SK8-03-0059');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (60,3,'S','Verde',10,'SK8-03-0060');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (61,3,'M','Negro',10,'SK8-03-0061');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (62,3,'M','Blanco',10,'SK8-03-0062');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (63,3,'M','Gris',10,'SK8-03-0063');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (64,3,'M','Rojo',10,'SK8-03-0064');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (65,3,'M','Azul',10,'SK8-03-0065');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (66,3,'M','Verde',10,'SK8-03-0066');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (67,3,'L','Negro',10,'SK8-03-0067');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (68,3,'L','Blanco',10,'SK8-03-0068');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (69,3,'L','Gris',10,'SK8-03-0069');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (70,3,'L','Rojo',10,'SK8-03-0070');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (71,3,'L','Azul',10,'SK8-03-0071');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (72,3,'L','Verde',10,'SK8-03-0072');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (73,3,'XL','Negro',10,'SK8-03-0073');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (74,3,'XL','Blanco',10,'SK8-03-0074');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (75,3,'XL','Gris',10,'SK8-03-0075');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (76,3,'XL','Rojo',10,'SK8-03-0076');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (77,3,'XL','Azul',10,'SK8-03-0077');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (78,3,'XL','Verde',10,'SK8-03-0078');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (79,4,'Única','Negro',10,'SK8-04-0079');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (80,4,'Única','Blanco',10,'SK8-04-0080');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (81,4,'Única','Gris',10,'SK8-04-0081');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (82,4,'Única','Rojo',10,'SK8-04-0082');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (83,4,'Única','Azul',10,'SK8-04-0083');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (84,4,'Única','Verde',10,'SK8-04-0084');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (85,5,'S','Negro',10,'SK8-05-0085');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (86,5,'S','Blanco',10,'SK8-05-0086');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (87,5,'S','Gris',10,'SK8-05-0087');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (88,5,'S','Rojo',10,'SK8-05-0088');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (89,5,'S','Azul',10,'SK8-05-0089');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (90,5,'S','Verde',10,'SK8-05-0090');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (91,5,'M','Negro',10,'SK8-05-0091');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (92,5,'M','Blanco',10,'SK8-05-0092');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (93,5,'M','Gris',10,'SK8-05-0093');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (94,5,'M','Rojo',10,'SK8-05-0094');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (95,5,'M','Azul',10,'SK8-05-0095');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (96,5,'M','Verde',10,'SK8-05-0096');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (97,5,'L','Negro',10,'SK8-05-0097');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (98,5,'L','Blanco',10,'SK8-05-0098');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (99,5,'L','Gris',10,'SK8-05-0099');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (100,5,'L','Rojo',10,'SK8-05-0100');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (101,5,'L','Azul',10,'SK8-05-0101');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (102,5,'L','Verde',10,'SK8-05-0102');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (103,5,'XL','Negro',10,'SK8-05-0103');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (104,5,'XL','Blanco',10,'SK8-05-0104');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (105,5,'XL','Gris',10,'SK8-05-0105');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (106,5,'XL','Rojo',10,'SK8-05-0106');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (107,5,'XL','Azul',10,'SK8-05-0107');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (108,5,'XL','Verde',10,'SK8-05-0108');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (109,6,'S','Negro',10,'SK8-06-0109');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (110,6,'S','Blanco',10,'SK8-06-0110');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (111,6,'S','Gris',10,'SK8-06-0111');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (112,6,'S','Rojo',10,'SK8-06-0112');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (113,6,'S','Azul',10,'SK8-06-0113');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (114,6,'S','Verde',10,'SK8-06-0114');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (115,6,'M','Negro',10,'SK8-06-0115');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (116,6,'M','Blanco',10,'SK8-06-0116');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (117,6,'M','Gris',10,'SK8-06-0117');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (118,6,'M','Rojo',10,'SK8-06-0118');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (119,6,'M','Azul',10,'SK8-06-0119');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (120,6,'M','Verde',10,'SK8-06-0120');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (121,6,'L','Negro',10,'SK8-06-0121');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (122,6,'L','Blanco',10,'SK8-06-0122');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (123,6,'L','Gris',10,'SK8-06-0123');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (124,6,'L','Rojo',10,'SK8-06-0124');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (125,6,'L','Azul',10,'SK8-06-0125');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (126,6,'L','Verde',10,'SK8-06-0126');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (127,6,'XL','Negro',10,'SK8-06-0127');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (128,6,'XL','Blanco',10,'SK8-06-0128');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (129,6,'XL','Gris',10,'SK8-06-0129');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (130,6,'XL','Rojo',10,'SK8-06-0130');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (131,6,'XL','Azul',10,'SK8-06-0131');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (132,6,'XL','Verde',10,'SK8-06-0132');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (133,7,'38','Negro',10,'SK8-07-0133');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (134,7,'38','Blanco',10,'SK8-07-0134');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (135,7,'38','Gris',10,'SK8-07-0135');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (136,7,'38','Rojo',10,'SK8-07-0136');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (137,7,'38','Azul',10,'SK8-07-0137');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (138,7,'38','Verde',10,'SK8-07-0138');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (139,7,'39','Negro',10,'SK8-07-0139');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (140,7,'39','Blanco',10,'SK8-07-0140');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (141,7,'39','Gris',10,'SK8-07-0141');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (142,7,'39','Rojo',10,'SK8-07-0142');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (143,7,'39','Azul',10,'SK8-07-0143');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (144,7,'39','Verde',10,'SK8-07-0144');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (145,7,'40','Negro',10,'SK8-07-0145');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (146,7,'40','Blanco',10,'SK8-07-0146');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (147,7,'40','Gris',10,'SK8-07-0147');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (148,7,'40','Rojo',10,'SK8-07-0148');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (149,7,'40','Azul',10,'SK8-07-0149');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (150,7,'40','Verde',10,'SK8-07-0150');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (151,7,'41','Negro',10,'SK8-07-0151');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (152,7,'41','Blanco',10,'SK8-07-0152');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (153,7,'41','Gris',10,'SK8-07-0153');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (154,7,'41','Rojo',10,'SK8-07-0154');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (155,7,'41','Azul',10,'SK8-07-0155');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (156,7,'41','Verde',10,'SK8-07-0156');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (157,7,'42','Negro',10,'SK8-07-0157');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (158,7,'42','Blanco',10,'SK8-07-0158');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (159,7,'42','Gris',10,'SK8-07-0159');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (160,7,'42','Rojo',10,'SK8-07-0160');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (161,7,'42','Azul',10,'SK8-07-0161');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (162,7,'42','Verde',10,'SK8-07-0162');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (163,7,'43','Negro',10,'SK8-07-0163');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (164,7,'43','Blanco',10,'SK8-07-0164');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (165,7,'43','Gris',10,'SK8-07-0165');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (166,7,'43','Rojo',10,'SK8-07-0166');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (167,7,'43','Azul',10,'SK8-07-0167');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (168,7,'43','Verde',10,'SK8-07-0168');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (169,8,'Única','Negro',10,'SK8-08-0169');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (170,8,'Única','Blanco',10,'SK8-08-0170');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (171,8,'Única','Gris',10,'SK8-08-0171');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (172,8,'Única','Rojo',10,'SK8-08-0172');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (173,8,'Única','Azul',10,'SK8-08-0173');
INSERT INTO variantes_productos (id_variante,id_producto,talla,color,stock,sku) VALUES (174,8,'Única','Verde',10,'SK8-08-0174');

CREATE TABLE carrito (
  id_carrito INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT UNSIGNED NOT NULL UNIQUE,
  fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_carrito_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE items_carrito (
  id_item_carrito INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_carrito INT UNSIGNED NOT NULL,
  id_variante INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  UNIQUE KEY uq_item (id_carrito,id_variante),
  CONSTRAINT fk_item_carrito FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE,
  CONSTRAINT fk_item_variante FOREIGN KEY (id_variante) REFERENCES variantes_productos(id_variante)
) ENGINE=InnoDB;

CREATE TABLE pedidos (
  id_pedido INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT UNSIGNED NOT NULL,
  fecha_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pago_total DECIMAL(10,2) NOT NULL,
  descuento DECIMAL(10,2) NOT NULL DEFAULT 0,
  estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
  direccion_envio VARCHAR(255) NOT NULL,
  CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE detalle_pedidos (
  id_detalle INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT UNSIGNED NOT NULL,
  id_variante INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_variante FOREIGN KEY (id_variante) REFERENCES variantes_productos(id_variante)
) ENGINE=InnoDB;

CREATE TABLE pagos (
  id_pago INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT UNSIGNED NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
  estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
  fecha_pago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pago_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE
) ENGINE=InnoDB;

