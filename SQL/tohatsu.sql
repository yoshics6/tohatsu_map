-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 03:45 AM
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
-- Table structure for table `contact_broc_req`
--

CREATE TABLE `contact_broc_req` (
  `contact_id` int(11) NOT NULL,
  `contact_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `contact_email` text NOT NULL,
  `contact_first_name` text NOT NULL,
  `contact_last_name` text NOT NULL,
  `contact_address` text NOT NULL,
  `contact_city` text NOT NULL,
  `contact_province` text NOT NULL,
  `contact_postal_code` text NOT NULL,
  `contact_model` text NOT NULL,
  `contact_serial_number` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contact_broc_req`
--

INSERT INTO `contact_broc_req` (`contact_id`, `contact_date`, `contact_email`, `contact_first_name`, `contact_last_name`, `contact_address`, `contact_city`, `contact_province`, `contact_postal_code`, `contact_model`, `contact_serial_number`) VALUES
(1, '2023-11-02 02:03:03', 'test@aa.com', 'yo', 'shi', '585/73', 'บางปู', 'สมุทรปราการ', '10280', 'aaa', 'bbb');

-- --------------------------------------------------------

--
-- Table structure for table `contact_toha_req`
--

CREATE TABLE `contact_toha_req` (
  `contact_id` int(11) NOT NULL,
  `contact_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `contact_email` text NOT NULL,
  `contact_first_name` text NOT NULL,
  `contact_last_name` text NOT NULL,
  `contact_address` text NOT NULL,
  `contact_city` text NOT NULL,
  `contact_province` text NOT NULL,
  `contact_message` text NOT NULL,
  `contact_telephone` text NOT NULL,
  `contact_postal_code` text NOT NULL,
  `contact_model` text NOT NULL,
  `contact_serial_number` text NOT NULL,
  `contact_horsepower` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contact_toha_req`
--

INSERT INTO `contact_toha_req` (`contact_id`, `contact_date`, `contact_email`, `contact_first_name`, `contact_last_name`, `contact_address`, `contact_city`, `contact_province`, `contact_message`, `contact_telephone`, `contact_postal_code`, `contact_model`, `contact_serial_number`, `contact_horsepower`) VALUES
(1, '2023-11-02 02:04:25', 'fff@ff', 'df', 'dfdf', 'dfdfd', 'dfdf', 'ddd', 'fdf', 'ddddd', 'dddd', 'ddddddddddd', 'dddddd', '3333333');

-- --------------------------------------------------------

--
-- Table structure for table `contact_year_req`
--

CREATE TABLE `contact_year_req` (
  `contact_id` int(11) NOT NULL,
  `contact_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `contact_email` text NOT NULL,
  `contact_first_name` text NOT NULL,
  `contact_last_name` text NOT NULL,
  `contact_address` text NOT NULL,
  `contact_city` text NOT NULL,
  `contact_province` text NOT NULL,
  `contact_postal_code` text NOT NULL,
  `contact_model` text NOT NULL,
  `contact_serial_number` text NOT NULL,
  `contact_message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contact_year_req`
--

INSERT INTO `contact_year_req` (`contact_id`, `contact_date`, `contact_email`, `contact_first_name`, `contact_last_name`, `contact_address`, `contact_city`, `contact_province`, `contact_postal_code`, `contact_model`, `contact_serial_number`, `contact_message`) VALUES
(1, '2023-11-09 02:05:16', 'dddddddd@dd', 'dd', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i');

-- --------------------------------------------------------

--
-- Table structure for table `downloads_brochure`
--

CREATE TABLE `downloads_brochure` (
  `db_id` int(11) NOT NULL,
  `db_subject` text NOT NULL,
  `db_date` date NOT NULL,
  `db_category` text NOT NULL,
  `db_file` text NOT NULL,
  `db_status` enum('Show','Hide') NOT NULL,
  `db_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `downloads_brochure`
--

INSERT INTO `downloads_brochure` (`db_id`, `db_subject`, `db_date`, `db_category`, `db_file`, `db_status`, `db_created_at`) VALUES
(1, 'test', '2023-11-02', 'Brochure', '75384450fe92c_itpsuite.jpeg', 'Show', '2023-11-02 02:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `downloads_manuals`
--

CREATE TABLE `downloads_manuals` (
  `dm_id` int(11) NOT NULL,
  `dm_date` date NOT NULL,
  `dm_subject` text NOT NULL,
  `dm_category` text NOT NULL,
  `dm_horse_power` text NOT NULL,
  `dm_stroke_models` text NOT NULL,
  `dm_additional_file_en` text NOT NULL,
  `dm_additional_file_fr` text NOT NULL,
  `dm_additional_file_es` text NOT NULL,
  `dm_additional_file_de` text NOT NULL,
  `dm_file_en` text NOT NULL,
  `dm_file_fr` text NOT NULL,
  `dm_file_es` text NOT NULL,
  `dm_file_de` text NOT NULL,
  `dm_status` enum('Show','Hide') NOT NULL,
  `dm_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `downloads_manuals`
--

INSERT INTO `downloads_manuals` (`dm_id`, `dm_date`, `dm_subject`, `dm_category`, `dm_horse_power`, `dm_stroke_models`, `dm_additional_file_en`, `dm_additional_file_fr`, `dm_additional_file_es`, `dm_additional_file_de`, `dm_file_en`, `dm_file_fr`, `dm_file_es`, `dm_file_de`, `dm_status`, `dm_created_at`) VALUES
(1, '2023-11-02', 'test', 'Manuals', '2', '2-STROKE MODELS (CARBURETED)', '5d7215f468bba_false', '74012698cc223_AN.jpg', 'c78b7dddf0b42_false', '8a17ca733b918_Pita_Kb.jpg', 'false', 'Francais', 'false', 'Deutsch', 'Show', '2023-11-02 02:25:42');

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
(11, '1001', 'La Vida Starships', 'La Vida Starships', 'Sales & Service', 'HEERSTR', '1792', 'N. Stemmons Fwy', 'Lewisville TX', 'HEERSTR', '75067', '972-221-3000', '33.06947', '-97.0195979', '2023-11-02 02:32:45'),
(12, '1005', 'Metrejean Motors & Outboards, LLC.', 'Metrejean Motors & Outboards, LLC.', 'Sales & Service', 'Pierre Part', '2939', 'Hwy 70 S', 'LA', '-', ' 70339', '985-519-3539', '29.970001', '-91.1953159', '2023-11-02 02:32:45'),
(13, '1009', 'Dockside Marine, LLC.', 'Dockside Marine, LLC.', 'Sales & Service', 'Bogalusa', '63116', 'Hwy 10', 'LA', '-', '70427', '985-732-7600', '30.791652', '-89.8362929', '2023-11-02 02:32:45'),
(14, '1006', 'Bayou Land Microskiffs, LLC', 'Bayou Land Microskiffs, LLC', 'Sales & Service', 'Gonzales LA', '12500', ' HWY 44', 'LA', '-', '70737', '225-264-1769', '30.21086', '-90.9028529', '2023-11-02 02:32:45'),
(15, '1004', 'Don\'s Outboard Repair', 'Don\'s Outboard Repair', 'Sales & Service', 'Franklin', '1614', 'Willow Street', 'LA', '-', '70538', '337-828-2160', '29.78533', '-91.5242129', '2023-11-02 02:32:45'),
(16, '1003', 'Landry\'s DHP Marine', 'Landry\'s DHP Marine', 'Package Only', 'Lake Charles', '5717', 'Common Street', 'LA', '-', '70605', '337-478-1291', '30.156946', '-93.2164399', '2023-11-02 02:32:45'),
(17, '1008', 'Southern Outdoors & Marine LLC', 'Southern Outdoors & Marine LLC', 'Sales & Service', 'Houma', '2268', 'Grand Caillou Rd', 'LA', '-', '70363', '985-872-9128', '29.548343', '-90.6818389', '2023-11-02 02:32:45'),
(18, '1010', 'Bounds Performance and Marine, LLC.', 'Bounds Performance and Marine, LLC.', 'Package Only', ' Picayune MS', '801', 'N. Beech St', 'LA', '-', '39466', '601-799-6117', '30.535327', '-89.7006809', '2023-11-02 02:32:45'),
(19, '1002', 'Performance Outboards Sales&Service Inc.', 'Performance Outboards Sales&Service Inc.', 'Service Only', 'Commercial Place', '119', 'Rome', 'Houma ', '-', '70363', '985-868-4228', '29.560622', '-90.6824969', '2023-11-02 02:32:45'),
(20, '1007', 'Jerry\'s Boat Shop', 'Jerry\'s Boat Shop', 'Service Only', 'Gonzales', '11178', 'E. Lanoux Rd', 'LA', '-', '70737', '225-644-3797', '0.233208', '-90.8888409', '2023-11-02 02:32:45');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `news_date` date NOT NULL,
  `news_title` text NOT NULL,
  `news_image` text NOT NULL,
  `news_detail` text NOT NULL,
  `news_status` enum('Show','Hide') NOT NULL,
  `news_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `news_date`, `news_title`, `news_image`, `news_detail`, `news_status`, `news_created_at`) VALUES
(1, '2023-11-02', 'test', 'f817731c4f2c4_AN.jpg', '<p>test</p>', 'Show', '2023-11-01 17:10:30');

-- --------------------------------------------------------

--
-- Table structure for table `outboards_category`
--

CREATE TABLE `outboards_category` (
  `oc_id` int(11) NOT NULL,
  `oc_date` date NOT NULL,
  `oc_category_name` text NOT NULL,
  `oc_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `outboards_category`
--

INSERT INTO `outboards_category` (`oc_id`, `oc_date`, `oc_category_name`, `oc_created_at`) VALUES
(3, '2023-11-02', 'test', '2023-11-02 02:27:22');

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
(1, 'Mq07B6K0hL4S9ppnnyXH', 'admin', '$2b$12$bkgPnr8sf8J1YQy/BcwxEuQ1eeETvVsu7gxS4GvDZpYPmFhuXIwKO', 'Administrator', '0999999999', 'example@gmail.com', 'Administrator', 'Active', '2023-05-31 08:02:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_broc_req`
--
ALTER TABLE `contact_broc_req`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `contact_toha_req`
--
ALTER TABLE `contact_toha_req`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `contact_year_req`
--
ALTER TABLE `contact_year_req`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `downloads_brochure`
--
ALTER TABLE `downloads_brochure`
  ADD PRIMARY KEY (`db_id`);

--
-- Indexes for table `downloads_manuals`
--
ALTER TABLE `downloads_manuals`
  ADD PRIMARY KEY (`dm_id`);

--
-- Indexes for table `find_dealer`
--
ALTER TABLE `find_dealer`
  ADD PRIMARY KEY (`fd_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `outboards_category`
--
ALTER TABLE `outboards_category`
  ADD PRIMARY KEY (`oc_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_broc_req`
--
ALTER TABLE `contact_broc_req`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_toha_req`
--
ALTER TABLE `contact_toha_req`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_year_req`
--
ALTER TABLE `contact_year_req`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `downloads_brochure`
--
ALTER TABLE `downloads_brochure`
  MODIFY `db_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `downloads_manuals`
--
ALTER TABLE `downloads_manuals`
  MODIFY `dm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `find_dealer`
--
ALTER TABLE `find_dealer`
  MODIFY `fd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `outboards_category`
--
ALTER TABLE `outboards_category`
  MODIFY `oc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
