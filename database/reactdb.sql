-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2025 at 04:09 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_codes`
--

CREATE TABLE `bank_codes` (
  `id` int(3) NOT NULL,
  `code` varchar(15) NOT NULL,
  `bank` varchar(300) NOT NULL,
  `country` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bank_codes`
--

INSERT INTO `bank_codes` (`id`, `code`, `bank`, `country`) VALUES
(1, 'AAAA-BB-CC-22', 'Standard Bank', 'South Africa'),
(2, 'AAAABBCC22', 'Standard Bank', 'South Africa'),
(3, 'AAAABB11222', 'First National Bank', 'South Africa'),
(4, 'AAAA-BB-11222', 'First National Bank', 'South Africa'),
(5, 'AAA-BB-CC-245', 'NedBank', 'South Africa'),
(6, 'AAABBCC245', 'NedBank', 'South Africa'),
(7, 'AAAABB11222', 'Capitec', 'South Africa'),
(8, 'AUTC-GY-102', 'Capitec', 'South Africa'),
(9, 'ABA-DRBN-822', 'ABSA', 'South Africa'),
(10, 'ABADRBN822', 'ABSA', 'South Africa');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(4) NOT NULL,
  `fname` varchar(300) NOT NULL,
  `surname` varchar(300) NOT NULL,
  `idnum` varchar(13) NOT NULL,
  `emp_id` varchar(9) NOT NULL,
  `email` varchar(300) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `fname`, `surname`, `idnum`, `emp_id`, `email`, `username`, `password`, `role`) VALUES
(1, 'Alex', 'Song', '3232323244556', '7778889', 'alex1@gmail.com', '@alex', '@Alex123', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `trans_num` int(9) NOT NULL,
  `trans_id` int(9) NOT NULL,
  `sender_account_num` varchar(40) NOT NULL,
  `sender_name` varchar(300) NOT NULL,
  `provider_code` varchar(13) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `amount` int(40) NOT NULL,
  `receiver_account_num` int(40) NOT NULL,
  `receiver_names` varchar(300) NOT NULL,
  `datee` varchar(33) NOT NULL,
  `status` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`trans_num`, `trans_id`, `sender_account_num`, `sender_name`, `provider_code`, `currency`, `amount`, `receiver_account_num`, `receiver_names`, `datee`, `status`) VALUES
(44, 693706821, '2147483647', 'Jack Zulu', 'AAAA-BB-CC-22', 'SA RAND', 2000, 2147483647, '', '2025-09-05 13:28:08.072', 'Approved'),
(45, 47061198, '2147483647', 'Jack Zulu', 'AAAA-BB-CC-22', 'POUND', 2500, 2147483647, '', '2025-09-05 13:29:54.675', 'Approved'),
(46, 966465746, '12312312312', 'Jack Zulu', 'AAAA-BB-CC-22', 'SA RAND', 2300, 2147483647, '', '2025-09-05 13:34:30.886', 'Approved'),
(47, 60204284, '7766776678', 'Great Kha', 'AAAABB11222', 'SA RAND', 450, 2147483647, '', '2025-09-09 09:11:11.963', 'Pending'),
(48, 237363104, '11166627722', 'Alvin Zul', 'AAAA-BB-CC-22', 'SA RAND', 6500, 2147483647, '', '2025-09-11 19:15:04.351', 'Pending'),
(49, 206437053, '90001110011', 'Anele Dube', 'AAXX-BB-CC-22', 'SA RAND', 2450, 2147483647, '', '2025-10-03 09:52:41.355', 'Pending'),
(50, 727529789, '90001110011', 'Anele Dube', 'LLAA-BB-CC-22', 'SA RAND', 500, 1010101010, '', '2025-10-03 10:12:48.915', 'Failed'),
(51, 21412915, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 1200, 2147483647, '', '2025-10-03 10:18:56.684', 'Approved'),
(52, 227202597, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 1209, 2147483647, '', '2025-10-03 10:24:44.013', 'Approved'),
(53, 926605799, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 390, 2147483647, '', '2025-10-03 10:32:46.425', 'Approved'),
(54, 467536643, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', '$US', 200, 2147483647, '', '2025-10-03 10:35:05.120', 'Approved'),
(55, 738597888, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 233, 2147483647, '', '2025-10-03 10:41:42.910', 'Approved'),
(56, 290020884, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 1890, 2147483647, '', '2025-10-03 10:44:12.063', 'Approved'),
(57, 79959022, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 677, 2147483647, '', '2025-10-03 10:46:36.167', 'Approved'),
(58, 690055601, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 500, 2147483647, '', '2025-10-03 10:48:39.331', 'Approved'),
(59, 393828691, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 100, 2147483647, '', '2025-10-03 10:55:05.617', 'Approved'),
(60, 581628176, '90001110011', 'Anele Dube', 'AAIW-BB-CC-29', 'SA RAND', 1000, 2147483647, '', '2025-10-03 14:51:11.657', 'Failed'),
(61, 467527565, '90001110011', 'Anele Dube', 'AAPP-BB-CC-02', 'SA RAND', 123, 2147483647, '', '2025-10-03 14:53:33.532', 'Pending'),
(62, 948041825, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 200, 2147483647, '', '2025-10-04 22:37:03.804', 'Pending'),
(63, 574756787, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 200, 2147483647, '', '2025-10-05 09:41:39.319', 'Pending'),
(64, 824183663, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 677, 2147483647, '', '2025-10-05 09:43:44.034', 'Pending'),
(65, 372878804, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 200, 2147483647, '', '2025-10-05 09:44:54.742', 'Pending'),
(66, 133385025, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 2009, 2147483647, '', '2025-10-05 09:54:09.499', 'Pending'),
(67, 274820713, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 200, 2147483647, '', '2025-10-05 09:57:08.471', 'Pending'),
(68, 767065599, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 677, 2147483647, '', '2025-10-05 10:04:08.459', 'Pending'),
(69, 303315856, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 400, 2147483647, '', '2025-10-05 10:05:44.814', 'Pending'),
(70, 782090456, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 200, 2147483647, '', '2025-10-05 10:08:56.478', 'Pending'),
(71, 391821013, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 78800, 2147483647, '', '2025-10-05 10:18:29.123', 'Pending'),
(72, 991328754, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 78800, 2147483647, '', '2025-10-05 10:21:32.004', 'Pending'),
(73, 252005798, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 78800, 2147483647, '', '2025-10-05 10:25:28.158', 'Pending'),
(74, 751513420, '90001110011', 'Anele Dube', 'AAAA-BB-CC-22', 'SA RAND', 78800, 2147483647, '', '2025-10-05 10:41:31.479', 'Pending'),
(75, 613054276, '800800800', 'Aphiwe Ndlovu', 'AAAA-BB-CC-22', 'SA RAND', 1500, 100010002, '', '2025-10-06 15:27:00.159', 'Approved'),
(76, 683745483, '700700700', 'Thando Mpanza', 'AAAA-BB-CC-22', 'SA RAND', 2000, 700700500, '', '2025-10-06 15:49:06.070', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(9) NOT NULL,
  `fullname` varchar(99) NOT NULL,
  `idnum` varchar(13) NOT NULL,
  `account_number` varchar(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `date_created` varchar(33) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `idnum`, `account_number`, `username`, `password`, `date_created`) VALUES
(40, 'Jack Zulu', '1234567890123', '12312312312', 'jack', '$2b$10$JYKbib6Bm1s0RaPz7JPP.OElj2krzK67hSmOkyWHq5jELkUiUAiBW', '2025-09-05 13:26:15.966'),
(41, 'Great Kha', '2345123412346', '7766776678', 'great', '$2b$10$Xm2PDsHPgG3Utxke7UKr4eO9dFYsbjPz1TCaW8Oa90.QCZtjEq7BS', '2025-09-09 09:02:47.121'),
(42, 'Alvin Zul', '1231231231231', '11166627722', '@alvin', '$2b$10$MNqtxEpggsx4eyOwwv92p.ZJ1LH4RfApAqxNfQk.8ln6v/u70Fo6i', '2025-09-11 18:57:20.230'),
(43, 'Anele Dube', '9090909090123', '90001110011', '@Anele', '$2b$10$tBtlYrinbfUWDpuSH.95x.p6qiCdupASlPTXPVUrfi82VS8JHrbVO', '2025-10-03 09:48:02.073'),
(44, 'Jack Sparrow', '0414141414147', '89800110011', '@Jack', '$2b$10$BM46r2PdcvzPIOsmDWoOLegosxHfAGBPbHicLlqh6ZnwjFnGTG9pS', '2025-10-06 14:41:38.067'),
(45, 'Meagan Xulu', '1230000000123', '1100118989', '@Meagan', '$2b$10$8Us7HifBGL.PHRkmFjoKq.eOZrLQ0OuI.tji38sCK0XtskORnnWPW', '2025-10-06 14:47:24.695'),
(46, 'Avumile Bankeni', '3030303003337', '9003300333', '@Avumile', '$2b$10$Tdqu7kGqsgrby6Wygg96YOKLBtS5sCXzbdQDCxXK1kwjAYrZ84Yq2', '2025-10-06 15:21:55.366'),
(47, 'Aphiwe Ndlovu', '0403303030343', '800800800', '@Aphiwe', '$2b$10$K26rBzDrW9UCvDdjCEtvEOGruPRyVFdUNt87DwZxKZmKFBptlcVHG', '2025-10-06 15:25:18.598'),
(48, 'Thando Mpanza', '0404043344311', '700700700', '@Thando', '$2b$10$P7E5NcjO.ljS5U3XP9q1R.h8gosoLL29ZL6PoKZ6kzd8aO8xIQAGm', '2025-10-06 15:47:21.792');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `fname` varchar(300) NOT NULL,
  `surname` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `surname`, `email`, `password`) VALUES
(1, 'Andile', 'Xulu', 'Andile@gmail.com', '$2b$10$q/ZToNuBKSoNF4vM9FvurOKKQHAfaz1uqCk2Fc5VsKUQI4lGyDZCO'),
(2, 'Andy', 'Xulu', 'Andyxulu@gmail.com', '$2b$10$lIXLPnFDxwBxKxa0iqYojOq6OR1FuD0tIf01bT67ZRUgjvF3zVxwG'),
(3, 'Ole', 'Zulu', 'ole@gmail.com', '$2b$10$7ynlRtRQ0DDJQ7h6QiIgGe4hga4SLmh2pg7tSx0mpYmnOEZTgPRV6'),
(4, 'Bie', 'Jay', 'biee@gmail.com', '$2b$10$RPKMd2yy6J91Z9zjKOcA4umdOnMTL6gVKjlZ0koBiVXv.XVjZaro6'),
(5, 'mulo', 'Pulu', 'opulu@gmail.com', '$2b$10$k7V6QmpoRbUs41etJA45BOecseBIv5wNZ60hs20yvC.wAfujgUbi2'),
(6, 'mayne', 'Dery', 'mayne@gmail.com', '$2b$10$Srm1.5G99dH/HHWz0G3QKepnLSQONQ.K7z7mDzR6S4jnoiApjx1mi'),
(8, 'Jack', 'Dube', 'vvvv@gmail.com', '$2b$10$sNJO.7wYSxKkdrafqtKr/uNOyBijzqhBV4FnP/h00pGLmjNhz/AaG'),
(9, 'Jet', 'Lee', 'jet@gmail.com', '$2b$10$QCB/TaRt7yVGDxRcgbj9pu3f59xE6wRFFLYiZdAf/1fOc8AqxtINO'),
(19, 'Jetqwwqs', 'Leeaaq', 'jeasast@gmail.com', '$2b$10$GC1FdgH4dQkojkh2Twi2MeiHbOfpG5Ie3akw4jq/CuGlJe0pVFcay'),
(20, 'Prelim', 'Asay', 'peev@gmail.com', '$2b$10$1/XIlOY8CsrIJCyEOfqQEuOXgRfrKy8xNei/BoIxU05LzjJpsvcCy'),
(21, 'Ishe', 'Dube', 'ishe@gmail.com', '$2b$10$ZTYdKEm4l83oGTa4QIwLt.YXRI7zgzZPUnuy/e7lZQR8ErEocZce6'),
(22, '', '', '', '$2b$10$ojQF6FFiY6sN3zE/18eJeevRam9Y5cS2QRMRILWydWvy.fyQrjcGG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_codes`
--
ALTER TABLE `bank_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`trans_num`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_codes`
--
ALTER TABLE `bank_codes`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `trans_num` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
