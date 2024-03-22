-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Mrz 2024 um 19:05
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
  `due_date` date NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`a_id`, `title`, `location`, `due_date`, `duration`) VALUES
(1, 'Party', 'Wien', '2024-03-30', 55),
(2, 'HalliGalli', 'Salzburg', '2024-03-31', 120);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dates`
--

CREATE TABLE `dates` (
  `d_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `a_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `dates`
--

INSERT INTO `dates` (`d_id`, `date`, `a_id`) VALUES
(1, '2024-03-28', 2),
(2, '2024-03-29', 2),
(3, '2024-03-30', 2),
(4, '2024-04-01', 1),
(5, '2024-04-02', 1),
(6, '2024-04-03', 1);

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
(4, 'Volo123', 'AUGHHHHHHHHHHHH');

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
(4, 3),
(5, 1),
(5, 3),
(6, 3);

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
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `dates`
--
ALTER TABLE `dates`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
