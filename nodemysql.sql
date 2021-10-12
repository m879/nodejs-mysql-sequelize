-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2021 at 05:06 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `total_orders` int(11) NOT NULL,
  `user_image` longblob DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_email`, `user_password`, `total_orders`, `user_image`, `createdAt`, `updatedAt`) VALUES
('2428b2a4-f875-4772-beec-21cd174566c4', 'meraj', 'ma@gmail.com', '$2a$10$sTuE0E0WZl68NsfiP79x7.a9PNd3THzcyX1A/5oxe.WzREkBLNQku', 0, 0x323032312d31302d31325430336261636b67726f756e64322e6a7067, '2021-10-12 03:05:11', '2021-10-12 03:05:11'),
('3b05f0e4-8d67-4833-b7b8-45036e174e1f', 'akhlakh', 'aa@gmail.com', '$2a$10$OO43RcGLrrYDhYe3rMbEneuF04.wNds.kFSmAfDqFaUQaYp.087Y.', 0, 0x323032312d31302d31325430336261636b67726f756e64342e6a7067, '2021-10-12 03:05:36', '2021-10-12 03:05:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_user_email_unique` (`user_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
