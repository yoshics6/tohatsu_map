-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 03:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tohatsu`
--

-- --------------------------------------------------------

--
-- Table structure for table `find_dealer`
--

CREATE TABLE `find_dealer` (
  `fd_id` int(11) NOT NULL,
  `fd_code` text NOT NULL,
  `fd_dealer` text NOT NULL,
  `fd_shop` text NOT NULL,
  `fd_busines_type` text NOT NULL,
  `fd_province` text NOT NULL,
  `fd_address` text NOT NULL,
  `fd_road` text NOT NULL,
  `fd_subdistrict` text NOT NULL,
  `fd_district` text NOT NULL,
  `fd_zipcode` text NOT NULL,
  `fd_tel` text NOT NULL,
  `fd_latitude` text NOT NULL,
  `fd_longitude` text NOT NULL,
  `fd_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `find_dealer`
--

INSERT INTO `find_dealer` (`fd_id`, `fd_code`, `fd_dealer`, `fd_shop`, `fd_busines_type`, `fd_province`, `fd_address`, `fd_road`, `fd_subdistrict`, `fd_district`, `fd_zipcode`, `fd_tel`, `fd_latitude`, `fd_longitude`, `fd_created_at`) VALUES
(6, '1001', 'Alliance DFW Boating Center, Inc.', 'Alliance DFW Boating Center, Inc.', 'Sales & Service', 'Texas ', '801', 'Crosby St.', '-', 'Roanoke', 'TX 76262', '817-430-1883', '33.005033', '-97.226713', '2023-10-24 12:03:32'),
(7, '1002', 'La Vida Starships', 'La Vida Starships', 'Service Only', 'Texas ', '1792', 'N Stemmons Fwy', '-', 'Lewisville', 'TX 75067', '972-221-3000', '33.069471', '-97.017023', '2023-10-24 12:03:32'),
(8, '1004', 'Carey and Sons Marine LLC', 'Carey and Sons Marine LLC', 'Sales & Service', 'Texas ', '108', 'Gateway Hills Ln', '-', 'Granbury', 'TX 76049', '817-326-6478', '32.475711', '-97.696689', '2023-10-24 12:03:32'),
(9, '1005', 'Tim\'s Marine Service, Inc.', 'Tim\'s Marine Service, Inc.', 'Sales & Service', 'Texas ', '701', 'Spanish Trail', '-', 'Granbury', 'TX 76048', '817-279-1656', '32.418897', '-97.789195', '2023-10-24 12:03:32'),
(10, '1003', 'Rockwall Marine', 'Rockwall Marine', 'Package Only', 'Texas ', '2315', 'Hwy 276', '-', 'Rockwall', 'TX 75032', '972-771-4442', '32.90691', '-96.413837', '2023-10-24 12:03:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `find_dealer`
--
ALTER TABLE `find_dealer`
  ADD PRIMARY KEY (`fd_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `find_dealer`
--
ALTER TABLE `find_dealer`
  MODIFY `fd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
