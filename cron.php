<?php

require_once('api/mysql_connect.php');

$output = [
    'success' => false,
    'errors' => [],
];

$query = "TRUNCATE TABLE `students`";

mysqli_query($conn, $query);

$query = "INSERT INTO `students` (`id`,`name`,`course`,`grade`) VALUES 
(1,'Emma Smith','Calculus 2',87),
(2,'Liam Johnson','Computer Science', 75),
(3,'James Miller','Art 1',65),
(4,'William Jones','History 101',93),
(5,'Olivia Lee','Computer Science',88),
(6,'Harper Wilson','History 101', 100),
(7,'David Nguyen','History 101', 77),
(8,'Michael Tran','Calculus 2', 98),
(9,'Michael Smith','Art 1', 97),
(10,'Lily Park','English', 57);";

mysqli_query($conn,$query);

?>