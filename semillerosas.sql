-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2021 at 09:34 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `semillerosas`
--

-- --------------------------------------------------------

--
-- Table structure for table `modelo`
--

CREATE TABLE `modelo` (
  `id_modelo` int(5) UNSIGNED NOT NULL,
  `nom_modelo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modelo`
--

INSERT INTO `modelo` (`id_modelo`, `nom_modelo`) VALUES
(1, 2019),
(2, 2013),
(3, 2016),
(4, 2010),
(5, 2020),
(6, 2018),
(7, 2009),
(8, 2007),
(9, 2017),
(10, 2015),
(11, 2014);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_linea`
--

CREATE TABLE `tipo_linea` (
  `id_linea` int(5) UNSIGNED NOT NULL,
  `desc_linea` varchar(255) DEFAULT NULL,
  `id_marca` int(5) UNSIGNED DEFAULT NULL,
  `activo` enum('S','N') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipo_linea`
--

INSERT INTO `tipo_linea` (`id_linea`, `desc_linea`, `id_marca`, `activo`) VALUES
(1, 'Transporte', 2, 'S'),
(2, 'Carga', 6, 'S'),
(3, 'Embalaje', 4, 'S'),
(4, 'Embalaje', 6, 'S'),
(5, 'Empleados', 1, 'S'),
(6, 'Transporte', 2, 'S'),
(7, 'Embalaje', 2, 'S'),
(8, 'Embalaje', 1, 'N'),
(9, 'Transporte', 2, 'N'),
(10, 'Carga', 6, 'N'),
(11, 'Envio', 1, 'N'),
(12, 'Envio', 3, 'N'),
(13, 'Empleados', 1, 'N'),
(14, 'Envio', 1, 'S'),
(15, 'Embalaje', 5, 'N'),
(16, 'Transporte', 5, 'S'),
(17, 'Carga', 2, 'S'),
(18, 'Carga', 3, 'S'),
(19, 'Carga', 1, 'S'),
(20, 'Envio', 1, 'S');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_marca`
--

CREATE TABLE `tipo_marca` (
  `id_marca` int(5) UNSIGNED NOT NULL,
  `desc_marca` varchar(255) DEFAULT NULL,
  `activo` enum('S','N') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipo_marca`
--

INSERT INTO `tipo_marca` (`id_marca`, `desc_marca`, `activo`) VALUES
(1, 'BMW', 'S'),
(2, 'Lexus', 'N'),
(3, 'Renault', 'S'),
(4, 'Ford', 'S'),
(5, 'Opel', 'S'),
(6, 'Seat', 'S');

-- --------------------------------------------------------

--
-- Table structure for table `vehiculos`
--

CREATE TABLE `vehiculos` (
  `nro_placa` varchar(10) NOT NULL,
  `id_linea` int(5) UNSIGNED DEFAULT NULL,
  `modelo` int(5) UNSIGNED DEFAULT NULL,
  `fecha_ven_seguro` date DEFAULT NULL,
  `fecha_ven_tecnomecanica` date DEFAULT NULL,
  `fecha_ven_contratodo` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehiculos`
--

INSERT INTO `vehiculos` (`nro_placa`, `id_linea`, `modelo`, `fecha_ven_seguro`, `fecha_ven_tecnomecanica`, `fecha_ven_contratodo`) VALUES
('0408 NBX', 2, 10, '2022-01-03', '2021-06-29', '2022-09-10'),
('0608 NTA', 20, 2, '2021-12-05', '2021-08-29', '2022-07-01'),
('0723 FCY', 3, 10, '2021-06-20', '2021-05-07', '2022-04-12'),
('0727 NSQ', 15, 6, '2022-01-28', '2021-11-07', '2022-07-02'),
('0871 KAI', 7, 11, '2022-02-03', '2021-11-21', '2022-03-29'),
('0897 VNX', 3, 2, '2021-03-01', '2021-11-04', '2022-09-29'),
('1172 APB', 16, 2, '2022-02-11', '2021-08-21', '2022-12-03'),
('1189 DPL', 2, 6, '2021-02-03', '2021-03-06', '2021-10-12'),
('1976 WDN', 13, 7, '2021-08-16', '2021-08-20', '2022-04-03'),
('2152 ABU', 3, 3, '2021-01-29', '2021-03-25', '2022-04-20'),
('2374 ZXO', 11, 5, '2022-02-11', '2021-11-17', '2022-09-20'),
('2382 VWC', 17, 3, '2021-12-02', '2021-08-08', '2022-04-01'),
('2957 LLE', 13, 8, '2021-12-02', '2021-04-29', '2022-01-29'),
('3269 EBZ', 16, 9, '2022-12-20', '2021-07-20', '2023-10-29'),
('3587 XSW', 1, 1, '2021-07-09', '2021-03-15', '2022-03-29'),
('3945 QGY', 14, 4, '2022-02-10', '2021-07-09', '2022-04-13'),
('4488 BBX', 13, 7, '2023-01-01', '2021-08-01', '2022-06-18'),
('4898 DMT', 17, 6, '2021-11-14', '2021-05-13', '2022-02-20'),
('5057 XPL', 19, 11, '2021-11-23', '2021-08-05', '2023-03-14'),
('5516 JZK', 5, 6, '2022-04-01', '2021-04-17', '2022-06-25'),
('5549 ZZR', 12, 5, '2022-10-22', '2021-08-11', '2022-09-29'),
('6284 GDA', 9, 5, '2021-09-27', '2021-05-19', '2022-03-29'),
('6856 VKS', 18, 2, '2021-12-24', '2021-10-11', '2022-07-09'),
('6895 YTO', 7, 10, '2021-09-02', '2021-07-10', '2022-01-28'),
('6922 QOE', 14, 1, '2021-02-12', '2021-07-11', '2022-04-15'),
('7521 ELL', 13, 4, '2021-11-29', '2021-06-16', '2022-09-04'),
('7957 AVG', 6, 5, '2021-11-09', '2021-09-16', '2023-10-06'),
('7961 EAL', 5, 3, '2021-10-04', '2021-06-01', '2023-12-20'),
('8852 KBO', 9, 1, '2022-01-07', '2021-02-19', '2021-10-19'),
('9581 EJQ', 17, 7, '2022-01-16', '2021-04-26', '2021-09-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id_modelo`);

--
-- Indexes for table `tipo_linea`
--
ALTER TABLE `tipo_linea`
  ADD PRIMARY KEY (`id_linea`),
  ADD KEY `fk_tipo_marca_tipo_linea` (`id_marca`);

--
-- Indexes for table `tipo_marca`
--
ALTER TABLE `tipo_marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indexes for table `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`nro_placa`),
  ADD KEY `fk_tipo_linea_vehiculos` (`id_linea`),
  ADD KEY `fk_modelo_vehiculos` (`modelo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id_modelo` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tipo_linea`
--
ALTER TABLE `tipo_linea`
  MODIFY `id_linea` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tipo_marca`
--
ALTER TABLE `tipo_marca`
  MODIFY `id_marca` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tipo_linea`
--
ALTER TABLE `tipo_linea`
  ADD CONSTRAINT `fk_tipo_marca_tipo_linea` FOREIGN KEY (`id_marca`) REFERENCES `tipo_marca` (`id_marca`) ON UPDATE CASCADE;

--
-- Constraints for table `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_modelo_vehiculos` FOREIGN KEY (`modelo`) REFERENCES `modelo` (`id_modelo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tipo_linea_vehiculos` FOREIGN KEY (`id_linea`) REFERENCES `tipo_linea` (`id_linea`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
