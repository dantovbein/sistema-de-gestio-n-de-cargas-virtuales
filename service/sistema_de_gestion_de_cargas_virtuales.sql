-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 09, 2015 at 01:43 AM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sistema_de_gestion_de_cargas_virtuales`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `ADMIN_USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ADMIN_USER_NAME` varchar(255) NOT NULL,
  `ADMIN_USER_PASSWORD` varchar(255) NOT NULL,
  `ADMIN_USER_IS_ACTIVE` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ADMIN_USER_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ADMIN_USER_ID`, `ADMIN_USER_NAME`, `ADMIN_USER_PASSWORD`, `ADMIN_USER_IS_ACTIVE`) VALUES
(1, 'sistema', 'inicial2015', 1);

-- --------------------------------------------------------

--
-- Table structure for table `archivos_subidos`
--

CREATE TABLE IF NOT EXISTS `archivos_subidos` (
  `ARCHIVO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ARCHIVO_NOMBRE` varchar(255) NOT NULL,
  `ARCHIVO_FECHA_CREACION` date NOT NULL,
  `ARCHIVO_FECHA_SINCRONIZACION` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ARCHIVO_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `archivos_subidos`
--


-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `ID_CLIENTE` int(11) NOT NULL,
  `ID_CLIENTE_BIS` int(11) NOT NULL,
  `CLIENTE` varchar(255) NOT NULL,
  `CLIENTE_COMISION` varchar(255) NOT NULL DEFAULT '0.00',
  `CLIENTE_ZONA` varchar(255) NOT NULL DEFAULT '',
  `CLIENTE_STATUS` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clientes`
--


-- --------------------------------------------------------

--
-- Table structure for table `transacciones`
--

CREATE TABLE IF NOT EXISTS `transacciones` (
  `ID_TRX` int(11) NOT NULL AUTO_INCREMENT,
  `ARCHIVO_ID` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `ID_CLIENTE` int(11) NOT NULL,
  `ID_CLIENTE_BIS` int(11) NOT NULL,
  `CLIENTE` varchar(255) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `USUARIO` varchar(255) NOT NULL,
  `ID_PRODUCTO` int(11) NOT NULL,
  `PRODUCTO` varchar(255) NOT NULL,
  `CARTEL` int(11) NOT NULL,
  `IMPORTE` varchar(255) NOT NULL,
  `CANTIDAD_TRXS` int(11) NOT NULL,
  `TRX_PROMEDIO` varchar(255) NOT NULL,
  `ID_TERMINAL` int(11) NOT NULL,
  `TERMINAL` varchar(255) NOT NULL,
  `MODELO_DE_TERMINAL` varchar(255) NOT NULL,
  `TIPO_TRX` varchar(255) NOT NULL,
  `ESTADO` varchar(255) NOT NULL,
  `ID_LOTE` int(11) NOT NULL,
  `IDENTIFICACION_TERMINAL` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_TRX`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `transacciones`
--

