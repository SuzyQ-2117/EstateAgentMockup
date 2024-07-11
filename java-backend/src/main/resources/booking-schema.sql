DROP TABLE `booking`;

CREATE TABLE `booking` (
                       `id` INT PRIMARY KEY AUTO_INCREMENT,
                       `bookingDate` Date,
                       `bookingTime` VARCHAR(100)
);