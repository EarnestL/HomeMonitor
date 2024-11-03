create database home_db
USE home_db;

create table temperature(
id INT AUTO_INCREMENT PRIMARY KEY,
val FLOAT NOT NULL,
recorded_at TIMESTAMP DEFAULT current_timestamp,
coverage FLOAT NOT NULL
);

create table humidity(
id INT AUTO_INCREMENT PRIMARY KEY,
val FLOAT NOT NULL,
recorded_at TIMESTAMP DEFAULT current_timestamp,
coverage FLOAT NOT NULL
);

