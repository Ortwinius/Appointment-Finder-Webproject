-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Apr 2024 um 20:08
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
(22, 'Fußball', 'Ernst-Happel-Stadion', '2024-05-07 19:30:00', 90),
(23, 'Schwimmen', 'Freibad', '2024-05-10 19:30:00', 180),
(24, 'Party', 'Loco', '2024-04-30 19:30:00', 300),
(25, 'Ausflug', 'Salzburg', '2024-04-20 20:00:00', 600),
(26, 'test', 'test', '2024-04-25 20:05:00', 120);

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
(45, '2024-04-30 19:00:00', 22),
(46, '2024-05-01 19:00:00', 22),
(47, '2024-05-02 19:00:00', 22),
(48, '2024-05-03 19:00:00', 22),
(49, '2024-05-14 15:00:00', 23),
(50, '2025-05-15 15:00:00', 23),
(51, '2024-05-01 19:00:00', 24),
(52, '2024-05-01 20:00:00', 24),
(53, '2024-05-01 21:00:00', 24),
(54, '2024-05-02 19:00:00', 24),
(55, '2024-05-02 20:00:00', 24),
(56, '2024-05-02 21:00:00', 24),
(57, '2024-04-21 10:00:00', 25),
(58, '2024-04-22 10:00:00', 25),
(59, '2024-04-23 10:00:00', 25),
(60, '2024-04-28 20:05:00', 26),
(61, '2024-04-29 20:05:00', 26);

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
(12, 'Sepp', ''),
(13, 'Vali', 'Brauche Schuhe'),
(14, 'Sepp', ''),
(15, 'Johannes', ''),
(16, 'Ortwin', ''),
(17, 'Hermann', ''),
(18, 'DiscoMann', ''),
(19, 'Peter', 'PARTY'),
(20, 'TestTest', ''),
(21, 'Test123', '');

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
(45, 13),
(46, 13),
(47, 13),
(47, 14),
(47, 15),
(48, 15),
(49, 17),
(50, 16),
(50, 17),
(51, 19),
(52, 18),
(52, 19),
(53, 18),
(53, 19),
(55, 18),
(56, 18),
(56, 19),
(60, 20),
(60, 21),
(61, 21);

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
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT für Tabelle `dates`
--
ALTER TABLE `dates`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `dates`
--
ALTER TABLE `dates`
  ADD CONSTRAINT `fk_appointments_dates` FOREIGN KEY (`a_id`) REFERENCES `appointments` (`a_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `user_dates`
--
ALTER TABLE `user_dates`
  ADD CONSTRAINT `fk_user_dates_dates` FOREIGN KEY (`d_id`) REFERENCES `dates` (`d_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_dates_users` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
