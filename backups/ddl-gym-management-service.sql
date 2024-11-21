CREATE DATABASE gym_management_main_service;

USE gym_management_main_service;

---Coach
CREATE TABLE coach (
    id_coach INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    experience INT NOT NULL,
    CHECK (experience > 0)
);

CREATE TABLE certifications (
    id_certification INT AUTO_INCREMENT PRIMARY KEY,
    certification_name VARCHAR(255) NOT NULL,
    certification_date DATE NOT NULL,
    certifying_entity VARCHAR(255) NOT NULL,
    id_coach_fk INT NOT NULL,
    FOREIGN KEY (id_coach_fk) REFERENCES coach (id_coach) ON DELETE CASCADE
);

CREATE TABLE specialities (
    id_coach_fk INT,
    specialty_name VARCHAR(30),
    FOREIGN KEY (id_coach_fk) REFERENCES coach (id_coach) ON DELETE CASCADE
);

---Apprentice

CREATE TABLE apprentice (
    id_apprentice INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    date_birth DATE,
    gender ENUM('Female', 'Male', 'Other') NOT NULL,
    training_goal ENUM(
        'Lose weight',
        'Gain muscle mass',
        'Gain endurance',
        'Gain flexibility',
        'Other'
    ) NOT NULL,
    id_coach_fk INT,
    fitness_level ENUM(
        'Beginner',
        'Intermediate',
        'Advanced'
    ) NOT NULL,
    FOREIGN KEY (id_coach_fk) REFERENCES coach (id_coach) ON DELETE SET NULL
);

CREATE TABLE custom_training_goals (
    id_apprentice_fk INT,
    custom_goal_description VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_apprentice_fk) REFERENCES apprentice (id_apprentice) ON DELETE CASCADE
);