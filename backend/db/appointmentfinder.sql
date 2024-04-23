-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Apr 2024 um 16:20
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appointmentfinder`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `a_id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `location` varchar(64) NOT NULL,
  `due_date` datetime NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`a_id`, `title`, `location`, `due_date`, `duration`) VALUES
(1, 'Party', 'Wien', '2024-03-30 00:00:00', 55),
(2, 'HalliGalli', 'Salzburg', '2024-03-31 00:00:00', 120),
(15, 'Geburtstagsfeier', 'Bei mir', '2024-04-27 15:47:00', 240),
(17, 'Fußballspiel', 'Fußballplatz', '2024-04-30 23:00:00', 90),
(18, 'Schwimmen', 'See', '2024-04-27 15:56:00', 180),
(19, 'Turnen', 'Turnsaal', '2024-04-28 15:57:00', 60),
(20, 'Turnen2', 'Turnsaal', '2024-05-03 15:59:00', 60),
(21, 'Turnen3', 'Turnsaal', '2024-04-27 16:11:00', 60);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dates`
--

CREATE TABLE `dates` (
  `d_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `a_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `dates`
--

INSERT INTO `dates` (`d_id`, `date`, `a_id`) VALUES
(1, '2024-03-28 14:00:00', 2),
(2, '2024-03-29 14:00:00', 2),
(3, '2024-03-30 16:00:00', 2),
(4, '2024-04-01 19:00:00', 1),
(5, '2024-04-02 20:00:00', 1),
(6, '2024-04-03 19:00:00', 1),
(26, '2024-03-03 12:00:00', 1),
(27, '2024-03-03 12:00:00', 1),
(31, '2024-05-12 15:47:00', 15),
(32, '2024-05-11 15:47:00', 15),
(33, '2024-05-10 15:47:00', 15),
(34, '2024-05-01 16:00:00', 17),
(35, '2024-05-23 16:00:00', 17),
(36, '2024-05-12 15:56:00', 18),
(37, '2024-05-11 15:56:00', 18),
(38, '2024-05-10 15:56:00', 18),
(39, '2024-05-09 15:57:00', 19),
(40, '2024-05-09 19:57:00', 19),
(41, '2024-05-08 15:59:00', 20),
(42, '2024-05-10 15:59:00', 20),
(43, '2024-05-03 16:11:00', 21),
(44, '2024-05-25 16:11:00', 21);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `commentary` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`u_id`, `name`, `commentary`) VALUES
(1, 'Valentin', 'Aughhh'),
(2, 'Ortwin', 'Aughhhhh'),
(3, 'TestUser123', 'blabla'),
(4, 'Volo123', 'AUGHHHHHHHHHHHH'),
(6, 'Franz', 'AchtungAchtung'),
(11, 'TestMann', 'Lol'),
(12, 'Sepp', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_dates`
--

CREATE TABLE `user_dates` (
  `d_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user_dates`
--

INSERT INTO `user_dates` (`d_id`, `u_id`) VALUES
(1, 2),
(1, 4),
(1, 6),
(2, 6),
(4, 3),
(5, 1),
(5, 3),
(6, 3),
(6, 11),
(41, 12),
(42, 12);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`a_id`);

--
-- Indizes für die Tabelle `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`d_id`),
  ADD KEY `fk_appointments_dates` (`a_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Indizes für die Tabelle `user_dates`
--
ALTER TABLE `user_dates`
  ADD PRIMARY KEY (`d_id`,`u_id`),
  ADD KEY `fk_user_dates_users` (`u_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT für Tabelle `dates`
--
ALTER TABLE `dates`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `dates`
--
ALTER TABLE `dates`
  ADD CONSTRAINT `fk_appointments_dates` FOREIGN KEY (`a_id`) REFERENCES `appointments` (`a_id`);

--
-- Constraints der Tabelle `user_dates`
--
ALTER TABLE `user_dates`
  ADD CONSTRAINT `fk_user_dates_dates` FOREIGN KEY (`d_id`) REFERENCES `dates` (`d_id`),
  ADD CONSTRAINT `fk_user_dates_users` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
