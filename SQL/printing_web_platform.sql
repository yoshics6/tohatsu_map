-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2023 at 03:34 PM
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
-- Database: `printing_web_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `cale_id` int(11) NOT NULL,
  `cale_type` varchar(255) NOT NULL,
  `cale_finished_size` text NOT NULL,
  `cale_page` text NOT NULL,
  `cale_paper` text NOT NULL,
  `cale_printing` text NOT NULL,
  `cale_stand` varchar(255) NOT NULL,
  `cale_binding` varchar(255) NOT NULL,
  `cale_o_ring_color` varchar(25) NOT NULL,
  `cale_100` float NOT NULL,
  `cale_200` float NOT NULL,
  `cale_300` float NOT NULL,
  `cale_400` float NOT NULL,
  `cale_500` float NOT NULL,
  `cale_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`cale_id`, `cale_type`, `cale_finished_size`, `cale_page`, `cale_paper`, `cale_printing`, `cale_stand`, `cale_binding`, `cale_o_ring_color`, `cale_100`, `cale_200`, `cale_300`, `cale_400`, `cale_500`, `cale_created_at`) VALUES
(1, 'Calendar', '6\" x 8\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 126.03, 109.59, 95.89, 94.52, 93.15, '2023-08-08 09:02:16'),
(2, 'Calendar', '5\" x 7\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 126.03, 109.59, 95.89, 94.52, 93.15, '2023-08-08 09:02:16'),
(3, 'Calendar', '5\" x 7\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 126.03, 109.59, 95.89, 94.52, 93.15, '2023-08-08 09:02:16'),
(4, 'Calendar', '5\" x 7\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 124.66, 108.22, 94.52, 93.15, 91.78, '2023-08-08 09:02:16'),
(5, 'Calendar', '5\" x 7\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 124.66, 108.22, 94.52, 93.15, 91.78, '2023-08-08 09:02:16'),
(6, 'Calendar', '5\" x 7\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 150.68, 134.25, 120.55, 117.81, 116.44, '2023-08-08 09:02:16'),
(7, 'Calendar', '5\" x 7\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 150.68, 134.25, 120.55, 117.81, 116.44, '2023-08-08 09:02:16'),
(8, 'Calendar', '6\" x 8\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 124.66, 108.22, 94.52, 93.15, 91.78, '2023-08-08 09:02:16'),
(9, 'Calendar', '5\" x 7\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 147.95, 132.88, 119.18, 116.44, 115.07, '2023-08-08 09:02:16'),
(10, 'Calendar', '5\" x 7\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 147.95, 132.88, 119.18, 116.44, 115.07, '2023-08-08 09:02:16'),
(11, 'Calendar', '6\" x 8\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 126.03, 109.59, 95.89, 94.52, 93.15, '2023-08-08 09:02:16'),
(12, 'Calendar', '6\" x 8\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 124.66, 108.22, 94.52, 93.15, 91.78, '2023-08-08 09:02:16'),
(13, 'Calendar', '6\" x 8\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 150.68, 134.25, 120.55, 117.81, 116.44, '2023-08-08 09:02:16'),
(14, 'Calendar', '6\" x 8\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 150.68, 134.25, 120.55, 117.81, 116.44, '2023-08-08 09:02:16'),
(15, 'Calendar', '6\" x 8\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 147.95, 132.88, 119.18, 116.44, 115.07, '2023-08-08 09:02:16'),
(16, 'Calendar', '6\" x 8\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 147.95, 132.88, 119.18, 116.44, 115.07, '2023-08-08 09:02:16'),
(17, 'Calendar', '7\" x 10\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 178.08, 157.53, 143.84, 141.1, 138.36, '2023-08-08 09:02:16'),
(18, 'Calendar', '7\" x 10\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 178.08, 157.53, 143.84, 141.1, 138.36, '2023-08-08 09:02:16'),
(19, 'Calendar', '7\" x 10\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 175.34, 156.16, 141.1, 138.36, 135.62, '2023-08-08 09:02:16'),
(20, 'Calendar', '7\" x 10\"', '8 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 175.34, 156.16, 141.1, 138.36, 135.62, '2023-08-08 09:02:16'),
(21, 'Calendar', '7\" x 10\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 246.58, 228.77, 215.07, 212.33, 210.96, '2023-08-08 09:02:16'),
(22, 'Calendar', '7\" x 10\"', '14 Sheet', 'White card 240 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 246.58, 228.77, 215.07, 212.33, 210.96, '2023-08-08 09:02:16'),
(23, 'Calendar', '7\" x 10\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'White', 243.84, 226.03, 210.96, 208.22, 206.85, '2023-08-08 09:02:16'),
(24, 'Calendar', '7\" x 10\"', '14 Sheet', 'Art card 230 g.', '4/4c', 'No print', '4 Wire O ring 2 Position', 'Black', 243.84, 226.03, 210.96, 208.22, 206.85, '2023-08-08 09:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `contact_date` timestamp NULL DEFAULT current_timestamp(),
  `contact_fullname` text NOT NULL,
  `contact_company_name` text NOT NULL,
  `contact_phone_number` text NOT NULL,
  `contact_email` text NOT NULL,
  `contact_detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `contact_date`, `contact_fullname`, `contact_company_name`, `contact_phone_number`, `contact_email`, `contact_detail`) VALUES
(1, '2023-08-10 03:56:54', 'apiwat pothong', 'itp', '089-9859874', 'apiwat.p@itp.co.th', 'testtesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttest');

-- --------------------------------------------------------

--
-- Table structure for table `cover_paper`
--

CREATE TABLE `cover_paper` (
  `cp_id` int(11) NOT NULL,
  `cp_name` varchar(255) NOT NULL,
  `cp_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cover_paper`
--

INSERT INTO `cover_paper` (`cp_id`, `cp_name`, `cp_created_at`) VALUES
(1, 'Art Card 210 gsm', '2023-06-12 05:11:50'),
(2, 'Woodfree 80 gsm', '2023-06-12 05:11:50'),
(3, 'Art Card 190 gsm', '2023-06-12 05:11:50'),
(4, 'Art Card 230 gsm', '2023-06-12 05:11:50'),
(5, 'Woodfree 100 gsm', '2023-06-12 05:11:50'),
(6, 'Woodfree 120 gsm', '2023-06-12 05:11:50'),
(7, 'White Card  120 gsm', '2023-06-12 05:11:50'),
(8, 'White Card 150 gsm', '2023-06-12 05:11:50'),
(9, 'Gloss Art/Matt Art 105 gsm', '2023-06-12 05:11:50'),
(10, 'Gloss Art/Matt Art 128 gsm', '2023-06-12 05:11:50'),
(11, 'Gloss Art/Matt Art 157 gsm', '2023-06-12 05:11:50'),
(12, 'Art Card 260 gsm', '2023-06-12 05:11:50'),
(13, 'Whitecard 150 gsm', '2023-06-12 05:11:50'),
(14, 'Whitecard 210 gsm', '2023-06-12 05:11:50'),
(15, 'Whitecard 240 gsm', '2023-06-12 05:11:50'),
(16, 'Art Card 310 gsm', '2023-06-12 05:11:50'),
(17, 'Art Card 350 gsm', '2023-06-12 05:11:50');

-- --------------------------------------------------------

--
-- Table structure for table `cutting_sheet`
--

CREATE TABLE `cutting_sheet` (
  `cutt_id` int(11) NOT NULL,
  `cutt_type` varchar(255) NOT NULL,
  `cutt_finished_size` text NOT NULL,
  `cutt_page` text NOT NULL,
  `cutt_text_paper` text NOT NULL,
  `cutt_printing` text NOT NULL,
  `cutt_text_coating` text NOT NULL,
  `cutt_500` float NOT NULL,
  `cutt_1000` float NOT NULL,
  `cutt_2000` float NOT NULL,
  `cutt_3000` float NOT NULL,
  `cutt_4000` float NOT NULL,
  `cutt_5000` float NOT NULL,
  `cutt_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cutting_sheet`
--

INSERT INTO `cutting_sheet` (`cutt_id`, `cutt_type`, `cutt_finished_size`, `cutt_page`, `cutt_text_paper`, `cutt_printing`, `cutt_text_coating`, `cutt_500`, `cutt_1000`, `cutt_2000`, `cutt_3000`, `cutt_4000`, `cutt_5000`, `cutt_created_at`) VALUES
(435, 'Cutting Sheet', 'A4', '2', 'Woodfree 80 gsm', '4/4C', 'No coating', 28.72, 14.72, 7.54, 5.15, 3.95, 3.23, '2023-09-04 13:11:18'),
(436, 'Cutting Sheet', 'A5', '2', 'Woodfree 80 gsm', '4/4C', 'No coating', 28.44, 14.38, 7.28, 4.91, 3.93, 3.02, '2023-09-04 13:11:18'),
(437, 'Cutting Sheet', 'A4', '2', 'Art Card 210 gsm', '1/1C', 'No coating', 26.66, 14.57, 7.91, 5.69, 4.58, 3.91, '2023-09-04 13:11:18'),
(438, 'Cutting Sheet', 'A5', '2', 'Whitecard 150 gsm', '4/4C', 'No coating', 31.44, 16.1, 8.27, 5.65, 4.55, 3.56, '2023-09-04 13:11:18'),
(439, 'Cutting Sheet', 'A4', '2', 'Whitecard 150 gsm', '4/4C', 'No coating', 31.68, 16.69, 8.77, 6.13, 4.81, 4.02, '2023-09-04 13:11:18'),
(440, 'Cutting Sheet', 'A4', '2', 'Art Card 210 gsm', '4/4C', 'No coating', 34.02, 18.25, 9.75, 6.91, 5.5, 4.65, '2023-09-04 13:11:18'),
(441, 'Cutting Sheet', 'A4', '2', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 29.77, 15.42, 7.98, 5.5, 4.26, 3.51, '2023-09-04 13:11:18'),
(442, 'Cutting Sheet', 'A4', '2', 'Gloss Art/Matt Art 105 gsm', '1/1C', 'No coating', 22.42, 11.74, 6.14, 4.27, 3.34, 2.78, '2023-09-04 13:11:18'),
(443, 'Cutting Sheet', 'A4', '2', 'Art Card 350 gsm', '1/1C', 'No coating', 34.8, 20, 11.3, 8.4, 6.95, 6.08, '2023-09-04 13:11:18'),
(444, 'Cutting Sheet', 'A4', '2', 'Whitecard 150 gsm', '1/1C', 'No coating', 24.32, 13.01, 6.93, 4.91, 3.89, 3.29, '2023-09-04 13:11:18'),
(445, 'Cutting Sheet', 'A4', '2', 'Woodfree 80 gsm', '1/1C', 'No coating', 21.36, 11.04, 5.7, 3.92, 3.03, 2.5, '2023-09-04 13:11:18'),
(446, 'Cutting Sheet', 'A4', '2', 'Art Card 350 gsm', '4/4C', 'No coating', 42.16, 23.68, 13.14, 9.63, 7.87, 6.82, '2023-09-04 13:11:18'),
(447, 'Cutting Sheet', 'A5', '2', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 29.51, 15, 7.63, 5.18, 4.15, 3.21, '2023-09-04 13:11:18'),
(448, 'Cutting Sheet', 'A5', '2', 'Art Card 210 gsm', '4/4C', 'No coating', 33.82, 17.47, 9.05, 6.24, 5.03, 3.99, '2023-09-04 13:11:18'),
(449, 'Cutting Sheet', 'A5', '2', 'Art Card 350 gsm', '4/4C', 'No coating', 42.1, 22.22, 11.76, 8.27, 6.73, 5.48, '2023-09-04 13:11:18'),
(450, 'Cutting Sheet', 'A5', '2', 'Woodfree 80 gsm', '1/1C', 'No coating', 21.08, 10.7, 5.44, 3.69, 3.01, 2.29, '2023-09-04 13:11:18'),
(451, 'Cutting Sheet', 'A5', '2', 'Whitecard 150 gsm', '1/1C', 'No coating', 24.08, 12.43, 6.43, 4.43, 3.63, 2.83, '2023-09-04 13:11:18'),
(452, 'Cutting Sheet', 'A5', '2', 'Gloss Art/Matt Art 105 gsm', '1/1C', 'No coating', 22.15, 11.32, 5.79, 3.95, 3.23, 2.48, '2023-09-04 13:11:18'),
(453, 'Cutting Sheet', 'A5', '2', 'Art Card 210 gsm', '1/1C', 'No coating', 26.46, 13.79, 7.21, 5.01, 4.11, 3.26, '2023-09-04 13:11:18'),
(454, 'Cutting Sheet', 'A5', '2', 'Art Card 350 gsm', '1/1C', 'No coating', 34.74, 18.54, 9.92, 7.05, 5.81, 4.75, '2023-09-04 13:11:18'),
(455, 'Cutting Sheet', 'B4', '2', 'Woodfree 80 gsm', '4/4C', 'No coating', 29.86, 15.48, 8.01, 5.53, 4.28, 3.54, '2023-09-04 13:11:18'),
(456, 'Cutting Sheet', 'B4', '2', 'Whitecard 150 gsm', '4/4C', 'No coating', 34.14, 18.33, 9.8, 6.95, 5.53, 4.68, '2023-09-04 13:11:18'),
(457, 'Cutting Sheet', 'B4', '2', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 31.32, 16.46, 8.63, 6.01, 4.71, 3.93, '2023-09-04 13:11:18'),
(458, 'Cutting Sheet', 'B4', '2', 'Art Card 210 gsm', '4/4C', 'No coating', 37.61, 20.64, 11.24, 8.11, 6.54, 5.6, '2023-09-04 13:11:18'),
(459, 'Cutting Sheet', 'B4', '2', 'Art Card 350 gsm', '4/4C', 'No coating', 49.67, 28.69, 16.27, 12.13, 10.06, 8.82, '2023-09-04 13:11:18'),
(460, 'Cutting Sheet', 'B4', '2', 'Woodfree 80 gsm', '1/1C', 'No coating', 22.5, 11.8, 6.17, 4.3, 3.36, 2.8, '2023-09-04 13:11:18'),
(461, 'Cutting Sheet', 'B4', '2', 'Whitecard 150 gsm', '1/1C', 'No coating', 23.96, 12.78, 6.79, 4.79, 3.79, 3.19, '2023-09-04 13:11:18'),
(462, 'Cutting Sheet', 'B4', '2', 'Gloss Art/Matt Art 105 gsm', '1/1C', 'No coating', 26.78, 14.65, 7.96, 5.73, 4.61, 3.94, '2023-09-04 13:11:18'),
(463, 'Cutting Sheet', 'B4', '2', 'Art Card 210 gsm', '1/1C', 'No coating', 30.25, 16.97, 9.4, 6.88, 5.62, 4.87, '2023-09-04 13:11:18'),
(464, 'Cutting Sheet', 'B4', '2', 'Art Card 350 gsm', '1/1C', 'No coating', 42.31, 25.01, 14.43, 10.9, 9.14, 8.08, '2023-09-04 13:11:18'),
(465, 'Cutting Sheet', 'B5', '2', 'Woodfree 80 gsm', '4/4C', 'No coating', 29.59, 15.04, 7.66, 5.2, 4.17, 3.23, '2023-09-04 13:11:18'),
(466, 'Cutting Sheet', 'B5', '2', 'Whitecard 150 gsm', '4/4C', 'No coating', 33.95, 17.54, 9.09, 6.27, 5.06, 4.01, '2023-09-04 13:11:18'),
(467, 'Cutting Sheet', 'B5', '2', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 31.08, 15.9, 8.15, 5.56, 4.47, 3.5, '2023-09-04 13:11:18'),
(468, 'Cutting Sheet', 'B5', '2', 'Art Card 210 gsm', '4/4C', 'No coating', 37.47, 19.56, 10.24, 7.14, 5.78, 4.65, '2023-09-04 13:11:18'),
(469, 'Cutting Sheet', 'B5', '2', 'Art Card 350 gsm', '4/4C', 'No coating', 49.73, 26.6, 14.26, 10.15, 8.29, 6.86, '2023-09-04 13:11:18'),
(470, 'Cutting Sheet', 'B5', '2', 'Woodfree 80 gsm', '1/1C', 'No coating', 22.23, 11.36, 5.82, 3.97, 3.25, 2.49, '2023-09-04 13:11:18'),
(471, 'Cutting Sheet', 'B5', '2', 'Whitecard 150 gsm', '1/1C', 'No coating', 26.59, 13.86, 7.25, 5.04, 4.14, 3.28, '2023-09-04 13:11:18'),
(472, 'Cutting Sheet', 'B5', '2', 'Gloss Art/Matt Art 105 gsm', '1/1C', 'No coating', 23.72, 12.22, 6.31, 4.34, 3.55, 2.76, '2023-09-04 13:11:18'),
(473, 'Cutting Sheet', 'B5', '2', 'Art Card 210 gsm', '1/1C', 'No coating', 28.57, 15, 7.9, 5.53, 4.55, 3.64, '2023-09-04 13:11:18'),
(474, 'Cutting Sheet', 'B5', '2', 'Art Card 350 gsm', '1/1C', 'No coating', 42.37, 22.92, 12.42, 8.92, 7.37, 6.13, '2023-09-04 13:11:18');

-- --------------------------------------------------------

--
-- Table structure for table `envelope`
--

CREATE TABLE `envelope` (
  `enve_id` int(11) NOT NULL,
  `enve_type` varchar(255) NOT NULL,
  `enve_finished_size` text NOT NULL,
  `enve_page` text NOT NULL,
  `enve_paper` text NOT NULL,
  `enve_printing` text NOT NULL,
  `enve_coating` varchar(255) NOT NULL,
  `enve_1000` float NOT NULL,
  `enve_2000` float NOT NULL,
  `enve_3000` float NOT NULL,
  `enve_4000` float NOT NULL,
  `enve_5000` float NOT NULL,
  `enve_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `envelope`
--

INSERT INTO `envelope` (`enve_id`, `enve_type`, `enve_finished_size`, `enve_page`, `enve_paper`, `enve_printing`, `enve_coating`, `enve_1000`, `enve_2000`, `enve_3000`, `enve_4000`, `enve_5000`, `enve_created_at`) VALUES
(1, 'Envelope', 'Envelope A4  (9\" x 12.75\")', '1', 'KA paper', '1/0C', 'No coating', 6.16, 4.45, 3.77, 3.42, 3.08, '2023-08-08 09:08:18'),
(2, 'Envelope', 'Envelope A4  (9\" x 12.75\")', '1', 'Woodfree 100 gsm', '1/0C', 'No coating', 6.51, 4.79, 4.11, 3.77, 3.42, '2023-08-08 09:08:18'),
(3, 'Envelope', 'Envelope A4  (9\" x 12.75\")', '1', 'Woodfree 100 gsm', '2/0C', 'No coating', 8.56, 5.96, 5.07, 4.59, 4.25, '2023-08-08 09:08:18'),
(4, 'Envelope', 'Envelope No. 9 (108 x 235 mm.)', '1', 'Woodfree 100 gsm', '1/0C', 'No coating', 3.42, 2.4, 2.05, 1.85, 1.71, '2023-08-08 09:08:18'),
(5, 'Envelope', 'Envelope No. 9 (108 x 235 mm.)', '1', 'Woodfree 100 gsm', '2/0C', 'No coating', 5.14, 3.56, 2.95, 2.6, 2.4, '2023-08-08 09:08:18');

-- --------------------------------------------------------

--
-- Table structure for table `folding`
--

CREATE TABLE `folding` (
  `fold_id` int(11) NOT NULL,
  `fold_type` varchar(255) NOT NULL,
  `fold_finished_size` text NOT NULL,
  `fold_open_size` text NOT NULL,
  `fold_column` text NOT NULL,
  `fold_page` text NOT NULL,
  `fold_text_paper` text NOT NULL,
  `fold_printing` text NOT NULL,
  `fold_text_coating` text NOT NULL,
  `fold_500` float NOT NULL,
  `fold_1000` float NOT NULL,
  `fold_2000` float NOT NULL,
  `fold_3000` float NOT NULL,
  `fold_4000` float NOT NULL,
  `fold_5000` float NOT NULL,
  `fold_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `folding`
--

INSERT INTO `folding` (`fold_id`, `fold_type`, `fold_finished_size`, `fold_open_size`, `fold_column`, `fold_page`, `fold_text_paper`, `fold_printing`, `fold_text_coating`, `fold_500`, `fold_1000`, `fold_2000`, `fold_3000`, `fold_4000`, `fold_5000`, `fold_created_at`) VALUES
(139, 'Folding', 'B5', 'B4', '1 Fold 2 Column', '4', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 31.96, 16.78, 8.79, 6.12, 4.79, 3.99, '2023-09-04 13:10:06'),
(140, 'Folding', 'A5', 'A4', '1 Fold 2 Column', '4', 'Woodfree 80 gsm', '4/4C', 'No coating', 29.36, 15.04, 7.7, 5.26, 4.03, 3.3, '2023-09-04 13:10:06'),
(141, 'Folding', 'A5', 'A4', '1 Fold 2 Column', '4', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 30.41, 15.74, 8.14, 5.61, 4.34, 3.58, '2023-09-04 13:10:06'),
(142, 'Folding', 'A5', 'A3', '2 Fold 4 Column', '8', 'Woodfree 80 gsm', '4/4C', 'No coating', 29.72, 15.4, 8.06, 5.62, 4.39, 3.66, '2023-09-04 13:10:06'),
(143, 'Folding', 'A5', 'A3', '2 Fold 4 Column', '8', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 30.95, 16.28, 8.68, 6.14, 4.87, 4.11, '2023-09-04 13:10:06'),
(144, 'Folding', 'A4', 'A3', '1 Fold 2 Column', '4', 'Woodfree 80 gsm', '4/4C', 'No coating', 29.72, 15.4, 8.06, 5.62, 4.39, 3.66, '2023-09-04 13:10:06'),
(145, 'Folding', 'A4', 'A3', '1 Fold 2 Column', '4', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 30.95, 16.28, 8.68, 6.14, 4.87, 4.11, '2023-09-04 13:10:06'),
(146, 'Folding', 'A4', 'A2', '2 Fold 4 Column', '8', 'Woodfree 80 gsm', '4/4C', 'No coating', 34.31, 18.54, 10.2, 7.41, 6.02, 5.19, '2023-09-04 13:10:06'),
(147, 'Folding', 'B4', 'B3', '1 Fold 2 Column', '4', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 32.76, 17.57, 9.58, 6.92, 5.58, 4.79, '2023-09-04 13:10:06'),
(148, 'Folding', 'B4', 'B2', '2 Fold 4 Column', '8', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 38.96, 21.86, 12.52, 9.41, 7.85, 6.91, '2023-09-04 13:10:06'),
(149, 'Folding', 'B4', 'B2', '2 Fold 4 Column', '8', 'Woodfree 80 gsm', '4/4C', 'No coating', 35.54, 19.42, 10.81, 7.94, 6.51, 5.65, '2023-09-04 13:10:06'),
(150, 'Folding', 'B5', 'B4', '1 Fold 2 Column', '4', 'Woodfree 80 gsm', '4/4C', 'No coating', 30.5, 15.8, 8.17, 5.63, 4.36, 3.6, '2023-09-04 13:10:06'),
(151, 'Folding', 'A4', 'A2', '2 Fold 4 Column', '8', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 35.35, 19.28, 10.71, 7.86, 6.43, 5.57, '2023-09-04 13:10:06'),
(152, 'Folding', 'B5', 'B3', '2 Fold 4 Column', '8', 'Woodfree 80 gsm', '4/4C', 'No coating', 31.37, 31.37, 31.37, 31.37, 31.37, 31.37, '2023-09-04 13:10:06'),
(153, 'Folding', 'B5', 'B3', '2 Fold 4 Column', '8', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 33.08, 33.08, 33.08, 33.08, 33.08, 33.08, '2023-09-04 13:10:06'),
(154, 'Folding', 'B4', 'B3', '1 Fold 2 Column', '4', 'Woodfree 80 gsm', '4/4C', 'No coating', 31.05, 16.35, 8.72, 6.18, 4.91, 4.15, '2023-09-04 13:10:06');

-- --------------------------------------------------------

--
-- Table structure for table `paper_bag`
--

CREATE TABLE `paper_bag` (
  `papb_id` int(11) NOT NULL,
  `papb_type` varchar(255) NOT NULL,
  `papb_finished_size` text NOT NULL,
  `papb_page` text NOT NULL,
  `papb_paper` text NOT NULL,
  `papb_printing` text NOT NULL,
  `papb_coating` varchar(255) NOT NULL,
  `papb_binding` varchar(255) NOT NULL,
  `papb_100` float NOT NULL,
  `papb_200` float NOT NULL,
  `papb_300` float NOT NULL,
  `papb_400` float NOT NULL,
  `papb_500` float NOT NULL,
  `papb_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `paper_bag`
--

INSERT INTO `paper_bag` (`papb_id`, `papb_type`, `papb_finished_size`, `papb_page`, `papb_paper`, `papb_printing`, `papb_coating`, `papb_binding`, `papb_100`, `papb_200`, `papb_300`, `papb_400`, `papb_500`, `papb_created_at`) VALUES
(1, 'Paper Bag', 'W 25 x H 16 x D 12 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 205.48, 119.18, 91.78, 84.93, 71.23, '2023-08-08 09:07:00'),
(2, 'Paper Bag', 'W 25 x H 33 x D 12 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 212.33, 123.29, 95.89, 89.04, 75.34, '2023-08-08 09:07:00'),
(3, 'Paper Bag', 'W 30 x H 40 x  D 9 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 219.18, 130.14, 102.74, 95.89, 82.19, '2023-08-08 09:07:00'),
(4, 'Paper Bag', 'W 35 x H 45 x  D 9 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 221.92, 132.88, 105.48, 98.63, 84.93, '2023-08-08 09:07:00'),
(5, 'Paper Bag', 'W 35 x H 25 x  D 9 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 219.18, 130.14, 102.74, 95.89, 82.19, '2023-08-08 09:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `perfect_binding`
--

CREATE TABLE `perfect_binding` (
  `perf_id` int(11) NOT NULL,
  `perf_type` varchar(255) NOT NULL,
  `perf_finished_size` text NOT NULL,
  `perf_cover` text NOT NULL,
  `perf_text` text NOT NULL,
  `perf_cover_paper` text NOT NULL,
  `perf_text_paper` text NOT NULL,
  `perf_printing` text NOT NULL,
  `perf_cover_coating` text NOT NULL,
  `perf_text_coating` text NOT NULL,
  `perf_500` float NOT NULL,
  `perf_1000` float NOT NULL,
  `perf_2000` float NOT NULL,
  `perf_3000` float NOT NULL,
  `perf_4000` float NOT NULL,
  `perf_5000` float NOT NULL,
  `perf_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `perfect_binding`
--

INSERT INTO `perfect_binding` (`perf_id`, `perf_type`, `perf_finished_size`, `perf_cover`, `perf_text`, `perf_cover_paper`, `perf_text_paper`, `perf_printing`, `perf_cover_coating`, `perf_text_coating`, `perf_500`, `perf_1000`, `perf_2000`, `perf_3000`, `perf_4000`, `perf_5000`, `perf_created_at`) VALUES
(3403, 'Perfect Binding', 'A4', '4', '48', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 223.71, 121.09, 69.79, 52.69, 44.77, 39.52, '2023-09-04 13:09:15'),
(3404, 'Perfect Binding', 'A4', '4', '80', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 331.99, 179.7, 103.56, 78.18, 66.13, 58.38, '2023-09-04 13:09:15'),
(3405, 'Perfect Binding', 'A4', '4', '112', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 439.62, 237.98, 137.17, 103.56, 87.4, 77.19, '2023-09-04 13:09:15'),
(3406, 'Perfect Binding', 'B5', '4', '48', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 208.74, 111.56, 62.97, 46.77, 39.15, 34.19, '2023-09-04 13:09:15'),
(3407, 'Perfect Binding', 'A4', '4', '136', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 524.66, 283.84, 163.43, 123.3, 103.87, 91.7, '2023-09-04 13:09:15'),
(3408, 'Perfect Binding', 'B5', '4', '80', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 310.15, 165.59, 93.3, 69.21, 57.64, 50.31, '2023-09-04 13:09:15'),
(3409, 'Perfect Binding', 'B5', '4', '136', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 490.21, 261.42, 147.02, 108.88, 90.29, 78.76, '2023-09-04 13:09:15'),
(3410, 'Perfect Binding', 'B5', '4', '112', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 410.9, 219.28, 123.47, 91.53, 76.04, 66.36, '2023-09-04 13:09:15');

-- --------------------------------------------------------

--
-- Table structure for table `plastic_file`
--

CREATE TABLE `plastic_file` (
  `plas_id` int(11) NOT NULL,
  `plas_type` varchar(255) NOT NULL,
  `plas_finished_size` text NOT NULL,
  `plas_page` text NOT NULL,
  `plas_paper` text NOT NULL,
  `plas_printing` text NOT NULL,
  `plas_binding` varchar(255) NOT NULL,
  `plas_1000` float NOT NULL,
  `plas_2000` float NOT NULL,
  `plas_3000` float NOT NULL,
  `plas_4000` float NOT NULL,
  `plas_5000` float NOT NULL,
  `plas_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `plastic_file`
--

INSERT INTO `plastic_file` (`plas_id`, `plas_type`, `plas_finished_size`, `plas_page`, `plas_paper`, `plas_printing`, `plas_binding`, `plas_1000`, `plas_2000`, `plas_3000`, `plas_4000`, `plas_5000`, `plas_created_at`) VALUES
(1, 'Plastic File A4', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (Transparent)', '4/0C', 'Die-cut', 31.85, 21.23, 19.52, 17.47, 15.75, '2023-08-08 09:07:38'),
(2, 'Plastic File A4', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (White background)', '5/0C', 'Die-cut', 32.53, 22.26, 20.55, 18.84, 17.12, '2023-08-08 09:07:38'),
(5, 'Plastic File A4', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (White background)', '5/0C', 'Die-cut', 32.53, 22.26, 20.55, 18.84, 17.12, '2023-08-31 08:53:32'),
(6, 'Plastic File A4', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (Transparent)', '4/0C', 'Die-cut', 31.85, 21.23, 19.52, 17.47, 15.75, '2023-08-31 08:53:32');

-- --------------------------------------------------------

--
-- Table structure for table `printing`
--

CREATE TABLE `printing` (
  `printing_id` int(11) NOT NULL,
  `printing_name` varchar(255) NOT NULL,
  `printing_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `printing`
--

INSERT INTO `printing` (`printing_id`, `printing_name`, `printing_created_at`) VALUES
(1, '1/0C', '2023-06-14 07:43:41'),
(2, '1/1C', '2023-06-14 07:43:46'),
(3, '4/0C', '2023-06-14 07:43:52'),
(4, '4/4C', '2023-06-14 07:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `saddle_stitch`
--

CREATE TABLE `saddle_stitch` (
  `sadd_id` int(11) NOT NULL,
  `sadd_type` varchar(255) NOT NULL,
  `sadd_finished_size` text NOT NULL,
  `sadd_cover` text NOT NULL,
  `sadd_text` text NOT NULL,
  `sadd_cover_paper` text NOT NULL,
  `sadd_text_paper` text NOT NULL,
  `sadd_printing` text NOT NULL,
  `sadd_cover_coating` text NOT NULL,
  `sadd_text_coating` text NOT NULL,
  `sadd_500` float NOT NULL,
  `sadd_1000` float NOT NULL,
  `sadd_2000` float NOT NULL,
  `sadd_3000` float NOT NULL,
  `sadd_4000` float NOT NULL,
  `sadd_5000` float NOT NULL,
  `sadd_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `saddle_stitch`
--

INSERT INTO `saddle_stitch` (`sadd_id`, `sadd_type`, `sadd_finished_size`, `sadd_cover`, `sadd_text`, `sadd_cover_paper`, `sadd_text_paper`, `sadd_printing`, `sadd_cover_coating`, `sadd_text_coating`, `sadd_500`, `sadd_1000`, `sadd_2000`, `sadd_3000`, `sadd_4000`, `sadd_5000`, `sadd_created_at`) VALUES
(2678, 'Stitching', 'B5', '4', '4', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 73.63, 38.54, 20.99, 15.14, 12.67, 10.82, '2023-09-04 13:07:32'),
(2679, 'Stitching', 'A4', '4', '4', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 42.02, 22.48, 12.71, 9.46, 7.83, 7.07, '2023-09-04 13:07:32'),
(2680, 'Stitching', 'A4', '4', '4', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 80.66, 42.51, 23.43, 17.08, 14.52, 12.49, '2023-09-04 13:07:32'),
(2681, 'Stitching', 'A4', '4', '12', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 64.32, 34.71, 19.9, 14.96, 12.76, 11.23, '2023-09-04 13:07:32'),
(2682, 'Stitching', 'A4', '4', '12', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 110.26, 58.38, 32.44, 22.37, 20.1, 17.38, '2023-09-04 13:07:32'),
(2683, 'Stitching', 'A4', '4', '20', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 125.22, 66.23, 36.73, 25.47, 22.25, 19.25, '2023-09-04 13:07:32'),
(2684, 'Stitching', 'A4', '4', '36', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 178.09, 94.97, 53.41, 39.56, 32.9, 28.69, '2023-09-04 13:07:32'),
(2685, 'Stitching', 'A4', '4', '20', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 135.12, 71.89, 40.27, 28.3, 25.08, 21.8, '2023-09-04 13:07:32'),
(2686, 'Stitching', 'A4', '4', '36', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 188.95, 101.11, 57.18, 42.54, 35.85, 31.33, '2023-09-04 13:07:32'),
(2687, 'Stitching', 'B5', '4', '4', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 39.79, 21.09, 11.74, 8.62, 7.06, 6.29, '2023-09-04 13:07:32'),
(2688, 'Stitching', 'B5', '4', '12', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 61.54, 32.76, 18.37, 13.57, 11.37, 9.89, '2023-09-04 13:07:32'),
(2689, 'Stitching', 'B5', '4', '12', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 100.46, 52.74, 28.88, 19.87, 17.41, 14.94, '2023-09-04 13:07:32'),
(2690, 'Stitching', 'B5', '4', '20', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 117.43, 61.5, 33.53, 23.15, 19.75, 16.91, '2023-09-04 13:07:32'),
(2691, 'Stitching', 'B5', '4', '20', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 124.76, 65.69, 36.15, 25.25, 21.84, 18.8, '2023-09-04 13:07:32'),
(2692, 'Stitching', 'B5', '4', '36', 'Gloss Art/Matt Art 105 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 166.96, 88.01, 48.54, 35.38, 29, 25.01, '2023-09-04 13:07:32'),
(2693, 'Stitching', 'B5', '4', '36', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 175.25, 92.68, 51.4, 37.63, 31.21, 26.99, '2023-09-04 13:07:32');

-- --------------------------------------------------------

--
-- Table structure for table `sales_calendar`
--

CREATE TABLE `sales_calendar` (
  `sals_cale_id` int(11) NOT NULL,
  `sals_cale_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_cale_fullname` text NOT NULL,
  `sals_cale_company_name` text NOT NULL,
  `sals_cale_tel` text NOT NULL,
  `sals_cale_email` text NOT NULL,
  `sals_cale_doc_type` text NOT NULL,
  `sals_cale_printing_type` text NOT NULL,
  `sals_cale_amount` float NOT NULL,
  `sals_cale_quotation_request` varchar(50) NOT NULL,
  `sals_cale_finished_size` text NOT NULL,
  `sals_cale_page` text NOT NULL,
  `sals_cale_paper` text NOT NULL,
  `sals_cale_printing` text NOT NULL,
  `sals_cale_stand` text NOT NULL,
  `sals_cale_o_ring_color` text NOT NULL,
  `sals_cale_binding` text NOT NULL,
  `sals_cale_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_calendar`
--

INSERT INTO `sales_calendar` (`sals_cale_id`, `sals_cale_date`, `sals_cale_fullname`, `sals_cale_company_name`, `sals_cale_tel`, `sals_cale_email`, `sals_cale_doc_type`, `sals_cale_printing_type`, `sals_cale_amount`, `sals_cale_quotation_request`, `sals_cale_finished_size`, `sals_cale_page`, `sals_cale_paper`, `sals_cale_printing`, `sals_cale_stand`, `sals_cale_o_ring_color`, `sals_cale_binding`, `sals_cale_printing_volume`) VALUES
(1, '2023-08-10 04:00:23', 'apwat yo', 'itp', '0987654321', 'apiwat.p@itp.co.th', 'Calendar', 'Calendar', 109.59, 'Yes', '5\" x 7\"', '8 Sheet', 'White card 240 g.', '4/4c', 'No print', 'Black', '4 Wire O ring 2 Position', 200);

-- --------------------------------------------------------

--
-- Table structure for table `sales_cutting_sheet`
--

CREATE TABLE `sales_cutting_sheet` (
  `sals_cutt_id` int(11) NOT NULL,
  `sals_cutt_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_cutt_fullname` text NOT NULL,
  `sals_cutt_company_name` text NOT NULL,
  `sals_cutt_tel` text NOT NULL,
  `sals_cutt_email` text NOT NULL,
  `sals_cutt_doc_type` text NOT NULL,
  `sals_cutt_printing_type` text NOT NULL,
  `sals_cutt_amount` float NOT NULL,
  `sals_cutt_quotation_request` varchar(50) NOT NULL,
  `sals_cutt_finished_size` text NOT NULL,
  `sals_cutt_page` text NOT NULL,
  `sals_cutt_text_paper` text NOT NULL,
  `sals_cutt_printing` text NOT NULL,
  `sals_cutt_text_coating` text NOT NULL,
  `sals_cutt_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_cutting_sheet`
--

INSERT INTO `sales_cutting_sheet` (`sals_cutt_id`, `sals_cutt_date`, `sals_cutt_fullname`, `sals_cutt_company_name`, `sals_cutt_tel`, `sals_cutt_email`, `sals_cutt_doc_type`, `sals_cutt_printing_type`, `sals_cutt_amount`, `sals_cutt_quotation_request`, `sals_cutt_finished_size`, `sals_cutt_page`, `sals_cutt_text_paper`, `sals_cutt_printing`, `sals_cutt_text_coating`, `sals_cutt_printing_volume`) VALUES
(1, '2023-08-31 04:47:46', '', '', '', '', 'Leaflet', 'Cutting Sheet', 300, 'No', 'B4', '2', 'Woodfree 80 gsm', '1/1C', 'No coating', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_envelope`
--

CREATE TABLE `sales_envelope` (
  `sals_enve_id` int(11) NOT NULL,
  `sals_enve_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_enve_fullname` text NOT NULL,
  `sals_enve_company_name` text NOT NULL,
  `sals_enve_tel` text NOT NULL,
  `sals_enve_email` text NOT NULL,
  `sals_enve_doc_type` text NOT NULL,
  `sals_enve_printing_type` text NOT NULL,
  `sals_enve_amount` float NOT NULL,
  `sals_enve_quotation_request` varchar(50) NOT NULL,
  `sals_enve_finished_size` text NOT NULL,
  `sals_enve_page` text NOT NULL,
  `sals_enve_paper` text NOT NULL,
  `sals_enve_printing` text NOT NULL,
  `sals_enve_coating` text NOT NULL,
  `sals_enve_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_envelope`
--

INSERT INTO `sales_envelope` (`sals_enve_id`, `sals_enve_date`, `sals_enve_fullname`, `sals_enve_company_name`, `sals_enve_tel`, `sals_enve_email`, `sals_enve_doc_type`, `sals_enve_printing_type`, `sals_enve_amount`, `sals_enve_quotation_request`, `sals_enve_finished_size`, `sals_enve_page`, `sals_enve_paper`, `sals_enve_printing`, `sals_enve_coating`, `sals_enve_printing_volume`) VALUES
(1, '2023-08-10 03:57:25', 'apiwat pothong', 'itp', '0899999999', 'apiwat.p@itp.co.th', 'Envelope', 'Envelope', 4.11, 'Yes', 'Envelope A4  (9\" x 12.75\")', '1', 'Woodfree 100 gsm', '1/0C', 'No coating', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_folding`
--

CREATE TABLE `sales_folding` (
  `sals_fold_id` int(11) NOT NULL,
  `sals_fold_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_fold_fullname` text NOT NULL,
  `sals_fold_company_name` text NOT NULL,
  `sals_fold_tel` text NOT NULL,
  `sals_fold_email` text NOT NULL,
  `sals_fold_doc_type` text NOT NULL,
  `sals_fold_printing_type` text NOT NULL,
  `sals_fold_amount` float NOT NULL,
  `sals_fold_quotation_request` varchar(50) NOT NULL,
  `sals_fold_finished_size` text NOT NULL,
  `sals_fold_open_size` text NOT NULL,
  `sals_fold_column` text NOT NULL,
  `sals_fold_page` text NOT NULL,
  `sals_fold_text_paper` text NOT NULL,
  `sals_fold_printing` text NOT NULL,
  `sals_fold_text_coating` text NOT NULL,
  `sals_fold_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_folding`
--

INSERT INTO `sales_folding` (`sals_fold_id`, `sals_fold_date`, `sals_fold_fullname`, `sals_fold_company_name`, `sals_fold_tel`, `sals_fold_email`, `sals_fold_doc_type`, `sals_fold_printing_type`, `sals_fold_amount`, `sals_fold_quotation_request`, `sals_fold_finished_size`, `sals_fold_open_size`, `sals_fold_column`, `sals_fold_page`, `sals_fold_text_paper`, `sals_fold_printing`, `sals_fold_text_coating`, `sals_fold_printing_volume`) VALUES
(1, '2023-08-31 04:47:27', '', '', '', '', 'Manual', 'Folding', 200, 'No', 'A4', 'A2', '2 Fold 4 Column', '8', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_paper_bag`
--

CREATE TABLE `sales_paper_bag` (
  `sals_papb_id` int(11) NOT NULL,
  `sals_papb_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_papb_fullname` text NOT NULL,
  `sals_papb_company_name` text NOT NULL,
  `sals_papb_tel` text NOT NULL,
  `sals_papb_email` text NOT NULL,
  `sals_papb_doc_type` text NOT NULL,
  `sals_papb_printing_type` text NOT NULL,
  `sals_papb_amount` float NOT NULL,
  `sals_papb_quotation_request` varchar(50) NOT NULL,
  `sals_papb_finished_size` text NOT NULL,
  `sals_papb_page` text NOT NULL,
  `sals_papb_paper` text NOT NULL,
  `sals_papb_printing` text NOT NULL,
  `sals_papb_coating` text NOT NULL,
  `sals_papb_binding` text NOT NULL,
  `sals_papb_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_paper_bag`
--

INSERT INTO `sales_paper_bag` (`sals_papb_id`, `sals_papb_date`, `sals_papb_fullname`, `sals_papb_company_name`, `sals_papb_tel`, `sals_papb_email`, `sals_papb_doc_type`, `sals_papb_printing_type`, `sals_papb_amount`, `sals_papb_quotation_request`, `sals_papb_finished_size`, `sals_papb_page`, `sals_papb_paper`, `sals_papb_printing`, `sals_papb_coating`, `sals_papb_binding`, `sals_papb_printing_volume`) VALUES
(1, '2023-08-10 03:59:41', 'apiwat pothong', 'itp', '089-987-9856', 'apiwat.p@itp.co.th', 'Paper Bag', 'Paper Bag', 102.74, 'Yes', 'W 30 x H 40 x  D 9 cm.', '1', 'Art Card 190 gsm', '4/0C', 'PVC', 'White Nylon rope', 300);

-- --------------------------------------------------------

--
-- Table structure for table `sales_perfect_binding`
--

CREATE TABLE `sales_perfect_binding` (
  `sals_perf_id` int(11) NOT NULL,
  `sals_perf_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_perf_fullname` text NOT NULL,
  `sals_perf_company_name` text NOT NULL,
  `sals_perf_tel` text NOT NULL,
  `sals_perf_email` text NOT NULL,
  `sals_perf_doc_type` text NOT NULL,
  `sals_perf_printing_type` text NOT NULL,
  `sals_perf_amount` float NOT NULL,
  `sals_perf_quotation_request` varchar(50) NOT NULL,
  `sals_perf_finished_size` text NOT NULL,
  `sals_perf_cover` text NOT NULL,
  `sals_perf_text` text NOT NULL,
  `sals_perf_cover_paper` text NOT NULL,
  `sals_perf_text_paper` text NOT NULL,
  `sals_perf_printing` text NOT NULL,
  `sals_perf_cover_coating` text NOT NULL,
  `sals_perf_text_coating` text NOT NULL,
  `sals_perf_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_perfect_binding`
--

INSERT INTO `sales_perfect_binding` (`sals_perf_id`, `sals_perf_date`, `sals_perf_fullname`, `sals_perf_company_name`, `sals_perf_tel`, `sals_perf_email`, `sals_perf_doc_type`, `sals_perf_printing_type`, `sals_perf_amount`, `sals_perf_quotation_request`, `sals_perf_finished_size`, `sals_perf_cover`, `sals_perf_text`, `sals_perf_cover_paper`, `sals_perf_text_paper`, `sals_perf_printing`, `sals_perf_cover_coating`, `sals_perf_text_coating`, `sals_perf_printing_volume`) VALUES
(1, '2023-08-31 04:21:09', '', '', '', '', 'Catalog', 'Perfect Binding', 2, 'No', 'B5', '4', '104', 'Gloss Art/Matt Art 157 gsm', 'Gloss Art/Matt Art 157 gsm', '4/4C', 'Varnish', 'Varnish', 1000),
(2, '2023-09-04 13:30:15', 'yo', 'yo', 'yo', 'yo@yo', 'Manual', 'Perfect Binding', 439.62, 'Yes', 'A4', '4', '112', 'Art Card 210 gsm', 'Gloss Art/Matt Art 105 gsm', '4/4C', 'No coating', 'No coating', 500);

-- --------------------------------------------------------

--
-- Table structure for table `sales_plastic_file`
--

CREATE TABLE `sales_plastic_file` (
  `sals_plas_id` int(11) NOT NULL,
  `sals_plas_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_plas_fullname` text NOT NULL,
  `sals_plas_company_name` text NOT NULL,
  `sals_plas_tel` text NOT NULL,
  `sals_plas_email` text NOT NULL,
  `sals_plas_doc_type` text NOT NULL,
  `sals_plas_printing_type` text NOT NULL,
  `sals_plas_amount` float NOT NULL,
  `sals_plas_quotation_request` varchar(50) NOT NULL,
  `sals_plas_finished_size` text NOT NULL,
  `sals_plas_page` text NOT NULL,
  `sals_plas_paper` text NOT NULL,
  `sals_plas_printing` text NOT NULL,
  `sals_plas_binding` text NOT NULL,
  `sals_plas_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_plastic_file`
--

INSERT INTO `sales_plastic_file` (`sals_plas_id`, `sals_plas_date`, `sals_plas_fullname`, `sals_plas_company_name`, `sals_plas_tel`, `sals_plas_email`, `sals_plas_doc_type`, `sals_plas_printing_type`, `sals_plas_amount`, `sals_plas_quotation_request`, `sals_plas_finished_size`, `sals_plas_page`, `sals_plas_paper`, `sals_plas_printing`, `sals_plas_binding`, `sals_plas_printing_volume`) VALUES
(1, '2023-08-10 03:58:56', 'apiwat pothong', 'itp', '0877777777', 'apiwat.p@itp.co.th', 'Plastic File', 'Plastic File', 20.55, 'Yes', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (White background)', '5/0C', 'Die-cut', 3000),
(2, '2023-08-31 09:14:38', 'yo', 'yo', 'yo', 'yo@yo', 'Plastic File', 'Plastic File', 19.52, 'Yes', 'W 22 cm x H 31 cm x Thickness 0.20 mm', '1', 'Clear PP (Transparent)', '4/0C', 'Die-cut', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_saddle_stitch`
--

CREATE TABLE `sales_saddle_stitch` (
  `sals_sadd_id` int(11) NOT NULL,
  `sals_sadd_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_sadd_fullname` text NOT NULL,
  `sals_sadd_company_name` text NOT NULL,
  `sals_sadd_tel` text NOT NULL,
  `sals_sadd_email` text NOT NULL,
  `sals_sadd_doc_type` text NOT NULL,
  `sals_sadd_printing_type` text NOT NULL,
  `sals_sadd_amount` float NOT NULL,
  `sals_sadd_quotation_request` varchar(50) NOT NULL,
  `sals_sadd_finished_size` text NOT NULL,
  `sals_sadd_cover` text NOT NULL,
  `sals_sadd_text` text NOT NULL,
  `sals_sadd_cover_paper` text NOT NULL,
  `sals_sadd_text_paper` text NOT NULL,
  `sals_sadd_printing` text NOT NULL,
  `sals_sadd_cover_coating` text NOT NULL,
  `sals_sadd_text_coating` text NOT NULL,
  `sals_sadd_printing_volume` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_saddle_stitch`
--

INSERT INTO `sales_saddle_stitch` (`sals_sadd_id`, `sals_sadd_date`, `sals_sadd_fullname`, `sals_sadd_company_name`, `sals_sadd_tel`, `sals_sadd_email`, `sals_sadd_doc_type`, `sals_sadd_printing_type`, `sals_sadd_amount`, `sals_sadd_quotation_request`, `sals_sadd_finished_size`, `sals_sadd_cover`, `sals_sadd_text`, `sals_sadd_cover_paper`, `sals_sadd_text_paper`, `sals_sadd_printing`, `sals_sadd_cover_coating`, `sals_sadd_text_coating`, `sals_sadd_printing_volume`) VALUES
(1, '2023-08-10 04:48:48', 'yo', 'itp', '0987656786', 'apiwat.p@itp.co.th', 'Manual', 'Saddel Stitch', 3000, 'Yes', 'B5', '4', '12', 'Woodfree 120 gsm', 'Woodfree 100 gsm', '4/4C', 'No coating', 'No coating', 4000),
(2, '2023-08-31 04:21:53', '', '', '', '', 'Catalog', 'Saddel Stitch', 300, 'No', 'A4', '4', '12', 'Woodfree 120 gsm', 'Woodfree 100 gsm', '4/4C', 'No coating', 'No coating', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_summary`
--

CREATE TABLE `sales_summary` (
  `sals_id` int(11) NOT NULL,
  `sals_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sals_fullname` text NOT NULL,
  `sals_company_name` text NOT NULL,
  `sals_tel` text NOT NULL,
  `sals_email` text NOT NULL,
  `sals_doc_type` text NOT NULL,
  `sals_printing_type` text NOT NULL,
  `sals_amount` float NOT NULL,
  `sals_quotation_request` varchar(50) NOT NULL,
  `sals_send_quotation` varchar(50) NOT NULL,
  `sals_ref_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sales_summary`
--

INSERT INTO `sales_summary` (`sals_id`, `sals_date`, `sals_fullname`, `sals_company_name`, `sals_tel`, `sals_email`, `sals_doc_type`, `sals_printing_type`, `sals_amount`, `sals_quotation_request`, `sals_send_quotation`, `sals_ref_id`) VALUES
(1, '2023-08-10 03:57:25', 'apiwat pothong', 'itp', '0899999999', 'apiwat.p@itp.co.th', 'Envelope', 'Envelope', 4.11, 'Yes', 'Send', 1),
(2, '2023-08-10 03:58:56', 'apiwat pothong', 'itp', '0877777777', 'apiwat.p@itp.co.th', 'Plastic File', 'Plastic File', 20.55, 'Yes', 'Send', 1),
(3, '2023-08-10 03:59:41', 'apiwat pothong', 'itp', '089-987-9856', 'apiwat.p@itp.co.th', 'Paper Bag', 'Paper Bag', 102.74, 'Yes', 'Send', 1),
(4, '2023-08-10 04:00:23', 'apwat yo', 'itp', '0987654321', 'apiwat.p@itp.co.th', 'Calendar', 'Calendar', 109.59, 'Yes', 'Sent', 1),
(5, '2023-08-10 04:48:48', 'yo', 'itp', '0987656786', 'apiwat.p@itp.co.th', 'Manual', 'Saddle Stitch', 3000, 'Yes', 'Send', 1),
(6, '2023-08-31 04:21:09', '', '', '', '', 'Catalog', 'Perfect Binding', 2, 'No', 'Send', 1),
(7, '2023-08-31 04:21:53', '', '', '', '', 'Catalog', 'Saddle Stitch', 300, 'No', 'Send', 2),
(8, '2023-08-31 04:47:27', '', '', '', '', 'Manual', 'Folding', 200, 'No', 'Send', 1),
(9, '2023-08-31 04:47:46', '', '', '', '', 'Leaflet', 'Cutting Sheet', 300, 'No', 'Send', 1),
(10, '2023-08-31 09:14:38', 'yo', 'yo', 'yo', 'yo@yo', 'Plastic File', 'Plastic File', 19.52, 'Yes', 'Sent', 2),
(11, '2023-09-04 13:30:15', 'yo', 'yo', 'yo', 'yo@yo', 'Manual', 'Perfect Binding', 439.62, 'Yes', 'Sent', 2);

-- --------------------------------------------------------

--
-- Table structure for table `text_no`
--

CREATE TABLE `text_no` (
  `text_no_id` int(11) NOT NULL,
  `text_no_name` varchar(255) NOT NULL,
  `text_no_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `text_no`
--

INSERT INTO `text_no` (`text_no_id`, `text_no_name`, `text_no_created_at`) VALUES
(1, '40', '2023-06-13 08:40:05'),
(2, '4', '2023-06-13 08:40:05'),
(3, '44', '2023-06-13 08:40:05'),
(4, '8', '2023-06-13 08:40:05'),
(5, '12', '2023-06-13 08:40:05'),
(6, '16', '2023-06-13 08:40:05'),
(7, '20', '2023-06-13 08:40:05'),
(8, '24', '2023-06-13 08:40:05'),
(9, '28', '2023-06-13 08:40:05'),
(10, '80', '2023-06-13 08:40:05'),
(11, '88', '2023-06-13 08:40:05'),
(12, '32', '2023-06-13 08:40:05'),
(13, '36', '2023-06-13 08:40:05'),
(14, '48', '2023-06-13 08:40:05'),
(15, '52', '2023-06-13 08:40:05'),
(16, '56', '2023-06-13 08:40:05'),
(17, '60', '2023-06-13 08:40:05'),
(18, '64', '2023-06-13 08:40:05'),
(19, '72', '2023-06-13 08:40:05'),
(20, '128', '2023-06-13 08:40:05'),
(21, '96', '2023-06-13 08:40:05'),
(22, '104', '2023-06-13 08:40:05'),
(23, '112', '2023-06-13 08:40:05'),
(24, '120', '2023-06-13 08:40:05'),
(25, '136', '2023-06-13 08:40:05'),
(26, '144', '2023-06-13 08:40:05'),
(27, '152', '2023-06-13 08:40:05'),
(28, '160', '2023-06-13 08:40:05'),
(29, '176', '2023-06-13 08:40:05'),
(30, '184', '2023-06-13 08:40:05'),
(31, '192', '2023-06-13 08:40:05'),
(32, '168', '2023-06-13 08:40:05'),
(33, '200', '2023-06-13 08:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `text_paper`
--

CREATE TABLE `text_paper` (
  `text_id` int(11) NOT NULL,
  `text_name` varchar(255) NOT NULL,
  `text_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `text_paper`
--

INSERT INTO `text_paper` (`text_id`, `text_name`, `text_created_at`) VALUES
(1, 'Woodfree 80 gsm', '2023-06-12 07:32:39'),
(2, 'Woodfree 100 gsm', '2023-06-12 07:32:39'),
(3, 'Woodfree 120 gsm', '2023-06-12 07:32:39'),
(4, 'Gloss Art/Matt Art 105 gsm', '2023-06-12 07:32:39'),
(5, 'Gloss Art/Matt Art 128 gsm', '2023-06-12 07:32:39'),
(6, 'Gloss Art/Matt Art 157 gsm', '2023-06-12 07:32:39'),
(7, 'Art Card 190 gsm', '2023-06-23 03:52:34'),
(8, 'Art Card 210 gsm', '2023-06-23 03:52:51'),
(9, 'Whitecard 150 gsm', '2023-06-23 03:52:58'),
(10, 'Whitecard 210 gsm', '2023-06-23 03:53:04'),
(11, 'Whitecard 240 gsm', '2023-06-23 03:53:11'),
(12, 'Art Card 260 gsm', '2023-06-23 03:53:17'),
(13, 'Art Card 310 gsm', '2023-06-23 03:53:25'),
(14, 'Art Card 350 gsm', '2023-06-23 03:53:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `reset_token` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `fullname` text NOT NULL,
  `tel` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `level` enum('Administrator','User') NOT NULL DEFAULT 'User',
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `reset_token`, `username`, `password`, `fullname`, `tel`, `email`, `level`, `status`, `created_at`) VALUES
(1, 'Mq07B6K0hL4S9ppnnyXH', 'admin', '$2b$12$bkgPnr8sf8J1YQy/BcwxEuQ1eeETvVsu7gxS4GvDZpYPmFhuXIwKO', 'Administrator', '0999999999', 'example@gmail.com', 'Administrator', 'Active', '2023-05-31 08:02:01'),
(2, '859UO4lQ7ZxXzXJqs9ME', 'yo', '$2b$12$aRU3XUQPqpOH/XRfCtsv9uHzHzbKqd4Nk/kpVEO8y49do5lukLbMu', 'apiwat pothong', '0999908876', 'yoshics6@gmail.com', 'User', 'Inactive', '2023-07-04 04:39:49'),
(3, '', 'test', '$2b$12$qguMrtog8.DU1MV0h9EoreXX23TDGYK9NOV6N8uNLFm36ZlYOOFIK', 'test test', '988965687', 'test@gmail.com', 'User', 'Inactive', '2023-07-04 05:56:33'),
(4, '', 'yyyyyyyyyy', '$2b$12$a.ZeOedpJRGPlnl41N806.16lHzBPRctwpLgHDCUxLUHHqCRz56Ou', 'yoshi', 'ddd', 'dd@ddd', 'Administrator', 'Inactive', '2023-07-08 04:54:36'),
(5, '', 'test', '$2b$12$NIZpCgJLRsTmgpmHg4Q5LOYwQTeMO50QSAh4Hi2uBTsLYiVBw3VmK', 'test test', '099-999-9999', 'test@gmail.com', 'User', 'Inactive', '2023-07-08 05:07:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`cale_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `cover_paper`
--
ALTER TABLE `cover_paper`
  ADD PRIMARY KEY (`cp_id`);

--
-- Indexes for table `cutting_sheet`
--
ALTER TABLE `cutting_sheet`
  ADD PRIMARY KEY (`cutt_id`);

--
-- Indexes for table `envelope`
--
ALTER TABLE `envelope`
  ADD PRIMARY KEY (`enve_id`);

--
-- Indexes for table `folding`
--
ALTER TABLE `folding`
  ADD PRIMARY KEY (`fold_id`);

--
-- Indexes for table `paper_bag`
--
ALTER TABLE `paper_bag`
  ADD PRIMARY KEY (`papb_id`);

--
-- Indexes for table `perfect_binding`
--
ALTER TABLE `perfect_binding`
  ADD PRIMARY KEY (`perf_id`);

--
-- Indexes for table `plastic_file`
--
ALTER TABLE `plastic_file`
  ADD PRIMARY KEY (`plas_id`);

--
-- Indexes for table `printing`
--
ALTER TABLE `printing`
  ADD PRIMARY KEY (`printing_id`);

--
-- Indexes for table `saddle_stitch`
--
ALTER TABLE `saddle_stitch`
  ADD PRIMARY KEY (`sadd_id`);

--
-- Indexes for table `sales_calendar`
--
ALTER TABLE `sales_calendar`
  ADD PRIMARY KEY (`sals_cale_id`);

--
-- Indexes for table `sales_cutting_sheet`
--
ALTER TABLE `sales_cutting_sheet`
  ADD PRIMARY KEY (`sals_cutt_id`);

--
-- Indexes for table `sales_envelope`
--
ALTER TABLE `sales_envelope`
  ADD PRIMARY KEY (`sals_enve_id`);

--
-- Indexes for table `sales_folding`
--
ALTER TABLE `sales_folding`
  ADD PRIMARY KEY (`sals_fold_id`);

--
-- Indexes for table `sales_paper_bag`
--
ALTER TABLE `sales_paper_bag`
  ADD PRIMARY KEY (`sals_papb_id`);

--
-- Indexes for table `sales_perfect_binding`
--
ALTER TABLE `sales_perfect_binding`
  ADD PRIMARY KEY (`sals_perf_id`);

--
-- Indexes for table `sales_plastic_file`
--
ALTER TABLE `sales_plastic_file`
  ADD PRIMARY KEY (`sals_plas_id`);

--
-- Indexes for table `sales_saddle_stitch`
--
ALTER TABLE `sales_saddle_stitch`
  ADD PRIMARY KEY (`sals_sadd_id`);

--
-- Indexes for table `sales_summary`
--
ALTER TABLE `sales_summary`
  ADD PRIMARY KEY (`sals_id`);

--
-- Indexes for table `text_no`
--
ALTER TABLE `text_no`
  ADD PRIMARY KEY (`text_no_id`);

--
-- Indexes for table `text_paper`
--
ALTER TABLE `text_paper`
  ADD PRIMARY KEY (`text_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `cale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cover_paper`
--
ALTER TABLE `cover_paper`
  MODIFY `cp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cutting_sheet`
--
ALTER TABLE `cutting_sheet`
  MODIFY `cutt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=475;

--
-- AUTO_INCREMENT for table `envelope`
--
ALTER TABLE `envelope`
  MODIFY `enve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `folding`
--
ALTER TABLE `folding`
  MODIFY `fold_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `paper_bag`
--
ALTER TABLE `paper_bag`
  MODIFY `papb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perfect_binding`
--
ALTER TABLE `perfect_binding`
  MODIFY `perf_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3411;

--
-- AUTO_INCREMENT for table `plastic_file`
--
ALTER TABLE `plastic_file`
  MODIFY `plas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `printing`
--
ALTER TABLE `printing`
  MODIFY `printing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `saddle_stitch`
--
ALTER TABLE `saddle_stitch`
  MODIFY `sadd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2694;

--
-- AUTO_INCREMENT for table `sales_calendar`
--
ALTER TABLE `sales_calendar`
  MODIFY `sals_cale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_cutting_sheet`
--
ALTER TABLE `sales_cutting_sheet`
  MODIFY `sals_cutt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_envelope`
--
ALTER TABLE `sales_envelope`
  MODIFY `sals_enve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_folding`
--
ALTER TABLE `sales_folding`
  MODIFY `sals_fold_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_paper_bag`
--
ALTER TABLE `sales_paper_bag`
  MODIFY `sals_papb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_perfect_binding`
--
ALTER TABLE `sales_perfect_binding`
  MODIFY `sals_perf_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_plastic_file`
--
ALTER TABLE `sales_plastic_file`
  MODIFY `sals_plas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_saddle_stitch`
--
ALTER TABLE `sales_saddle_stitch`
  MODIFY `sals_sadd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_summary`
--
ALTER TABLE `sales_summary`
  MODIFY `sals_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `text_no`
--
ALTER TABLE `text_no`
  MODIFY `text_no_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `text_paper`
--
ALTER TABLE `text_paper`
  MODIFY `text_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
